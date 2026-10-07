import { Product } from '../types';

/**
 * Escapes XML/SVG special characters so text strings never break XML parsing
 */
function escapeXml(unsafe: string): string {
  return String(unsafe || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Creates SVG Data URL preview mockup for frame products with realistic 4-cut photobooth model poses
 */
export function createFrameSvgPreview(
  bgHex: string,
  accentHex: string,
  textHex: string,
  title: string,
  subtitle: string,
  priceBadge: string,
  icons: [string, string, string, string]
): string {
  const safeId = Math.abs(
    (title + bgHex + accentHex).split('').reduce((acc, c) => ((acc << 5) - acc + c.charCodeAt(0)) | 0, 0)
  ).toString(36);

  const safeTitle = escapeXml(title);
  const safeSubtitle = escapeXml(subtitle);
  const safePriceBadge = escapeXml(priceBadge);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800" width="600" height="800">
    <defs>
      <linearGradient id="bgGrad_${safeId}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${bgHex}" />
        <stop offset="100%" stop-color="${bgHex}" />
      </linearGradient>
      <pattern id="dots_${safeId}" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
        <circle cx="14" cy="14" r="1.8" fill="${accentHex}" fill-opacity="0.18" />
      </pattern>
      <!-- Studio Light Gradients for 4 Cut Windows -->
      <linearGradient id="photoBg1_${safeId}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#fff1f2" />
        <stop offset="100%" stop-color="#fecdd3" />
      </linearGradient>
      <linearGradient id="photoBg2_${safeId}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#fdf4ff" />
        <stop offset="100%" stop-color="#f5d0fe" />
      </linearGradient>
      <linearGradient id="photoBg3_${safeId}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#f0f9ff" />
        <stop offset="100%" stop-color="#bae6fd" />
      </linearGradient>
      <linearGradient id="photoBg4_${safeId}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#fefce8" />
        <stop offset="100%" stop-color="#fef08a" />
      </linearGradient>
      <clipPath id="cutClip1_${safeId}"><rect x="65" y="118" width="220" height="260" rx="18" /></clipPath>
      <clipPath id="cutClip2_${safeId}"><rect x="315" y="118" width="220" height="260" rx="18" /></clipPath>
      <clipPath id="cutClip3_${safeId}"><rect x="65" y="402" width="220" height="260" rx="18" /></clipPath>
      <clipPath id="cutClip4_${safeId}"><rect x="315" y="402" width="220" height="260" rx="18" /></clipPath>
    </defs>

    <!-- Outer Frame Card -->
    <rect width="600" height="800" rx="28" fill="url(#bgGrad_${safeId})" />
    <rect width="600" height="800" rx="28" fill="url(#dots_${safeId})" />
    <rect x="20" y="20" width="560" height="760" rx="22" fill="none" stroke="${accentHex}" stroke-width="3.5" stroke-opacity="0.5" />

    <!-- Header Banner -->
    <text x="300" y="62" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="800" font-size="21" fill="${textHex}" letter-spacing="1.5">${safeTitle}</text>
    <text x="300" y="88" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-weight="600" font-size="13" fill="${textHex}" fill-opacity="0.85">${safeSubtitle}</text>

    <!-- CUT 1: V-Sign Selfie Pose Model -->
    <g clip-path="url(#cutClip1_${safeId})">
      <rect x="65" y="118" width="220" height="260" fill="url(#photoBg1_${safeId})" />
      <!-- Torso -->
      <path d="M 115 378 C 115 315, 235 315, 235 378 Z" fill="#475569" />
      <path d="M 155 318 L 175 340 L 195 318 Z" fill="#ffffff" />
      <!-- Head and Neck -->
      <rect x="166" y="275" width="18" height="22" rx="4" fill="#fed7aa" />
      <ellipse cx="175" cy="245" rx="36" ry="42" fill="#fed7aa" />
      <!-- Hair -->
      <path d="M 136 245 C 136 195, 214 195, 214 245 C 205 215, 145 215, 136 245 Z" fill="#1e293b" />
      <path d="M 140 230 C 155 242, 168 242, 175 236 C 182 242, 195 242, 210 230 C 200 215, 150 215, 140 230 Z" fill="#1e293b" />
      <!-- Blush -->
      <ellipse cx="154" cy="254" rx="7" ry="4" fill="#fb7185" fill-opacity="0.6" />
      <ellipse cx="196" cy="254" rx="7" ry="4" fill="#fb7185" fill-opacity="0.6" />
      <!-- Eyes and Smile -->
      <path d="M 152 244 Q 157 238 162 244" stroke="#1e293b" stroke-width="2.5" fill="none" stroke-linecap="round" />
      <circle cx="193" cy="242" r="3" fill="#1e293b" />
      <path d="M 168 260 Q 175 267 182 260" stroke="#e11d48" stroke-width="2.5" fill="none" stroke-linecap="round" />
      <!-- Hand Peace Sign -->
      <g transform="translate(205, 240)">
        <ellipse cx="14" cy="18" rx="10" ry="12" fill="#fed7aa" />
        <rect x="6" y="-8" width="6" height="20" rx="3" fill="#fed7aa" transform="rotate(-15)" />
        <rect x="16" y="-6" width="6" height="20" rx="3" fill="#fed7aa" transform="rotate(15)" />
      </g>
      <!-- Sparkles -->
      <text x="90" y="165" font-size="18">✨</text>
      <text x="240" y="175" font-size="16">💖</text>
    </g>
    <rect x="65" y="118" width="220" height="260" rx="18" fill="none" stroke="${accentHex}" stroke-width="3" />
    <rect x="77" y="130" width="76" height="24" rx="12" fill="#ffffff" fill-opacity="0.9" stroke="${accentHex}" stroke-width="1.5" />
    <text x="115" y="146" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="800" font-size="11" fill="${accentHex}">01 · POSE</text>

    <!-- CUT 2: Aegyo Cheek Heart Model -->
    <g clip-path="url(#cutClip2_${safeId})">
      <rect x="315" y="118" width="220" height="260" fill="url(#photoBg2_${safeId})" />
      <!-- Torso -->
      <path d="M 365 378 C 365 315, 485 315, 485 378 Z" fill="#6d28d9" />
      <!-- Beret Hat -->
      <ellipse cx="425" cy="202" rx="46" ry="18" fill="#ec4899" transform="rotate(-8 425 202)" />
      <circle cx="420" cy="186" r="4" fill="#ec4899" />
      <!-- Head and Neck -->
      <rect x="416" y="275" width="18" height="22" rx="4" fill="#fed7aa" />
      <ellipse cx="425" cy="245" rx="36" ry="42" fill="#fed7aa" />
      <!-- Hair -->
      <path d="M 386 245 C 386 200, 464 200, 464 245 C 455 220, 395 220, 386 245 Z" fill="#334155" />
      <!-- Blush -->
      <ellipse cx="404" cy="254" rx="8" ry="4.5" fill="#f43f5e" fill-opacity="0.6" />
      <ellipse cx="446" cy="254" rx="8" ry="4.5" fill="#f43f5e" fill-opacity="0.6" />
      <!-- Eyes and Smile -->
      <path d="M 402 242 Q 407 236 412 242" stroke="#1e293b" stroke-width="2.5" fill="none" stroke-linecap="round" />
      <path d="M 438 242 Q 443 236 448 242" stroke="#1e293b" stroke-width="2.5" fill="none" stroke-linecap="round" />
      <path d="M 418 260 Q 425 268 432 260" stroke="#db2777" stroke-width="2.5" fill="none" stroke-linecap="round" />
      <!-- Finger Heart Hand -->
      <g transform="translate(440, 248)">
        <ellipse cx="14" cy="14" rx="8" ry="10" fill="#fed7aa" />
        <path d="M 8 2 C 8 -4, 16 -4, 16 2 C 16 6, 8 10, 8 10 C 8 10, 0 6, 0 2 C 0 -4, 8 -4, 8 2 Z" fill="#e11d48" transform="scale(0.8) translate(8, -12)" />
      </g>
      <!-- Sparkles -->
      <text x="335" y="165" font-size="18">🌸</text>
      <text x="490" y="175" font-size="16">🎀</text>
    </g>
    <rect x="315" y="118" width="220" height="260" rx="18" fill="none" stroke="${accentHex}" stroke-width="3" />
    <rect x="327" y="130" width="76" height="24" rx="12" fill="#ffffff" fill-opacity="0.9" stroke="${accentHex}" stroke-width="1.5" />
    <text x="365" y="146" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="800" font-size="11" fill="${accentHex}">02 · GLOW</text>

    <!-- CUT 3: Chic Sunglasses / Confident Pose -->
    <g clip-path="url(#cutClip3_${safeId})">
      <rect x="65" y="402" width="220" height="260" fill="url(#photoBg3_${safeId})" />
      <!-- Torso -->
      <path d="M 115 662 C 115 599, 235 599, 235 662 Z" fill="#0f172a" />
      <path d="M 160 600 L 175 625 L 190 600 Z" fill="#38bdf8" />
      <!-- Head and Neck -->
      <rect x="166" y="559" width="18" height="22" rx="4" fill="#fed7aa" />
      <ellipse cx="175" cy="529" rx="36" ry="42" fill="#fed7aa" />
      <!-- Hair with highlight -->
      <path d="M 134 529 C 134 479, 216 479, 216 529 C 205 500, 145 500, 134 529 Z" fill="#1e1b4b" />
      <!-- Chic Sunglasses -->
      <g transform="translate(142, 516)">
        <rect x="0" y="0" width="28" height="18" rx="6" fill="#18181b" />
        <rect x="38" y="0" width="28" height="18" rx="6" fill="#18181b" />
        <rect x="25" y="4" width="16" height="4" rx="2" fill="#18181b" />
        <line x1="4" y1="4" x2="20" y2="14" stroke="#ffffff" stroke-width="1.8" stroke-opacity="0.7" />
        <line x1="42" y1="4" x2="58" y2="14" stroke="#ffffff" stroke-width="1.8" stroke-opacity="0.7" />
      </g>
      <!-- Blush and Confident Smile -->
      <ellipse cx="154" cy="544" rx="7" ry="4" fill="#38bdf8" fill-opacity="0.4" />
      <ellipse cx="196" cy="544" rx="7" ry="4" fill="#38bdf8" fill-opacity="0.4" />
      <path d="M 168 550 Q 175 556 182 550" stroke="#0284c7" stroke-width="2.5" fill="none" stroke-linecap="round" />
      <!-- Chin Hand Pose -->
      <ellipse cx="175" cy="564" rx="14" ry="7" fill="#fed7aa" />
      <!-- Sparkles -->
      <text x="90" y="450" font-size="18">💎</text>
      <text x="240" y="460" font-size="16">⚡</text>
    </g>
    <rect x="65" y="402" width="220" height="260" rx="18" fill="none" stroke="${accentHex}" stroke-width="3" />
    <rect x="77" y="414" width="76" height="24" rx="12" fill="#ffffff" fill-opacity="0.9" stroke="${accentHex}" stroke-width="1.5" />
    <text x="115" y="430" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="800" font-size="11" fill="${accentHex}">03 · CHIC</text>

    <!-- CUT 4: Candid Laugh and Camera Pose -->
    <g clip-path="url(#cutClip4_${safeId})">
      <rect x="315" y="402" width="220" height="260" fill="url(#photoBg4_${safeId})" />
      <!-- Torso -->
      <path d="M 365 662 C 365 599, 485 599, 485 662 Z" fill="#b45309" />
      <!-- Head and Neck -->
      <rect x="416" y="559" width="18" height="22" rx="4" fill="#fed7aa" />
      <ellipse cx="425" cy="529" rx="36" ry="42" fill="#fed7aa" />
      <!-- Hair with cute bangs -->
      <path d="M 386 529 C 386 480, 464 480, 464 529 C 455 504, 395 504, 386 529 Z" fill="#292524" />
      <!-- Blush -->
      <ellipse cx="404" cy="542" rx="8" ry="5" fill="#f59e0b" fill-opacity="0.6" />
      <ellipse cx="446" cy="542" rx="8" ry="5" fill="#f59e0b" fill-opacity="0.6" />
      <!-- Big Laughing Eyes and Open Smile -->
      <path d="M 402 526 Q 408 520 414 526" stroke="#1e293b" stroke-width="2.5" fill="none" stroke-linecap="round" />
      <path d="M 436 526 Q 442 520 448 526" stroke="#1e293b" stroke-width="2.5" fill="none" stroke-linecap="round" />
      <path d="M 414 544 Q 425 558 436 544 Z" fill="#e11d48" />
      <rect x="420" y="544" width="10" height="3" rx="1.5" fill="#ffffff" />
      <!-- Mini Camera Prop in Hand -->
      <g transform="translate(438, 560)">
        <rect x="0" y="0" width="30" height="20" rx="4" fill="#1e293b" />
        <circle cx="15" cy="10" r="6" fill="#38bdf8" stroke="#ffffff" stroke-width="1.5" />
        <rect x="4" y="-3" width="7" height="3" rx="1" fill="#ef4444" />
      </g>
      <!-- Sparkles -->
      <text x="335" y="450" font-size="18">🎉</text>
      <text x="490" y="460" font-size="16">📸</text>
    </g>
    <rect x="315" y="402" width="220" height="260" rx="18" fill="none" stroke="${accentHex}" stroke-width="3" />
    <rect x="327" y="414" width="76" height="24" rx="12" fill="#ffffff" fill-opacity="0.9" stroke="${accentHex}" stroke-width="1.5" />
    <text x="365" y="430" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="800" font-size="11" fill="${accentHex}">04 · SMILE</text>

    <!-- Corner Decorative Icons -->
    <text x="50" y="66" font-size="28">${icons[0]}</text>
    <text x="515" y="66" font-size="28">${icons[1]}</text>
    <text x="50" y="744" font-size="28">${icons[2]}</text>
    <text x="515" y="744" font-size="28">${icons[3]}</text>

    <!-- Footer Stamp -->
    <rect x="175" y="694" width="250" height="34" rx="17" fill="${accentHex}" />
    <text x="300" y="716" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="800" font-size="12" fill="#ffffff" letter-spacing="1">${safePriceBadge}</text>
    <text x="300" y="756" text-anchor="middle" font-family="monospace" font-weight="700" font-size="11" fill="${textHex}" fill-opacity="0.8">K-CLICK PHOTOBOOTH LIVE FRAME</text>
  </svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

/**
 * Creates transparent SVG frame overlay for live photobooth camera & transparent download
 */
export function createFrameOverlaySvg(
  bgHex: string,
  accentHex: string,
  textHex: string,
  title: string,
  subtitle: string,
  priceBadge: string,
  icons: [string, string, string, string]
): string {
  const safeId = Math.abs(
    (title + bgHex + accentHex).split('').reduce((acc, c) => ((acc << 5) - acc + c.charCodeAt(0)) | 0, 0)
  ).toString(36);

  const safeTitle = escapeXml(title);
  const safeSubtitle = escapeXml(subtitle);
  const safePriceBadge = escapeXml(priceBadge);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800" width="600" height="800">
    <defs>
      <linearGradient id="ovBg_${safeId}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${bgHex}" />
        <stop offset="100%" stop-color="${bgHex}" />
      </linearGradient>
      <mask id="ovCutout_${safeId}">
        <rect width="600" height="800" rx="28" fill="#ffffff" />
        <rect x="65" y="118" width="220" height="260" rx="18" fill="#000000" />
        <rect x="315" y="118" width="220" height="260" rx="18" fill="#000000" />
        <rect x="65" y="402" width="220" height="260" rx="18" fill="#000000" />
        <rect x="315" y="402" width="220" height="260" rx="18" fill="#000000" />
      </mask>
    </defs>

    <rect width="600" height="800" rx="28" fill="url(#ovBg_${safeId})" mask="url(#ovCutout_${safeId})" />
    <rect x="20" y="20" width="560" height="760" rx="22" fill="none" stroke="${accentHex}" stroke-width="3.5" stroke-opacity="0.45" pointer-events="none" />

    <text x="300" y="62" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="800" font-size="20" fill="${textHex}" letter-spacing="1.5">${safeTitle}</text>
    <text x="300" y="88" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-weight="600" font-size="12" fill="${textHex}" fill-opacity="0.85">${safeSubtitle}</text>

    <!-- Cutout Border Strokes and Slot Badges -->
    <rect x="65" y="118" width="220" height="260" rx="18" fill="none" stroke="${accentHex}" stroke-width="3" />
    <rect x="77" y="130" width="76" height="24" rx="12" fill="#ffffff" fill-opacity="0.9" stroke="${accentHex}" stroke-width="1.5" />
    <text x="115" y="146" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="800" font-size="11" fill="${accentHex}">01 · POSE</text>

    <rect x="315" y="118" width="220" height="260" rx="18" fill="none" stroke="${accentHex}" stroke-width="3" />
    <rect x="327" y="130" width="76" height="24" rx="12" fill="#ffffff" fill-opacity="0.9" stroke="${accentHex}" stroke-width="1.5" />
    <text x="365" y="146" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="800" font-size="11" fill="${accentHex}">02 · GLOW</text>

    <rect x="65" y="402" width="220" height="260" rx="18" fill="none" stroke="${accentHex}" stroke-width="3" />
    <rect x="77" y="414" width="76" height="24" rx="12" fill="#ffffff" fill-opacity="0.9" stroke="${accentHex}" stroke-width="1.5" />
    <text x="115" y="430" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="800" font-size="11" fill="${accentHex}">03 · CHIC</text>

    <rect x="315" y="402" width="220" height="260" rx="18" fill="none" stroke="${accentHex}" stroke-width="3" />
    <rect x="327" y="414" width="76" height="24" rx="12" fill="#ffffff" fill-opacity="0.9" stroke="${accentHex}" stroke-width="1.5" />
    <text x="365" y="430" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="800" font-size="11" fill="${accentHex}">04 · SMILE</text>

    <!-- Corner Decorative Icons -->
    <text x="50" y="66" font-size="28">${icons[0]}</text>
    <text x="515" y="66" font-size="28">${icons[1]}</text>
    <text x="50" y="744" font-size="28">${icons[2]}</text>
    <text x="515" y="744" font-size="28">${icons[3]}</text>

    <!-- Footer Stamp -->
    <rect x="175" y="694" width="250" height="34" rx="17" fill="${accentHex}" />
    <text x="300" y="716" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="800" font-size="12" fill="#ffffff" letter-spacing="1">${safePriceBadge}</text>
    <text x="300" y="756" text-anchor="middle" font-family="monospace" font-weight="700" font-size="11" fill="${textHex}" fill-opacity="0.8">K-CLICK PHOTOBOOTH LIVE FRAME</text>
  </svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

// Pre-generated High-Resolution Photobooth Frame Preview Mockups & Overlays
const ENCORE_STAGE_PREVIEW = createFrameSvgPreview(
  '#ffe4e6',
  '#e11d48',
  '#9f1239',
  'ENCORE STAGE • SPECIAL CUT',
  'MOMENTS & MEMORIES • LIVE EDITION',
  'RP 15.000 · OFFICIAL STAGE FRAME',
  ['🎤', '💖', '👑', '🎀']
);
const ENCORE_STAGE_OVERLAY = createFrameOverlaySvg(
  '#ffe4e6',
  '#e11d48',
  '#9f1239',
  'ENCORE STAGE • SPECIAL CUT',
  'MOMENTS & MEMORIES • LIVE EDITION',
  'RP 15.000 · OFFICIAL STAGE FRAME',
  ['🎤', '💖', '👑', '🎀']
);

const CYBER_CHROME_PREVIEW = createFrameSvgPreview(
  '#ede9fe',
  '#7c3aed',
  '#4c1d95',
  'CYBER CHROME // NEXT LEVEL',
  'DIGITAL EDITION • FUTURE WAVE',
  'RP 10.000 · CYBER CHROME FRAME',
  ['💿', '⚡', '🎧', '💜']
);
const CYBER_CHROME_OVERLAY = createFrameOverlaySvg(
  '#ede9fe',
  '#7c3aed',
  '#4c1d95',
  'CYBER CHROME // NEXT LEVEL',
  'DIGITAL EDITION • FUTURE WAVE',
  'RP 10.000 · CYBER CHROME FRAME',
  ['💿', '⚡', '🎧', '💜']
);

const ROYAL_VELVET_PREVIEW = createFrameSvgPreview(
  '#18181b',
  '#f43f5e',
  '#fafafa',
  'ROYAL VELVET NOIR • PHOTO STRIP',
  'EXCLUSIVE MIDNIGHT EDITION',
  'RP 15.000 · ROYAL NOIR FRAME',
  ['🖤', '🌙', '🌹', '🍷']
);
const ROYAL_VELVET_OVERLAY = createFrameOverlaySvg(
  '#18181b',
  '#f43f5e',
  '#fafafa',
  'ROYAL VELVET NOIR • PHOTO STRIP',
  'EXCLUSIVE MIDNIGHT EDITION',
  'RP 15.000 · ROYAL NOIR FRAME',
  ['🖤', '🌙', '🌹', '🍷']
);

const BLOSSOM_PASTEL_PREVIEW = createFrameSvgPreview(
  '#fce7f3',
  '#db2777',
  '#be185d',
  'BLOSSOM SPRING • FRESH CUT',
  'BLOOMING DAYS • SUNSHINE',
  'RP 10.000 · SPRING BLOSSOM FRAME',
  ['🌸', '🌷', '💌', '🎀']
);
const BLOSSOM_PASTEL_OVERLAY = createFrameOverlaySvg(
  '#fce7f3',
  '#db2777',
  '#be185d',
  'BLOSSOM SPRING • FRESH CUT',
  'BLOOMING DAYS • SUNSHINE',
  'RP 10.000 · SPRING BLOSSOM FRAME',
  ['🌸', '🌷', '💌', '🎀']
);

const DREAMY_SKY_PREVIEW = createFrameSvgPreview(
  '#e0f2fe',
  '#0284c7',
  '#0369a1',
  'DREAMY SKY CLOUD • PHOTO STUDIO',
  'SUNNY DAY • AIRY MOMENTS',
  'RP 5.000 · DREAMY SKY CLOUD FRAME',
  ['☁️', '🫧', '💙', '🐬']
);
const DREAMY_SKY_OVERLAY = createFrameOverlaySvg(
  '#e0f2fe',
  '#0284c7',
  '#0369a1',
  'DREAMY SKY CLOUD • PHOTO STUDIO',
  'SUNNY DAY • AIRY MOMENTS',
  'RP 5.000 · DREAMY SKY CLOUD FRAME',
  ['☁️', '🫧', '💙', '🐬']
);

const BUTTER_CAFE_PREVIEW = createFrameSvgPreview(
  '#fef3c7',
  '#d97706',
  '#92400e',
  'BUTTER BEAR CAFE • WARM EVENT',
  'SWEET COFFEE • HAPPY MOMENTS',
  'RP 10.000 · WARM BUTTER BEAR FRAME',
  ['🧸', '🥐', '☕', '💛']
);
const BUTTER_CAFE_OVERLAY = createFrameOverlaySvg(
  '#fef3c7',
  '#d97706',
  '#92400e',
  'BUTTER BEAR CAFE • WARM EVENT',
  'SWEET COFFEE • HAPPY MOMENTS',
  'RP 10.000 · WARM BUTTER BEAR FRAME',
  ['🧸', '🥐', '☕', '💛']
);

const ROSE_CRYSTAL_PREVIEW = createFrameSvgPreview(
  '#f5d0fe',
  '#9333ea',
  '#581c87',
  'ROSE QUARTZ & CRYSTAL • CUT',
  'FOREVER SHINING MEMORIES',
  'RP 15.000 · ROSE CRYSTAL FRAME',
  ['💎', '🌸', '💖', '💜']
);
const ROSE_CRYSTAL_OVERLAY = createFrameOverlaySvg(
  '#f5d0fe',
  '#9333ea',
  '#581c87',
  'ROSE QUARTZ & CRYSTAL • CUT',
  'FOREVER SHINING MEMORIES',
  'RP 15.000 · ROSE CRYSTAL FRAME',
  ['💎', '🌸', '💖', '💜']
);

const NEO_MATCHA_PREVIEW = createFrameSvgPreview(
  '#dcfce7',
  '#16a34a',
  '#14532d',
  'NEO MATCHA MINT • SPECIAL CUT',
  'FRESH VIBES • SPECIAL DAY',
  'RP 5.000 · NEO MATCHA MINT FRAME',
  ['🍀', '💚', '🎧', '🔋']
);
const NEO_MATCHA_OVERLAY = createFrameOverlaySvg(
  '#dcfce7',
  '#16a34a',
  '#14532d',
  'NEO MATCHA MINT • SPECIAL CUT',
  'FRESH VIBES • SPECIAL DAY',
  'RP 5.000 · NEO MATCHA MINT FRAME',
  ['🍀', '💚', '🎧', '🔋']
);

const SOFT_LAVENDER_PREVIEW = createFrameSvgPreview(
  '#f3e8ff',
  '#9333ea',
  '#6b21a8',
  'LAVENDER STUDIO • FOREVER MOMENTS',
  'SWEET MEMORIES • PHOTO STUDIO',
  'RP 5.000 · SOFT LAVENDER FRAME',
  ['💜', '🎀', '📸', '🌸']
);
const SOFT_LAVENDER_OVERLAY = createFrameOverlaySvg(
  '#f3e8ff',
  '#9333ea',
  '#6b21a8',
  'LAVENDER STUDIO • FOREVER MOMENTS',
  'SWEET MEMORIES • PHOTO STUDIO',
  'RP 5.000 · SOFT LAVENDER FRAME',
  ['💜', '🎀', '📸', '🌸']
);

/**
 * Platform Official Starter Frames
 * Tiered strictly at Rp 5.000, Rp 10.000, Rp 15.000
 * Authentic creator is K-Click Studio with genuine real-time metrics (0 until actual purchase & review).
 */
export const MARKETPLACE_FRAME_PRODUCTS: Product[] = [
  {
    id: 'frame-encore-stage-15k',
    creatorId: 'kclick-studio',
    creatorName: 'K-Click Studio',
    creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    name: 'Encore Stage Glow Frame Pack',
    category: 'Frame',
    description:
      'Frame photobooth bertema panggung pertunjukan dengan aksen rose-crimson dan border presisi. Setelah dibeli, frame ini dapat langsung diaplikasikan di Photobooth Live (semua rasio: Strip, 2:3, 3:4, 4:5, 9:16) maupun diunduh dalam format PNG transparan.',
    price: 15000,
    previewImage: ENCORE_STAGE_PREVIEW,
    productFile: 'templates/kclick-studio/frame-encore-stage-15k/master.png',
    tags: ['frame', 'photobooth', 'stage', 'encore', 'glow', '15k'],
    status: 'approved',
    rating: 0,
    reviewCount: 0,
    salesCount: 0,
    licenseType: 'Personal Use',
    copyrightAgreed: true,
    photoboothConfig: {
      id: 'frame-encore-stage-15k',
      name: 'Encore Stage Glow',
      category: 'Stage Glow',
      themeColor: '#ffe4e6',
      accentColor: '#e11d48',
      textColor: '#9f1239',
      bannerText: 'ENCORE STAGE • SPECIAL CUT',
      koreanText: 'MOMENTS & MEMORIES • LIVE EDITION',
      stickers: [
        { icon: '🎤', label: 'Mic', x: 8, y: 3 },
        { icon: '💖', label: 'Heart', x: 85, y: 3 },
        { icon: '👑', label: 'Crown', x: 12, y: 92 },
        { icon: '🎀', label: 'Ribbon', x: 82, y: 92 },
      ],
      previewUrl: ENCORE_STAGE_PREVIEW,
      frameOverlayUrl: ENCORE_STAGE_OVERLAY,
      isPremium: false,
    },
    createdAt: '2026-09-15T08:00:00.000Z',
  },
  {
    id: 'frame-cyber-chrome-10k',
    creatorId: 'kclick-studio',
    creatorName: 'K-Click Studio',
    creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    name: 'Cyber Chrome Metallic Frame',
    category: 'Frame',
    description:
      'Frame photobooth modern dengan aksen ungu elektrik dan tipografi futuristik. Siap langsung dipakai di Photobooth Live begitu transaksi pembelian terkonfirmasi!',
    price: 10000,
    previewImage: CYBER_CHROME_PREVIEW,
    productFile: 'templates/kclick-studio/frame-cyber-chrome-10k/master.png',
    tags: ['frame', 'photobooth', 'cyber', 'chrome', 'metallic', 'modern', '10k'],
    status: 'approved',
    rating: 0,
    reviewCount: 0,
    salesCount: 0,
    licenseType: 'Commercial Use',
    copyrightAgreed: true,
    photoboothConfig: {
      id: 'frame-cyber-chrome-10k',
      name: 'Cyber Chrome Metallic',
      category: 'Cyber Modern',
      themeColor: '#ede9fe',
      accentColor: '#7c3aed',
      textColor: '#4c1d95',
      bannerText: 'CYBER CHROME // NEXT LEVEL',
      koreanText: 'DIGITAL EDITION • FUTURE WAVE',
      stickers: [
        { icon: '💿', label: 'CD', x: 8, y: 3 },
        { icon: '⚡', label: 'Bolt', x: 85, y: 3 },
        { icon: '🎧', label: 'Headphone', x: 12, y: 92 },
        { icon: '💜', label: 'Purple Heart', x: 82, y: 92 },
      ],
      previewUrl: CYBER_CHROME_PREVIEW,
      frameOverlayUrl: CYBER_CHROME_OVERLAY,
      isPremium: false,
    },
    createdAt: '2026-09-16T09:30:00.000Z',
  },
  {
    id: 'frame-royal-velvet-15k',
    creatorId: 'kclick-studio',
    creatorName: 'K-Click Studio',
    creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    name: 'Royal Velvet Midnight Noir Frame',
    category: 'Frame',
    description:
      'Desain frame obsidian hitam elegan dengan aksen velvet rose untuk konsep foto bertema malam dan formal studio. Langsung aktif dan bisa dipasang pada Photobooth Live setelah pembelian.',
    price: 15000,
    previewImage: ROYAL_VELVET_PREVIEW,
    productFile: 'templates/kclick-studio/frame-royal-velvet-15k/master.png',
    tags: ['frame', 'photobooth', 'noir', 'velvet', 'midnight', 'luxury', '15k'],
    status: 'approved',
    rating: 0,
    reviewCount: 0,
    salesCount: 0,
    licenseType: 'Commercial Use',
    copyrightAgreed: true,
    photoboothConfig: {
      id: 'frame-royal-velvet-15k',
      name: 'Royal Velvet Midnight Noir',
      category: 'Noir Luxury',
      themeColor: '#18181b',
      accentColor: '#f43f5e',
      textColor: '#fafafa',
      bannerText: 'ROYAL VELVET NOIR • PHOTO STRIP',
      koreanText: 'EXCLUSIVE MIDNIGHT EDITION',
      stickers: [
        { icon: '🖤', label: 'Black Heart', x: 8, y: 3 },
        { icon: '🌙', label: 'Moon', x: 85, y: 3 },
        { icon: '🌹', label: 'Rose', x: 12, y: 92 },
        { icon: '🍷', label: 'Glass', x: 82, y: 92 },
      ],
      previewUrl: ROYAL_VELVET_PREVIEW,
      frameOverlayUrl: ROYAL_VELVET_OVERLAY,
      isPremium: false,
    },
    createdAt: '2026-09-17T11:00:00.000Z',
  },
  {
    id: 'frame-blossom-pastel-10k',
    creatorId: 'kclick-studio',
    creatorName: 'K-Click Studio',
    creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    name: 'Blossom Pastel Spring Frame',
    category: 'Frame',
    description:
      'Frame bernuansa musim semi dengan warna pink lembut dan dekorasi floral estetik. Harga Rp 10.000 dan langsung bisa digunakan di Photobooth Live!',
    price: 10000,
    previewImage: BLOSSOM_PASTEL_PREVIEW,
    productFile: 'templates/kclick-studio/frame-blossom-pastel-10k/master.png',
    tags: ['frame', 'photobooth', 'blossom', 'spring', 'pink', 'pastel', '10k'],
    status: 'approved',
    rating: 0,
    reviewCount: 0,
    salesCount: 0,
    licenseType: 'Personal Use',
    copyrightAgreed: true,
    photoboothConfig: {
      id: 'frame-blossom-pastel-10k',
      name: 'Blossom Pastel Spring',
      category: 'Spring Pastel',
      themeColor: '#fce7f3',
      accentColor: '#db2777',
      textColor: '#be185d',
      bannerText: 'BLOSSOM SPRING • FRESH CUT',
      koreanText: 'BLOOMING DAYS • SUNSHINE',
      stickers: [
        { icon: '🌸', label: 'Sakura', x: 8, y: 3 },
        { icon: '🌷', label: 'Tulip', x: 85, y: 3 },
        { icon: '💌', label: 'Love Letter', x: 12, y: 92 },
        { icon: '🎀', label: 'Bow', x: 82, y: 92 },
      ],
      previewUrl: BLOSSOM_PASTEL_PREVIEW,
      frameOverlayUrl: BLOSSOM_PASTEL_OVERLAY,
      isPremium: false,
    },
    createdAt: '2026-09-18T10:15:00.000Z',
  },
  {
    id: 'frame-dreamy-sky-5k',
    creatorId: 'kclick-studio',
    creatorName: 'K-Click Studio',
    creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    name: 'Dreamy Sky Cloud Frame',
    category: 'Frame',
    description:
      'Frame warna biru langit pastel bergaya minimalis bersih. Cocok untuk foto bersama sahabat atau keluarga. Seharga Rp 5.000 dan terintegrasi penuh dengan Photobooth Live.',
    price: 5000,
    previewImage: DREAMY_SKY_PREVIEW,
    productFile: 'templates/kclick-studio/frame-dreamy-sky-5k/master.png',
    tags: ['frame', 'photobooth', 'sky', 'cloud', 'pastel', 'aesthetic', '5k'],
    status: 'approved',
    rating: 0,
    reviewCount: 0,
    salesCount: 0,
    licenseType: 'Personal Use',
    copyrightAgreed: true,
    photoboothConfig: {
      id: 'frame-dreamy-sky-5k',
      name: 'Dreamy Sky Cloud',
      category: 'Minimal Aesthetic',
      themeColor: '#e0f2fe',
      accentColor: '#0284c7',
      textColor: '#0369a1',
      bannerText: 'DREAMY SKY CLOUD • PHOTO STUDIO',
      koreanText: 'SUNNY DAY • AIRY MOMENTS',
      stickers: [
        { icon: '☁️', label: 'Cloud', x: 8, y: 3 },
        { icon: '🫧', label: 'Bubble', x: 85, y: 3 },
        { icon: '💙', label: 'Blue Heart', x: 12, y: 92 },
        { icon: '🐬', label: 'Dolphin', x: 82, y: 92 },
      ],
      previewUrl: DREAMY_SKY_PREVIEW,
      frameOverlayUrl: DREAMY_SKY_OVERLAY,
      isPremium: false,
    },
    createdAt: '2026-09-19T14:20:00.000Z',
  },
  {
    id: 'frame-butter-cafe-10k',
    creatorId: 'kclick-studio',
    creatorName: 'K-Click Studio',
    creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    name: 'Soft Butter Bear Cafe Frame',
    category: 'Frame',
    description:
      'Frame lucu bertema momen cafe hangat dengan nuansa cream-butter dan ornamen beruang. Harga Rp 10.000 dan langsung siap dipakai di Photobooth Live setelah pembelian!',
    price: 10000,
    previewImage: BUTTER_CAFE_PREVIEW,
    productFile: 'templates/kclick-studio/frame-butter-cafe-10k/master.png',
    tags: ['frame', 'photobooth', 'cafe', 'teddy', 'cute', 'warm', '10k'],
    status: 'approved',
    rating: 0,
    reviewCount: 0,
    salesCount: 0,
    licenseType: 'Personal Use',
    copyrightAgreed: true,
    photoboothConfig: {
      id: 'frame-butter-cafe-10k',
      name: 'Soft Butter Bear Cafe',
      category: 'Cute Cafe',
      themeColor: '#fef3c7',
      accentColor: '#d97706',
      textColor: '#92400e',
      bannerText: 'BUTTER BEAR CAFE • WARM EVENT',
      koreanText: 'SWEET COFFEE • HAPPY MOMENTS',
      stickers: [
        { icon: '🧸', label: 'Teddy', x: 8, y: 3 },
        { icon: '🥐', label: 'Croissant', x: 85, y: 3 },
        { icon: '☕', label: 'Coffee', x: 12, y: 92 },
        { icon: '💛', label: 'Yellow Heart', x: 82, y: 92 },
      ],
      previewUrl: BUTTER_CAFE_PREVIEW,
      frameOverlayUrl: BUTTER_CAFE_OVERLAY,
      isPremium: false,
    },
    createdAt: '2026-09-20T16:00:00.000Z',
  },
  {
    id: 'frame-rose-crystal-15k',
    creatorId: 'kclick-studio',
    creatorName: 'K-Click Studio',
    creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    name: 'Rose Quartz & Crystal Frame',
    category: 'Photobooth',
    description:
      'Frame Photobooth 4-Cut dengan warna gradasi pastel Rose Quartz & Serenity berhiaskan ornamen kristal berkilau. Harga Rp 15.000 dan langsung terintegrasi di Photobooth Live.',
    price: 15000,
    previewImage: ROSE_CRYSTAL_PREVIEW,
    productFile: 'templates/kclick-studio/frame-rose-crystal-15k/master.png',
    tags: ['frame', 'photobooth', 'crystal', 'rose quartz', 'serenity', 'pastel', '15k'],
    status: 'approved',
    rating: 0,
    reviewCount: 0,
    salesCount: 0,
    licenseType: 'Personal Use',
    copyrightAgreed: true,
    photoboothConfig: {
      id: 'frame-rose-crystal-15k',
      name: 'Rose Quartz & Crystal',
      category: 'Pastel Gem',
      themeColor: '#f5d0fe',
      accentColor: '#9333ea',
      textColor: '#581c87',
      bannerText: 'ROSE QUARTZ & SERENITY • CRYSTAL CUT',
      koreanText: 'FOREVER SHINING MEMORIES',
      stickers: [
        { icon: '💎', label: 'Diamond', x: 8, y: 3 },
        { icon: '🌸', label: 'Blossom', x: 85, y: 3 },
        { icon: '💖', label: 'Heart', x: 12, y: 92 },
        { icon: '💜', label: 'Purple Heart', x: 82, y: 92 },
      ],
      previewUrl: ROSE_CRYSTAL_PREVIEW,
      frameOverlayUrl: ROSE_CRYSTAL_OVERLAY,
      isPremium: false,
    },
    createdAt: '2026-09-22T12:00:00.000Z',
  },
  {
    id: 'frame-neo-matcha-5k',
    creatorId: 'kclick-studio',
    creatorName: 'K-Click Studio',
    creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    name: 'Neo Matcha Mint Strip Frame',
    category: 'Photobooth',
    description:
      'Frame Photobooth segar berwarna matcha mint dengan aksen street-style modern. Harga Rp 5.000 dan siap digunakan langsung pada Live Camera Previewer.',
    price: 5000,
    previewImage: NEO_MATCHA_PREVIEW,
    productFile: 'templates/kclick-studio/frame-neo-matcha-5k/master.png',
    tags: ['frame', 'photobooth', 'mint', 'matcha', 'green', 'fresh', '5k'],
    status: 'approved',
    rating: 0,
    reviewCount: 0,
    salesCount: 0,
    licenseType: 'Personal Use',
    copyrightAgreed: true,
    photoboothConfig: {
      id: 'frame-neo-matcha-5k',
      name: 'Neo Matcha Mint',
      category: 'Neo Street',
      themeColor: '#dcfce7',
      accentColor: '#16a34a',
      textColor: '#14532d',
      bannerText: 'NEO MATCHA MINT • SPECIAL CUT',
      koreanText: 'FRESH VIBES • SPECIAL DAY',
      stickers: [
        { icon: '🍀', label: 'Clover', x: 8, y: 3 },
        { icon: '💚', label: 'Green Heart', x: 85, y: 3 },
        { icon: '🎧', label: 'Headset', x: 12, y: 92 },
        { icon: '🔋', label: 'Battery', x: 82, y: 92 },
      ],
      previewUrl: NEO_MATCHA_PREVIEW,
      frameOverlayUrl: NEO_MATCHA_OVERLAY,
      isPremium: false,
    },
    createdAt: '2026-09-24T09:45:00.000Z',
  },
  {
    id: 'frame-soft-lavender-5k',
    creatorId: 'kclick-studio',
    creatorName: 'K-Click Studio',
    creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    name: 'Soft Lavender Studio Frame',
    category: 'Frame',
    description:
      'Frame Photobooth edisi lavender lembut karya resmi studio K-Click. Didesain orisinal dengan resolusi tinggi, siap digunakan langsung di Photobooth Live.',
    price: 5000,
    previewImage: SOFT_LAVENDER_PREVIEW,
    productFile: 'templates/kclick-studio/frame-soft-lavender-5k/master.png',
    tags: ['frame', 'photobooth', 'lavender', 'pastel', 'studio', '5k'],
    status: 'approved',
    rating: 0,
    reviewCount: 0,
    salesCount: 0,
    licenseType: 'Personal Use',
    copyrightAgreed: true,
    photoboothConfig: {
      id: 'frame-soft-lavender-5k',
      name: 'Soft Lavender Edition',
      category: 'Aesthetic',
      themeColor: '#f3e8ff',
      accentColor: '#9333ea',
      textColor: '#6b21a8',
      bannerText: 'LAVENDER STUDIO • FOREVER MOMENTS',
      koreanText: 'SWEET MEMORIES • PHOTO STUDIO',
      stickers: [
        { icon: '💜', label: 'Heart', x: 8, y: 3 },
        { icon: '🎀', label: 'Ribbon', x: 85, y: 3 },
        { icon: '📸', label: 'Camera', x: 12, y: 92 },
        { icon: '🌸', label: 'Blossom', x: 82, y: 92 },
      ],
      previewUrl: SOFT_LAVENDER_PREVIEW,
      frameOverlayUrl: SOFT_LAVENDER_OVERLAY,
      isPremium: false,
    },
    createdAt: '2026-09-25T08:00:00.000Z',
  },
];

/**
 * Checks if a given product is a live-compatible photobooth frame
 */
export function isPhotoboothFrameProduct(product: Product): boolean {
  return (
    product.category === 'Frame' ||
    product.category === 'Photobooth' ||
    product.tags.some((t) => t.toLowerCase().includes('frame') || t.toLowerCase().includes('photobooth')) ||
    Boolean(product.photoboothConfig)
  );
}

/**
 * Returns a guaranteed valid fallback SVG preview image for any product
 */
export function getProductFallbackImage(product: Product): string {
  const off = MARKETPLACE_FRAME_PRODUCTS.find((p) => p.id === product.id);
  if (off) return off.previewImage;

  const cfg = product.photoboothConfig;
  return createFrameSvgPreview(
    cfg?.themeColor || '#fce7f3',
    cfg?.accentColor || '#db2777',
    cfg?.textColor || '#be185d',
    cfg?.bannerText || product.name.toUpperCase(),
    cfg?.koreanText || 'K-CLICK PHOTOBOOTH FRAME',
    `RP ${(product.price || 5000).toLocaleString('id-ID')}`,
    [
      cfg?.stickers?.[0]?.icon || '✨',
      cfg?.stickers?.[1]?.icon || '💖',
      cfg?.stickers?.[2]?.icon || '🎀',
      cfg?.stickers?.[3]?.icon || '🌸',
    ]
  );
}

/**
 * Converts a marketplace Product to PhotoboothTemplate
 */
export function productToPhotoboothTemplate(product: Product): any {
  const config = product.photoboothConfig || {
    id: product.id,
    name: product.name,
    category: product.category,
    themeColor: '#ffe4e6',
    accentColor: '#e11d48',
    textColor: '#9f1239',
    bannerText: product.name.toUpperCase(),
    koreanText: 'K-CLICK • PHOTOBOOTH FRAME',
    stickers: [
      { icon: '💖', label: 'Heart', x: 10, y: 5 },
      { icon: '🎀', label: 'Ribbon', x: 85, y: 5 },
      { icon: '✨', label: 'Sparkle', x: 12, y: 92 },
      { icon: '📸', label: 'Camera', x: 82, y: 92 },
    ],
    isPremium: false,
    previewUrl: product.previewImage,
  };

  const frameOverlayUrl =
    config.frameOverlayUrl ||
    (product as any).frameOverlayUrl ||
    createFrameOverlaySvg(
      config.themeColor || '#ffe4e6',
      config.accentColor || '#e11d48',
      config.textColor || '#9f1239',
      config.bannerText || product.name.toUpperCase(),
      config.koreanText || 'K-CLICK • PHOTOBOOTH FRAME',
      `OFFICIAL · ${product.name.toUpperCase()}`,
      [
        config.stickers?.[0]?.icon || '✨',
        config.stickers?.[1]?.icon || '💖',
        config.stickers?.[2]?.icon || '🎀',
        config.stickers?.[3]?.icon || '🌸',
      ]
    );

  return {
    ...config,
    previewUrl: product.previewImage || config.previewUrl,
    frameOverlayUrl,
  };
}
