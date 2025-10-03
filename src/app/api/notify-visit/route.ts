import { NextRequest, NextResponse } from 'next/server';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID!;

function deviceTypeEmoji(type: string) {
  if (type === 'Mobile') return '📱';
  if (type === 'Tablet') return '💻';
  return '🖥️';
}

function countryCodeToFlagEmoji(countryCode: string) {
  if (!countryCode) return '';
  return countryCode
    .toUpperCase()
    .replace(/./g, char =>
      String.fromCodePoint(127397 + char.charCodeAt(0))
    );
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { device, deviceType, fingerprint, url } = data;

    // Get IP address from headers (no req.ip)
    let ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '';
    if (!ip || ip === '::1' || ip === '127.0.0.1') ip = '';

    // Fetch geo info server-side using ipwho.is
    let country = 'Unknown';
    let countryFlag = '';
    try {
      if (ip) {
        const geoRes = await fetch(`https://ipwho.is/${ip}`);
        if (geoRes.ok) {
          const geo = await geoRes.json();
          if (geo.success) {
            country = geo.country || 'Unknown';
            countryFlag = geo.country_code ? countryCodeToFlagEmoji(geo.country_code) : '';
          }
        }
      }
    } catch (e) {
      // Ignore geo errors, fallback to unknown
    }

    // Date and time (server-side)
    const now = new Date();
    const date = now.toLocaleDateString('en-US');
    const time = now.toLocaleTimeString('en-US');

    const message = [
      '👀 <b>New Website Visit</b> 🚀',
      `🔗 <b>URL:</b> <a href="${url}">${url}</a>`,
      `🔎 <b>IP:</b> <code>${ip || 'Unknown'}</code>`,
      `🏳️ <b>Country:</b> ${countryFlag ? countryFlag + ' ' : ''}${country}`,
      `${deviceTypeEmoji(deviceType)} <b>Device:</b> ${deviceType} <code>${device}</code>`,
      `🆔 <b>Fingerprint:</b> <code>${fingerprint}</code>`,
      `📅 <b>Date:</b> <code>${date}</code>`,
      `⏰ <b>Time:</b> <code>${time}</code>`
    ].join('\n');

    const tgUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    try {
      await fetch(tgUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'HTML',
          disable_web_page_preview: true,
        }),
      });
    } catch (e) {
      // Telegram error, log but don't throw
      console.error('Telegram API failed', e);
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('Notify-visit API error:', e);
    return NextResponse.json({ ok: false, error: String(e) });
  }
}

export async function GET() {
  return NextResponse.json({ ok: false, error: 'Use POST' }, { status: 405 });
} 