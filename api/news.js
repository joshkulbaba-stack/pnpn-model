export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  try {
    const r = await fetch('https://www.powermetallic.com/news/', {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    const html = await r.text();

    // Match <a href="/long-slug/">Headline text</a>
    const re = /<a\s+href="(\/[a-z0-9][a-z0-9_-]{15,}\/?)"[^>]*>\s*([^<]{20,300}?)\s*<\/a>/gi;
    const skip = /\/(news|contact|about|team|projects|investors|home|media|search|tabular)\/?$/i;
    const items = [], seen = new Set();
    let m;
    while ((m = re.exec(html)) !== null && items.length < 20) {
      const path = m[1].endsWith('/') ? m[1] : m[1] + '/';
      const headline = m[2].replace(/\s+/g, ' ').trim();
      if (!seen.has(path) && !skip.test(path)) {
        seen.add(path);
        items.push({ headline, url: 'https://www.powermetallic.com' + path });
      }
    }
    res.json({ items });
  } catch (e) {
    res.status(500).json({ items: [], error: e.message });
  }
}
