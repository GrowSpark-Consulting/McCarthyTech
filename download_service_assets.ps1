# =============================================================================
# Download ALL image/gif/photo assets from Altibix Codelab service pages:
#   - /services/app-development
#   - /services/web-development
#   - /services/ui-ux-design
#
# Assets are saved into public/assets/img/ preserving the original path structure.
# =============================================================================

$ErrorActionPreference = "Continue"
$baseUrl   = "https://altibixcodelab.com"
$destRoot  = "d:\Growspark it website\public"

# ── Deduplicated list of every image / gif / photo / poster referenced ──────
$assetPaths = @(
    # ═══════════════════════════════════════════════════════
    # SHARED ACROSS ALL THREE PAGES (header, nav, footer, etc.)
    # ═══════════════════════════════════════════════════════

    # GIF animations
    "/assets/img/icon/b10c3e43e836d32554bf.gif"
    "/assets/img/icon/animated-gif02.gif"

    # Logo & favicon
    "/assets/img/logo/altibix-logos/altibix log.png"
    "/assets/img/logo/altibix-logos/favicon.png"

    # Nav menu icons (SVG)
    "/assets/img/icon/m_01.svg"
    "/assets/img/icon/m_02.svg"
    "/assets/img/icon/m_03.svg"
    "/assets/img/icon/m_04.svg"
    "/assets/img/icon/m_05.svg"
    "/assets/img/icon/service-icon01.svg"
    "/assets/img/icon/service-icon02.svg"
    "/assets/img/icon/service-icon03.svg"
    "/assets/img/icon/service-icon05.svg"

    # Footer / contact icons
    "/assets/img/icon/email-icon.svg"
    "/assets/img/icon/location-icon.svg"
    "/assets/img/icon/call-icon.svg"

    # Scroll / UI icons
    "/assets/img/icon/down-white-icon.svg"
    "/assets/img/icon/quote-icon.png"

    # About section
    "/assets/img/about/app-rotate.png"

    # Brand logos (shared brand section)
    "/assets/img/logo/logo-2-light.png"
    "/assets/img/brand/client6.png"
    "/assets/img/brand/client22white.png"
    "/assets/img/brand/MAHINDRA.png"
    "/assets/img/brand/brand05.png"
    "/assets/img/brand/panda logo.png"
    "/assets/img/brand/brand07.png"

    # Testimonial images (shared across pages)
    "/assets/img/testimonial/testimonial-img01.jpg"
    "/assets/img/testimonial/testimonial-img02.jpg"
    "/assets/img/testimonial/testimonial-img03.jpg"
    "/assets/img/testimonial/testimonial-img04.jpg"
    "/assets/img/testimonial/brand.png"
    "/assets/img/testimonial/brand02.png"
    "/assets/img/testimonial/brand03.png"
    "/assets/img/testimonial/brand04.png"

    # Download / CTA section
    "/assets/img/download/net-img.png"

    # Hero backgrounds / posters
    "/assets/img/bg/hero-bg03.jpg"
    "/assets/img/bg/hero-bg03_1.jpg"
    "/assets/img/bg/brand-bg.jpg"

    # ═══════════════════════════════════════════════════════
    # APP DEVELOPMENT PAGE SPECIFIC
    # ═══════════════════════════════════════════════════════

    # Hero tech logos
    "/assets/img/service/app-dev/java.png"
    "/assets/img/service/app-dev/kotlin.png"
    "/assets/img/service/app-dev/flutter.png"

    # Service card poster images
    "/assets/img/service/app-dev/ios-app-development.png"
    "/assets/img/service/app-dev/android-app-development.png"
    "/assets/img/service/app-dev/cross-platform application.png"
    "/assets/img/service/app-dev/ui-ux-app.png"

    # ═══════════════════════════════════════════════════════
    # WEB DEVELOPMENT PAGE SPECIFIC
    # ═══════════════════════════════════════════════════════

    # Hero text images
    "/assets/img/hero/text-img01.png"
    "/assets/img/hero/text-img02.png"
    "/assets/img/hero/text-img03.png"

    # Service poster images (web)
    "/assets/img/service/webservice (1).png"
    "/assets/img/service/webservice (2).png"
    "/assets/img/service/webservice (3).png"
    "/assets/img/service/webservice (4).png"

    # ═══════════════════════════════════════════════════════
    # UI/UX DESIGN PAGE
    # (uses same shared assets + webservice posters above)
    # ═══════════════════════════════════════════════════════
)

# ── Also download video assets (mp4) referenced as background / poster videos ──
$videoAssets = @(
    # App Development page videos
    "/assets/img/video/app-developoment.mp4"
    "/assets/img/video-assets/mobile-apps.mp4"
    "/assets/img/video-assets/app-dev2.mp4"
    "/assets/img/video-assets/app-development videos.mp4"
    "/assets/img/video-assets/ui-ux-design.mp4"
    "/assets/img/video-assets/mobile application video.mp4"
    "/assets/img/video-assets/ai-main.mp4"

    # Web Development page videos
    "/assets/img/video-assets/web-dev.mp4"
    "/assets/img/video-assets/custom-software.mp4"
    "/assets/img/video-assets/saas.mp4"
    "/assets/img/video-assets/crm-design.mp4"
    "/assets/img/video-assets/web-design.mp4"

    # UI/UX Design page videos
    "/assets/img/video-assets/ui-ux designing.mp4"
    "/assets/img/video-assets/ui-ux designing2.mp4"
    "/assets/img/video-assets/saas2.mp4"
)

# ── Helper: download a single asset ─────────────────────────────────────────
function Download-Asset {
    param(
        [string]$RelativePath
    )

    $localPath = Join-Path $destRoot $RelativePath.TrimStart("/")
    $localDir  = Split-Path $localPath -Parent

    # Skip if already downloaded
    if (Test-Path $localPath) {
        Write-Host "  [SKIP] Already exists: $RelativePath" -ForegroundColor DarkGray
        return
    }

    # Ensure directory exists
    if (-not (Test-Path $localDir)) {
        New-Item -ItemType Directory -Path $localDir -Force | Out-Null
    }

    # URL-encode spaces in the path
    $encodedPath = $RelativePath -replace ' ', '%20'
    $url = "$baseUrl$encodedPath"

    try {
        Write-Host "  [DOWN] $RelativePath" -ForegroundColor Cyan
        Invoke-WebRequest -Uri $url -OutFile $localPath -UseBasicParsing -TimeoutSec 30
        Write-Host "  [OK]   Saved to: $localPath" -ForegroundColor Green
    }
    catch {
        Write-Host "  [FAIL] $url => $($_.Exception.Message)" -ForegroundColor Red
    }
}

# ── Download all image / gif / photo assets ──────────────────────────────────
Write-Host ""
Write-Host "=============================================" -ForegroundColor Yellow
Write-Host "  Downloading IMAGES / GIFS / PHOTOS"         -ForegroundColor Yellow
Write-Host "  from 3 Altibix service pages"               -ForegroundColor Yellow
Write-Host "=============================================" -ForegroundColor Yellow
Write-Host ""

$totalImages = $assetPaths.Count
$i = 0
foreach ($path in $assetPaths) {
    $i++
    Write-Host "[$i/$totalImages] Processing image: $path" -ForegroundColor White
    Download-Asset -RelativePath $path
}

Write-Host ""
Write-Host "=============================================" -ForegroundColor Yellow
Write-Host "  Downloading VIDEO ASSETS (mp4)"             -ForegroundColor Yellow
Write-Host "=============================================" -ForegroundColor Yellow
Write-Host ""

$totalVideos = $videoAssets.Count
$j = 0
foreach ($vpath in $videoAssets) {
    $j++
    Write-Host "[$j/$totalVideos] Processing video: $vpath" -ForegroundColor White
    Download-Asset -RelativePath $vpath
}

Write-Host ""
Write-Host "=============================================" -ForegroundColor Green
Write-Host "  DOWNLOAD COMPLETE!"                          -ForegroundColor Green
Write-Host "  Images: $totalImages  |  Videos: $totalVideos" -ForegroundColor Green
Write-Host "=============================================" -ForegroundColor Green
