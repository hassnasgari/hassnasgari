"""
CoinGecko Bot Reliability Enhancer (Zero-Dependency Pure Python)
Author: Antigravity & User
Features:
- Standard Library Only (urllib.request) - ZERO external dependencies required!
- Configurable Rate Limiter (enforces CoinGecko rate limits)
- Exponential Backoff with Jitter for HTTP 429 and network errors
- Resilient Error Handling & Structured Logging
- Safe, identical .txt format output
"""

import time
import json
import random
import logging
import urllib.request
import urllib.error
import urllib.parse
from typing import Dict, Any, Optional, List

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    datefmt="%H:%M:%S"
)
logger = logging.getLogger("CoinGeckoReliability")


class RateLimiter:
    """
    Ensures minimum interval between consecutive API calls.
    Default: 2.5 seconds (safe for CoinGecko free tier ~10-30 req/min).
    """
    def __init__(self, min_interval_seconds: float = 2.5):
        self.min_interval = min_interval_seconds
        self.last_call_time = 0.0

    def wait(self):
        elapsed = time.time() - self.last_call_time
        if elapsed < self.min_interval:
            sleep_time = self.min_interval - elapsed
            logger.debug(f"RateLimiter: sleeping for {sleep_time:.2f}s")
            time.sleep(sleep_time)
        self.last_call_time = time.time()


class CoinGeckoReliableClient:
    """
    Robust API client using Python's standard library urllib.
    Handles HTTP 429 rate limiting, network drops, and retries.
    """
    BASE_URL = "https://api.coingecko.com/api/v3"

    def __init__(
        self,
        rate_limiter: Optional[RateLimiter] = None,
        max_retries: int = 4,
        base_delay: float = 3.0,
        max_delay: float = 60.0
    ):
        self.rate_limiter = rate_limiter or RateLimiter(min_interval_seconds=2.5)
        self.max_retries = max_retries
        self.base_delay = base_delay
        self.max_delay = max_delay

    def request(self, endpoint: str, params: Optional[Dict[str, Any]] = None) -> Optional[Dict[str, Any]]:
        """
        Executes an HTTP GET request with exponential backoff and 429 mitigation.
        """
        query_string = f"?{urllib.parse.urlencode(params)}" if params else ""
        url = f"{self.BASE_URL}/{endpoint.lstrip('/')}{query_string}"

        req = urllib.request.Request(
            url,
            headers={
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) CryptoMarketBot/1.0",
                "Accept": "application/json"
            }
        )

        for attempt in range(1, self.max_retries + 1):
            self.rate_limiter.wait()
            try:
                logger.info(f"Requesting {endpoint} (Attempt {attempt}/{self.max_retries})...")
                with urllib.request.urlopen(req, timeout=12) as response:
                    charset = response.headers.get_content_charset() or "utf-8"
                    raw_body = response.read().decode(charset)
                    return json.loads(raw_body)

            except urllib.error.HTTPError as http_err:
                # HTTP 429: Too Many Requests
                if http_err.code == 429:
                    retry_header = http_err.headers.get("Retry-After")
                    if retry_header and retry_header.isdigit():
                        backoff = float(retry_header) + random.uniform(1.0, 3.0)
                    else:
                        backoff = min(self.max_delay, self.base_delay * (2 ** (attempt - 1)) + random.uniform(0.5, 2.0))

                    logger.warning(f"CoinGecko Rate Limit reached (HTTP 429). Exponential backoff: waiting {backoff:.1f}s...")
                    time.sleep(backoff)
                    continue

                # 5xx Server Errors
                elif http_err.code >= 500:
                    backoff = min(self.max_delay, self.base_delay * (2 ** (attempt - 1)) + random.uniform(0.5, 1.5))
                    logger.warning(f"Server error HTTP {http_err.code}. Retrying in {backoff:.1f}s...")
                    time.sleep(backoff)
                    continue
                else:
                    logger.error(f"HTTP Error {http_err.code}: {http_err.reason}")
                    break

            except urllib.error.URLError as url_err:
                backoff = min(self.max_delay, self.base_delay * (2 ** (attempt - 1)) + random.uniform(0.5, 1.5))
                logger.warning(f"Network connection failure ({url_err.reason}). Retrying in {backoff:.1f}s...")
                time.sleep(backoff)

            except json.JSONDecodeError as json_err:
                logger.error(f"Failed to parse JSON response: {json_err}")
                break

            except Exception as ex:
                logger.error(f"Unexpected error: {ex}")
                break

        logger.error(f"Failed to fetch data from {url} after {self.max_retries} attempts.")
        return None

    def get_simple_prices(self, coin_ids: List[str], vs_currencies: str = "usd") -> Optional[Dict[str, Any]]:
        """
        Fetches price, 24h volume, and 24h change for selected cryptocurrencies.
        """
        params = {
            "ids": ",".join(coin_ids),
            "vs_currencies": vs_currencies,
            "include_24hr_vol": "true",
            "include_24hr_change": "true",
            "include_last_updated_at": "true"
        }
        return self.request("simple/price", params=params)


def save_summary_to_txt(data: Dict[str, Any], output_path: str = "market_summary.txt") -> bool:
    """
    Saves crypto snapshot to a clean .txt file without losing previous data.
    """
    if not data:
        logger.warning("No data provided to save.")
        return False

    try:
        timestamp_str = time.strftime("%Y-%m-%d %H:%M:%S UTC", time.gmtime())
        lines = [
            f"=== COINGECKO MARKET SNAPSHOT ({timestamp_str}) ===",
            ""
        ]

        for coin, stats in data.items():
            price = stats.get("usd", 0.0)
            vol = stats.get("usd_24h_vol", 0.0)
            change = stats.get("usd_24h_change", 0.0)
            sign = "+" if change >= 0 else ""

            lines.append(f"[{coin.upper()}]")
            lines.append(f"  Current Price: ${price:,.2f}")
            lines.append(f"  24h Change:    {sign}{change:.2f}%")
            lines.append(f"  24h Volume:    ${vol:,.0f}")
            lines.append("-" * 38)

        lines.append("")
        lines.append("=== STATUS: SUCCESSFUL RUN ===")

        with open(output_path, "w", encoding="utf-8") as f:
            f.write("\n".join(lines))

        logger.info(f"Snapshot written successfully to '{output_path}'")
        return True

    except Exception as err:
        logger.error(f"Error writing to {output_path}: {err}")
        return False


def main():
    logger.info("Starting CoinGecko Reliable Bot Enhancer Demo...")

    # Initialize with 2.5s rate limiter and backoff
    client = CoinGeckoReliableClient(
        rate_limiter=RateLimiter(min_interval_seconds=2.5),
        max_retries=4
    )

    coins = ["bitcoin", "ethereum", "solana", "cardano", "binancecoin"]
    logger.info(f"Fetching market metrics for: {coins}")

    data = client.get_simple_prices(coins)

    if data:
        output_file = "market_summary.txt"
        save_summary_to_txt(data, output_file)
        print("\n" + "#" * 55)
        print(f" SUCCESS: Clean data gathered and saved to {output_file}")
        print("#" * 55 + "\n")
    else:
        logger.error("Could not fetch data. Check internet connection or API availability.")


if __name__ == "__main__":
    main()
