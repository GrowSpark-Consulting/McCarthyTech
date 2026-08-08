# Download remaining videos that were not in the first two scripts
$ErrorActionPreference = "Continue"
$baseUrl  = "https://altibixcodelab.com"
$destRoot = "d:\Growspark it website\public"

$videoAssets = @(
    # Branding page
    "/assets/img/video-assets/branding3.mp4"
    "/assets/img/video-assets/digital.mp4"
    "/assets/img/video-assets/web-dev4.mp4"

    # Digital Marketing page
    "/assets/img/video-assets/custom-bakcground.mp4"
    "/assets/img/video-assets/web-dev2.mp4"
    "/assets/img/video-assets/webdev3.mp4"

    # AI Implementation page
    "/assets/img/video-assets/ai-1.mp4"
    "/assets/img/video-assets/ai-2.mp4"
    "/assets/img/video-assets/ai-new.mp4"
    "/assets/img/video-assets/ai-screen.mp4"
)

function Download-Asset {
    param([string]$RelativePath)
    $localPath = Join-Path $destRoot $RelativePath.TrimStart("/")
    $localDir  = Split-Path $localPath -Parent
    if (Test-Path $localPath) {
        Write-Host "  [SKIP] Already exists: $RelativePath" -ForegroundColor DarkGray
        return
    }
    if (-not (Test-Path $localDir)) {
        New-Item -ItemType Directory -Path $localDir -Force | Out-Null
    }
    $encodedPath = $RelativePath -replace ' ', '%20'
    $url = "$baseUrl$encodedPath"
    try {
        Write-Host "  [DOWN] $RelativePath" -ForegroundColor Cyan
        Invoke-WebRequest -Uri $url -OutFile $localPath -UseBasicParsing -TimeoutSec 60
        Write-Host "  [OK]   Saved" -ForegroundColor Green
    } catch {
        Write-Host "  [FAIL] $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host "`nDownloading missing videos..." -ForegroundColor Yellow
$i = 0
foreach ($v in $videoAssets) {
    $i++
    Write-Host "[$i/$($videoAssets.Count)] $v" -ForegroundColor White
    Download-Asset -RelativePath $v
}
Write-Host "`nDone!" -ForegroundColor Green
