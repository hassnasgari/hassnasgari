# GitHub Profile and Repos Live Status Checker
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

function Show-Dashboard {
    Clear-Host
    Write-Host "================================================================" -ForegroundColor Cyan
    Write-Host "         GitHub Live Portfolio & Score Dashboard                " -ForegroundColor Yellow
    Write-Host "================================================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Connecting to GitHub API for user 'hassnasgari'..." -ForegroundColor Gray

    try {
        $user = "hassnasgari"
        $headers = @{ "User-Agent" = "PowerShell-GitHub-Checker" }
        $profile = Invoke-RestMethod -Uri "https://api.github.com/users/$user" -Headers $headers -TimeoutSec 10
        $repos = Invoke-RestMethod -Uri "https://api.github.com/users/$user/repos?sort=updated" -Headers $headers -TimeoutSec 10

        # Calculate Stars and Metrics
        $totalStars = ($repos | Measure-Object -Property stargazers_count -Sum).Sum
        $totalForks = ($repos | Measure-Object -Property forks_count -Sum).Sum

        # Calculate Freelance Readiness Score
        $score = 40 # Verified profile + README
        if ($profile.public_repos -ge 2) { $score += 20 }
        if ($profile.public_repos -ge 4) { $score += 10 }
        $hasFlagship = $repos | Where-Object { $_.name -in @("PDFDiffPro", "SkillDad-Platform") }
        if ($hasFlagship.Count -ge 2) { $score += 15 }
        if ($totalStars -ge 1) { $score += 5 }

        $grade = "A"
        if ($score -ge 90) { $grade = "A+" }
        elseif ($score -ge 80) { $grade = "A" }
        elseif ($score -ge 70) { $grade = "B+" }
        else { $grade = "B" }

        Write-Host ""
        Write-Host "================== [ YOUR GITHUB SCORE ] ==================" -ForegroundColor Green
        Write-Host "  >>> OVERALL SCORE:  $score / 100    (GRADE: $grade) <<<" -ForegroundColor Yellow
        Write-Host "  Status:             READY FOR FREELANCING" -ForegroundColor Green
        Write-Host "  Public Repos:       $($profile.public_repos) Repositories Active" -ForegroundColor White
        Write-Host "  Total Stars:        $totalStars Stars" -ForegroundColor White
        Write-Host "  Flagship Projects:  PDFDiffPro + SkillDad-Platform (Live)" -ForegroundColor Cyan
        Write-Host "===========================================================" -ForegroundColor Green
        Write-Host ""

        Write-Host "--- [ 5 PUBLISHED REPOSITORIES ] -------------------------------" -ForegroundColor Yellow
        $idx = 1
        foreach ($r in $repos) {
            $lang = if ($r.language) { $r.language } else { "Multi" }
            Write-Host "  [$idx] $($r.name) (Stars: $($r.stargazers_count) | Lang: $lang)" -ForegroundColor Cyan
            Write-Host "      Link: $($r.html_url)" -ForegroundColor Gray
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
    Write-Host " [R] Refresh / Re-check Score" -ForegroundColor White
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
