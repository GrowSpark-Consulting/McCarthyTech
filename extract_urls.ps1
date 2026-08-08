# Extract all .mp4 and unique image paths from the remaining service page HTML files
$steps = @(42, 43, 44, 45, 46, 47)
$pageNames = @{
    42 = "Branding"
    43 = "Digital Marketing"
    44 = "AI Implementation"
    45 = "AI Chatbot"
    46 = "AI Marketing"
    47 = "Services Index"
}

$basePath = "C:\Users\Shaaz Alfaiz\.gemini\antigravity-ide\brain\9cc7b8bc-04f9-40cc-8721-bd050d748991\.system_generated\steps"

foreach ($step in $steps) {
    $file = Join-Path $basePath "$step\content.md"
    $content = Get-Content -Raw $file
    
    Write-Host "`n=== $($pageNames[$step]) (step $step) ===" -ForegroundColor Yellow
    
    # Find all mp4 references
    $mp4Matches = [regex]::Matches($content, '/assets/img/[\w\-/. ]+\.mp4')
    if ($mp4Matches.Count -gt 0) {
        Write-Host "  Videos:" -ForegroundColor Cyan
        $mp4Matches | ForEach-Object { $_.Value } | Sort-Object -Unique | ForEach-Object {
            Write-Host "    $_"
        }
    } else {
        Write-Host "  No video references found" -ForegroundColor DarkGray
    }

    # Find poster images specific to video elements
    $posterMatches = [regex]::Matches($content, 'poster="(/assets/img/[^"]+)"')
    if ($posterMatches.Count -gt 0) {
        Write-Host "  Video Posters:" -ForegroundColor Cyan
        $posterMatches | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique | ForEach-Object {
            Write-Host "    $_"
        }
    }
}
