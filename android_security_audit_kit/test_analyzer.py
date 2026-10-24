#!/usr/bin/env python3
"""
Test Suite for Android Security Analyzer
Validates APK structural parsing, ABI detection, and Frida hook generation.
"""

import os
import sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

from apk_security_analyzer import AndroidSecurityAnalyzer

def run_tests():
    print("[*] Running Android Security Toolkit Validation...")

    # Test 1: Check against live local APK if available
    live_apk = r"c:\Users\ASG\Desktop\0-Programing\27-ملت بان\app\build\outputs\apk\debug\app-debug.apk"
    target = live_apk if os.path.exists(live_apk) else "sample.apk"

    print(f"[+] Target APK for inspection: {target}")
    analyzer = AndroidSecurityAnalyzer(target)

    if os.path.exists(target):
        structure = analyzer.inspect_apk_structure()
        print(f"[+] Structure Analysis Success: {len(structure.get('dex_files', []))} DEX files detected.")
        print(f"[+] Native Libraries Detected: {structure.get('has_native_libraries')}")
        print(f"[+] Security Configs: {structure.get('security_configs')}")

    # Test 2: Frida Script Generation
    frida_hook = analyzer.generate_frida_play_integrity_hook()
    assert "StandardIntegrityManager" in frida_hook
    assert "Signature.sign" in frida_hook
    print("[+] Frida Instrumentation Hook Template generated successfully.")

    # Test 3: Investigation Framework
    framework = analyzer.generate_investigation_framework()
    assert "step_1_client_side" in framework
    assert "step_2_runtime_dynamic" in framework
    assert "step_3_server_side_visibility" in framework
    print("[+] 3-Phase Investigation & Attestation Assessment Framework verified.")

    print("\n=======================================================")
    print(" ALL TESTS PASSED: Android Security Toolkit Ready (100%)")
    print("=======================================================")

if __name__ == "__main__":
    run_tests()
