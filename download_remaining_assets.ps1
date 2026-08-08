# =============================================================================
# Download ALL remaining image/gif/photo assets from Altibix Codelab:
#   - /services (index)
#   - /services/branding
#   - /services/digital-marketing
#   - /services/ai-implementation
#   - /services/ai-chatbot
#   - /services/ai-marketing
#
# Only NEW assets not already downloaded by the first script.
# =============================================================================

$ErrorActionPreference = "Continue"
$baseUrl   = "https://altibixcodelab.com"
$destRoot  = "d:\Growspark it website\public"

# ── Deduplicated list of NEW image assets from remaining service pages ──────
$assetPaths = @(
    # ═══════════════════════════════════════════════════════
    # BRANDING PAGE
    # ═══════════════════════════════════════════════════════
    "/assets/img/hero/audience-img01.png"
    "/assets/img/hero/audience-img02.png"
    "/assets/img/hero/audience-img03.png"

    # ═══════════════════════════════════════════════════════
    # AI IMPLEMENTATION PAGE
    # ═══════════════════════════════════════════════════════
    "/assets/img/video/video-frame.png"
    "/assets/img/icon/dash_board_icon.svg"
    "/assets/img/icon/document_icon.svg"
    "/assets/img/icon/sheet_icon.svg"
    "/assets/img/shape/video-shape01.png"
    "/assets/img/shape/video-shape02.png"
    "/assets/img/shape/video-shape03.png"
    "/assets/img/shape/video-shape04.png"
    "/assets/img/video/robot-img.png"
    "/assets/img/icon/sub-left-icon.png"
    "/assets/img/icon/sub-right-icon.png"
    "/assets/img/icon/artificial-intelligence-11761.gif"
    "/assets/img/feature/logo.png"
    "/assets/img/icon/sub_left-_white_icon.png"
    "/assets/img/icon/sub_right-_white_icon.png"
    "/assets/img/icon/animated-gif03.gif"
    "/assets/img/avatar/author_01.png"
    "/assets/img/avatar/author_02.png"
    "/assets/img/avatar/author_03.png"
    "/assets/img/testimonial/quote.png"
    "/assets/img/icon/money-icegif-22-unscreen.gif"
    "/assets/img/icon/pricing-icon01.svg"
    "/assets/img/icon/pricing-icon02.svg"
    "/assets/img/feature/scan.png"
    "/assets/img/feature/circle.png"
    "/assets/img/feature/security.png"
    "/assets/img/process/img01.png"
    "/assets/img/process/img02.png"
    "/assets/img/process/img03.png"
    "/assets/img/process/img04.png"

    # Brand logos (AI pages use different set)
    "/assets/img/brand/logo01.png"
    "/assets/img/brand/logo02.png"
    "/assets/img/brand/logo03.png"
    "/assets/img/brand/logo04.png"
    "/assets/img/brand/logo05.png"
    "/assets/img/brand/logo06.png"
    "/assets/img/brand/logo07.png"
    "/assets/img/brand/logo08.png"
    "/assets/img/brand/logo09.png"
    "/assets/img/brand/logo10.png"
    "/assets/img/brand/logo11.png"

    # Integration logos
    "/assets/img/integration/microsoft.png"
    "/assets/img/integration/telegram.png"
    "/assets/img/integration/slack.png"
    "/assets/img/integration/line.png"
    "/assets/img/integration/mailchimp.png"
    "/assets/img/integration/apple.png"
    "/assets/img/integration/messenger.png"
    "/assets/img/integration/linkedin.png"
    "/assets/img/integration/google-meet.png"
    "/assets/img/integration/paypal.png"
    "/assets/img/integration/plateform.png"
    "/assets/img/integration/airtable.png"
    "/assets/img/integration/whatsapp.png"
    "/assets/img/integration/android.png"
    "/assets/img/integration/instagram.png"
    "/assets/img/integration/shazam.png"
    "/assets/img/integration/shopify.png"
    "/assets/img/integration/loom.png"
    "/assets/img/integration/snapchat.png"
    "/assets/img/integration/discord.png"

    # ═══════════════════════════════════════════════════════
    # AI CHATBOT PAGE (additional unique assets)
    # ═══════════════════════════════════════════════════════
    "/assets/img/hero/hero-img01.png"
    "/assets/img/hero/glassy-effect-img.png"
    "/assets/img/hero/text-img04.png"
    "/assets/img/hero/text-img05.png"
    "/assets/img/video/img01.jpg"
    "/assets/img/video/img02.jpg"
    "/assets/img/video/img03.jpg"
    "/assets/img/video/img04.jpg"
    "/assets/img/feature/feature-img02.png"
    "/assets/img/feature/feature-img03.png"
    "/assets/img/feature/feature-img04.png"
    "/assets/img/feature/feature-img05.png"
    "/assets/img/feature/feature-img06.png"

    # ═══════════════════════════════════════════════════════
    # AI MARKETING PAGE (additional unique assets)
    # ═══════════════════════════════════════════════════════
    "/assets/img/about/img09.png"
    "/assets/img/service/img17.png"
    "/assets/img/service/img18.png"
    "/assets/img/service/img19.png"
    "/assets/img/service/img20.png"
    "/assets/img/project/img08.png"
    "/assets/img/project/img09.png"
    "/assets/img/project/img10.png"
    "/assets/img/project/img11.png"
    "/assets/img/award/award-img01.jpg"
    "/assets/img/award/award-img02.jpg"
    "/assets/img/award/award-img03.jpg"
    "/assets/img/award/award-img04.jpg"
    "/assets/img/download/pdf-book.png"
    "/assets/img/download/pdf-book02.png"
    "/assets/img/download/pdf-book03.png"
    "/assets/img/icon/doenload-icon.svg"

    # ═══════════════════════════════════════════════════════
    # SERVICES INDEX PAGE (additional unique assets)
    # ═══════════════════════════════════════════════════════
    "/assets/img/icon/fea-small-icon01.svg"
    "/assets/img/icon/fea-small-icon02.svg"
    "/assets/img/icon/fea-small-icon04.svg"
    "/assets/img/icon/fea-small-icon05.svg"
)

# ── Video assets unique to these pages ──────────────────────────────────────
$videoAssets = @(
    # Branding page videos
    "/assets/img/video-assets/branding.mp4"
    "/assets/img/video-assets/branding2.mp4"
    "/assets/img/video-assets/brand-identity.mp4"

    # Digital Marketing page videos
    "/assets/img/video-assets/digital-marketing.mp4"
    "/assets/img/video-assets/digital-marketing2.mp4"
    "/assets/img/video-assets/social-media.mp4"
    "/assets/img/video-assets/seo.mp4"

    # AI Implementation page videos
    "/assets/img/video-assets/ai-implementation.mp4"
    "/assets/img/video/ai-implementation.mp4"

    # AI Marketing page videos
    "/assets/img/video-assets/ai-marketing.mp4"
    "/assets/img/video-assets/ai-marketing2.mp4"
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
Write-Host "============================================================" -ForegroundColor Yellow
Write-Host "  Downloading REMAINING SERVICE PAGE ASSETS"                  -ForegroundColor Yellow
Write-Host "  (Branding, Digital Marketing, AI Implementation,"           -ForegroundColor Yellow
Write-Host "   AI Chatbot, AI Marketing, Services Index)"                 -ForegroundColor Yellow
Write-Host "============================================================" -ForegroundColor Yellow
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
Write-Host "============================================================" -ForegroundColor Green
Write-Host "  DOWNLOAD COMPLETE!"                                         -ForegroundColor Green
Write-Host "  Images: $totalImages  |  Videos: $totalVideos"              -ForegroundColor Green
Write-Host "============================================================" -ForegroundColor Green
