# ============================================================
# Download ALL assets from altibixcodelab.com
# Run: powershell -ExecutionPolicy Bypass -File download_assets.ps1
# ============================================================

$ErrorActionPreference = "Continue"
$baseUrl = "https://altibixcodelab.com"
$basePath = $PSScriptRoot  # Same folder as this script

# All asset paths (exact paths from the live site)
$assets = @(
    # --- CATEGORY 1: LOGOS & FAVICON ---
    "assets/img/logo/altibix-logos/altibix log.png",
    "assets/img/logo/logo-2-light.png",
    "assets/img/logo/altibix-logos/favicon.png",

    # --- CATEGORY 2: HERO MEDIA ---
    "assets/img/video/development.mp4",
    "assets/img/bg/hero_bg.png",

    # --- CATEGORY 3: ANIMATED GIF DECORATIONS ---
    "assets/img/icon/original-66948a0d81d.gif",
    "assets/img/icon/0deec720000b2066289b.gif",
    "assets/img/icon/b10c3e43e836d32554bf.gif",
    "assets/img/icon/diamond-icon02.gif",
    "assets/img/icon/animated-gif03.gif",

    # --- CATEGORY 4: SERVICE VIDEOS ---
    "assets/img/video/app-developoment.mp4",
    "assets/img/video/web-dev.mp4",
    "assets/img/video/ui-ux.mp4",
    "assets/img/video/ai-implementation.mp4",
    "assets/img/video/branding-new.mp4",
    "assets/img/video-assets/digital-marketing.mp4",
    "assets/img/video/custom-software.mp4",
    "assets/img/video-assets/ai-main.mp4",

    # --- CATEGORY 5: MEGA MENU SVG ICONS ---
    "assets/img/icon/m_01.svg",
    "assets/img/icon/m_02.svg",
    "assets/img/icon/m_03.svg",
    "assets/img/icon/m_04.svg",
    "assets/img/icon/m_05.svg",

    # --- CATEGORY 6: SERVICE SVG ICONS ---
    "assets/img/icon/service-icon01.svg",
    "assets/img/icon/service-icon02.svg",
    "assets/img/icon/service-icon03.svg",
    "assets/img/icon/service-icon04.svg",
    "assets/img/icon/service-icon05.svg",
    "assets/img/icon/service-icon06.svg",
    "assets/img/icon/service-icon07.svg",
    "assets/img/icon/rotate-arrow-black.svg",
    "assets/img/icon/rotate-arrow-black02.svg",

    # --- CATEGORY 7: FEATURE SVG ICONS ---
    "assets/img/icon/fea-small-icon01.svg",
    "assets/img/icon/fea-small-icon02.svg",
    "assets/img/icon/fea-small-icon03.svg",
    "assets/img/icon/fea-small-icon04.svg",
    "assets/img/icon/fea-small-icon05.svg",
    "assets/img/icon/fea-small-icon06.svg",

    # --- CATEGORY 8: CONTACT FORM SVG ICONS ---
    "assets/img/icon/user-balck-icon.svg",
    "assets/img/icon/sms-balck-icon.svg",
    "assets/img/icon/call-icon.svg",
    "assets/img/icon/call-icon02.svg",
    "assets/img/icon/upload-icon.svg",
    "assets/img/icon/list-icon.svg",
    "assets/img/icon/messages-icon.svg",

    # --- CATEGORY 9: FOOTER SVG ICONS ---
    "assets/img/icon/email-icon.svg",
    "assets/img/icon/location-icon.svg",

    # --- CATEGORY 10: BACKGROUND & SHAPE IMAGES ---
    "assets/img/bg/service-bg.png",
    "assets/img/bg/features-gradient-bg.png",
    "assets/img/shape/indus-shape.png",
    "assets/img/shape/contact-shape01.png",
    "assets/img/shape/contact-shape02.png",
    "assets/img/industries/gradient.png",
    "assets/img/industries/gradient02.png",

    # --- CATEGORY 11: INDUSTRIES ---
    "assets/img/industries/indus-logo.png",

    # --- CATEGORY 12: CLIENT BRAND LOGOS ---
    "assets/img/brand/client6.png",
    "assets/img/brand/client22white.png",
    "assets/img/brand/MAHINDRA.png",
    "assets/img/brand/panda logo.png",
    "assets/img/brand/logo06.png",

    # --- CATEGORY 13: AVATARS ---
    "assets/img/avatar/img01.jpg",
    "assets/img/avatar/img02.jpg",

    # --- CATEGORY 14: FEATURE IMAGE ---
    "assets/img/feature/feature-img01.png",

    # --- CATEGORY 15: CSS LIBRARIES ---
    "assets/css/bootstrap.min.css",
    "assets/css/fontawesome.css",
    "assets/css/animate.css",
    "assets/css/swiper.min.css",
    "assets/css/odometer.css",
    "assets/css/mousecursor.css",
    "assets/css/nice-select.css",
    "assets/css/custom-fonts.css",
    "assets/css/magnific-popup.css",
    "assets/css/jquery-ui.css",
    "assets/css/main.css"
)

# Track results
$success = 0
$failed = 0
$failedFiles = @()

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  ALTIBIX ASSET DOWNLOADER" -ForegroundColor Cyan
Write-Host "  Downloading $($assets.Count) files..." -ForegroundColor Cyan
Write-Host "  Target: $basePath" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

foreach ($asset in $assets) {
    $localPath = Join-Path $basePath $asset
    $localDir = Split-Path $localPath -Parent

    # Create directory if needed
    if (-not (Test-Path $localDir)) {
        New-Item -ItemType Directory -Path $localDir -Force | Out-Null
    }

    # Build URL (encode spaces)
    $urlPath = $asset -replace ' ', '%20'
    # Special case: main.css has ?v=13 on the live site
    if ($asset -eq "assets/css/main.css") {
        $url = "$baseUrl/$urlPath`?v=13"
    } else {
        $url = "$baseUrl/$urlPath"
    }

    Write-Host "  Downloading: " -NoNewline
    Write-Host $asset -ForegroundColor Yellow -NoNewline

    try {
        $ProgressPreference = 'SilentlyContinue'
        Invoke-WebRequest -Uri $url -OutFile $localPath -UseBasicParsing -TimeoutSec 30
        $fileSize = (Get-Item $localPath).Length
        $sizeStr = if ($fileSize -gt 1MB) { "{0:N1} MB" -f ($fileSize / 1MB) }
                   elseif ($fileSize -gt 1KB) { "{0:N1} KB" -f ($fileSize / 1KB) }
                   else { "$fileSize B" }
        Write-Host " -> OK ($sizeStr)" -ForegroundColor Green
        $success++
    } catch {
        Write-Host " -> FAILED: $($_.Exception.Message)" -ForegroundColor Red
        $failed++
        $failedFiles += $asset
    }
}

# Summary
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  DOWNLOAD COMPLETE" -ForegroundColor Cyan
Write-Host "  Success: $success / $($assets.Count)" -ForegroundColor Green
if ($failed -gt 0) {
    Write-Host "  Failed:  $failed" -ForegroundColor Red
    Write-Host ""
    Write-Host "  Failed files:" -ForegroundColor Red
    foreach ($f in $failedFiles) {
        Write-Host "    - $f" -ForegroundColor Red
    }
}
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Now try to download font files
Write-Host "Attempting to download font files..." -ForegroundColor Cyan
$fontFiles = @(
    "assets/fonts/SportingGrotesque-Regular.woff2",
    "assets/fonts/SportingGrotesque-Regular.woff",
    "assets/fonts/SportingGrotesque-Bold.woff2",
    "assets/fonts/SportingGrotesque-Bold.woff"
)

foreach ($font in $fontFiles) {
    $localPath = Join-Path $basePath $font
    $localDir = Split-Path $localPath -Parent
    if (-not (Test-Path $localDir)) {
        New-Item -ItemType Directory -Path $localDir -Force | Out-Null
    }
    $url = "$baseUrl/$font"
    Write-Host "  Font: " -NoNewline
    Write-Host $font -ForegroundColor Yellow -NoNewline
    try {
        $ProgressPreference = 'SilentlyContinue'
        Invoke-WebRequest -Uri $url -OutFile $localPath -UseBasicParsing -TimeoutSec 15
        $fileSize = (Get-Item $localPath).Length
        $sizeStr = if ($fileSize -gt 1KB) { "{0:N1} KB" -f ($fileSize / 1KB) } else { "$fileSize B" }
        Write-Host " -> OK ($sizeStr)" -ForegroundColor Green
    } catch {
        Write-Host " -> FAILED (may not exist)" -ForegroundColor DarkYellow
    }
}

Write-Host ""
Write-Host "All done! Check the 'assets' folder in:" -ForegroundColor Green
Write-Host "  $basePath" -ForegroundColor White
Write-Host ""
