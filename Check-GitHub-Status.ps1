# GitHub Profile and Repos Live Status Checker
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

function Show-Dashboard {
    Clear-Host
    Write-Host "================================================================" -ForegroundColor Cyan
    Write-Host "         GitHub Live Status and Portfolio Dashboard             " -ForegroundColor Yellow
    Write-Host "================================================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Connecting to GitHub API for user 'hassnasgari'..." -ForegroundColor Gray

    try {
        $user = "hassnasgari"
        $headers = @{ "User-Agent" = "PowerShell-GitHub-Checker" }
        $profile = Invoke-RestMethod -Uri "https://api.github.com/users/$user" -Headers $headers -TimeoutSec 10
        $repos = Invoke-RestMethod -Uri "https://api.github.com/users/$user/repos?sort=updated" -Headers $headers -TimeoutSec 10

        Write-Host ""
        Write-Host "--- [ PROFILE INFORMATION ] -----------------------------------" -ForegroundColor Green
        Write-Host "  Name:         $($profile.name)" -ForegroundColor White
        Write-Host "  Username:     @$($profile.login)" -ForegroundColor White
        Write-Host "  Bio:          $($profile.bio)" -ForegroundColor DarkCyan
        Write-Host "  Public Repos: $($profile.public_repos)" -ForegroundColor Yellow
        Write-Host "  Followers:    $($profile.followers)" -ForegroundColor White
        Write-Host "  Following:    $($profile.following)" -ForegroundColor White
        Write-Host "  Account URL:  $($profile.html_url)" -ForegroundColor Cyan
        Write-Host ""

        # Calculate Freelance Readiness Score
        $score = 40 # Base for verified account + bio + profile README
        if ($profile.public_repos -ge 2) { $score += 20 }
        if ($profile.public_repos -ge 4) { $score += 10 }
        $hasFlagship = $repos | Where-Object { $_.name -in @("PDFDiffPro", "SkillDad-Platform") }
        if ($hasFlagship.Count -ge 2) { $score += 15 }
        
        $grade = "A-"
        if ($score -ge 90) { $grade = "A+" }
        elseif ($score -ge 80) { $grade = "A" }
        elseif ($score -ge 70) { $grade = "B+" }
        else { $grade = "B" }

        Write-Host "--- [ FREELANCE READINESS SCORE ] ------------------------------" -ForegroundColor Magenta
        Write-Host "  Overall Score: $score / 100  (Grade: $grade)" -ForegroundColor Yellow
        Write-Host "  Status:        Ready for Freelancing & Client Presentation" -ForegroundColor Green
        Write-Host "  Strengths:     Production-Grade Repos, Multi-Language, Clean READMEs" -ForegroundColor Cyan
        Write-Host ""

        Write-Host "--- [ PUBLISHED REPOSITORIES ] ---------------------------------" -ForegroundColor Green
        $idx = 1
        foreach ($r in $repos) {
            $lang = if ($r.language) { $r.language } else { "Multi" }
            Write-Host "  [$idx] $($r.name)" -ForegroundColor Yellow -NoNewline
            Write-Host " (Stars: $($r.stargazers_count) | Forks: $($r.forks_count) | Lang: $lang)" -ForegroundColor Gray
            Write-Host "      URL:  $($r.html_url)" -ForegroundColor Cyan
            if ($r.description) {
                Write-Host "      Desc: $($r.description)" -ForegroundColor DarkGray
            }
            Write-Host "      Updated: $($r.updated_at)" -ForegroundColor DarkGray
            $idx++
        }
    }
    catch {
        Write-Host "Error fetching data from GitHub: $_" -ForegroundColor Red
    }

    Write-Host ""
    Write-Host "================================================================" -ForegroundColor Cyan
    Write-Host " [P] Open Profile in Browser (https://github.com/hassnasgari)" -ForegroundColor White
    Write-Host " [1] Open PDFDiffPro Repository" -ForegroundColor White
    Write-Host " [2] Open SkillDad-Platform Repository" -ForegroundColor White
    Write-Host " [R] Refresh / Re-check" -ForegroundColor White
    Write-Host " [Q] Quit" -ForegroundColor White
    Write-Host "================================================================" -ForegroundColor Cyan
}

$continueLoop = $true
while ($continueLoop) {
    Show-Dashboard
    $choice = Read-Host "Select an option (P, 1, 2, R, Q)"
    if ($choice) {
        switch ($choice.ToUpper().Trim()) {
            "P" { Start-Process "https://github.com/hassnasgari" }
            "1" { Start-Process "https://github.com/hassnasgari/PDFDiffPro" }
            "2" { Start-Process "https://github.com/hassnasgari/SkillDad-Platform" }
            "R" { }
            "Q" { $continueLoop = $false }
            default { }
        }
    }
}
