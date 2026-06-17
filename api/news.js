export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  try {
    const r = await fetch('https://www.powermetallic.com/news/', {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    const html = await r.text();

    const re = /<a\s+href="(\/[a-z0-9][a-z0-9_%-]{15,}\/?)"[^>]*>\s*([^<]{20,400}?)\s*<\/a>/gi;

    // Skip navigation, financial docs, and utility pages
    const skip = /\/(news|contact|about|team|projects|investors|home|media|search|tabular|financial|presentation|factsheet|agm|shareholder|corporate_governance|stock_info|management|directors|board|subscribe|privacy|terms)\/?($|\?)/i;

    const items = [], seen = new Set();
    let m;
    while ((m = re.exec(html)) !== null && items.length < 20) {
      const path = m[1].endsWith('/') ? m[1] : m[1] + '/';
      const headline = m[2].replace(/\s+/g, ' ').trim();
      // Skip PDFs, short utility paths, and known non-news sections
      if (!seen.has(path) && !skip.test(path) && !path.endsWith('.pdf/')) {
        seen.add(path);
        items.push({ headline, url: 'https://www.powermetallic.com' + path });
      }
    }
    res.json({ items });
  } catch (e) {
    res.status(500).json({ items: [], error: e.message });
  }
}
