# GitHub Profile & Repos Live Status Checker
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

function Show-Dashboard {
    Clear-Host
    Write-Host "================================================================" -ForegroundColor Cyan
    Write-Host "         GitHub Live Status & Portfolio Dashboard              " -ForegroundColor Yellow
    Write-Host "================================================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Connecting to GitHub API for user 'hassnasgari'..." -ForegroundColor Gray

    try {
        $user = "hassnasgari"
        $headers = @{ "User-Agent" = "PowerShell-GitHub-Checker" }
        $profile = Invoke-RestMethod -Uri "https://api.github.com/users/$user" -Headers $headers -TimeoutSec 10
        $repos = Invoke-RestMethod -Uri "https://api.github.com/users/$user/repos?sort=updated" -Headers $headers -TimeoutSec 10

        Write-Host ""
        Write-Host "--- [ 👤 PROFILE INFORMATION ] ---------------------------------" -ForegroundColor Green
        Write-Host "  Name:         $($profile.name)" -ForegroundColor White
        Write-Host "  Username:     @$($profile.login)" -ForegroundColor White
        Write-Host "  Bio:          $($profile.bio)" -ForegroundColor DarkCyan
        Write-Host "  Public Repos: $($profile.public_repos)" -ForegroundColor Yellow
        Write-Host "  Followers:    $($profile.followers)" -ForegroundColor White
        Write-Host "  Following:    $($profile.following)" -ForegroundColor White
        Write-Host "  Account URL:  $($profile.html_url)" -ForegroundColor Cyan
        Write-Host ""

        Write-Host "--- [ 📦 PUBLISHED REPOSITORIES ] ------------------------------" -ForegroundColor Green
        $idx = 1
        foreach ($r in $repos) {
            Write-Host "  [$idx] $($r.name)" -ForegroundColor Yellow -NoNewline
            Write-Host " (⭐ Stars: $($r.stargazers_count) | 🍴 Forks: $($r.forks_count) | 🔤 Lang: $($r.language))" -ForegroundColor Gray
            Write-Host "      Link: $($r.html_url)" -ForegroundColor Cyan
            if ($r.description) {
                Write-Host "      Desc: $($r.description)" -ForegroundColor DarkGray
            }
            Write-Host "      Last Update: $($r.updated_at)" -ForegroundColor DarkGray
            $idx++
        }
    } catch {
        Write-Host "Error fetching data from GitHub: $_" -ForegroundColor Red
    }

    Write-Host ""
    Write-Host "================================================================" -ForegroundColor Cyan
    Write-Host " [P] Open Profile in Browser (https://github.com/hassnasgari)" -ForegroundColor White
    Write-Host " [1] Open PDFDiffPro Repository" -ForegroundColor White
    Write-Host " [2] Open SkillDad-Platform Repository" -ForegroundColor White
    Write-Host " [S] View Graphical Score & Streak Card" -ForegroundColor White
    Write-Host " [R] Refresh / Re-check" -ForegroundColor White
    Write-Host " [Q] Quit" -ForegroundColor White
    Write-Host "================================================================" -ForegroundColor Cyan
}

do {
    Show-Dashboard
    $key = Read-Host "Select an option (P, 1, 2, S, R, Q)"
    switch ($key.ToUpper()) {
        "P" { Start-Process "https://github.com/hassnasgari" }
        "1" { Start-Process "https://github.com/hassnasgari/PDFDiffPro" }
        "2" { Start-Process "https://github.com/hassnasgari/SkillDad-Platform" }
        "S" { Start-Process "https://github-readme-stats.vercel.app/api?username=hassnasgari&show_icons=true&theme=radical" }
        "R" { continue }
        "Q" { break }
        default { continue }
    }
} while ($key.ToUpper() -ne "Q")
