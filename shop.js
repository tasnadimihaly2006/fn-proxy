// @ts-nocheck
export default async function handler(req, res) {
  const apiKey = process.env.FNAPIIO_KEY;
  if (!apiKey) {
    res.status(500).json({ error: "FNAPIIO_KEY nincs beállítva a Vercelben" });
    return;
  }

  try {
    const lang = req.query?.lang || "hu";
    const upstream = "https://fortniteapi.io/v2/shop?lang=" + encodeURIComponent(lang);

    const r = await fetch(upstream, { headers: { Authorization: apiKey } });
    const text = await r.text();

    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cache-Control", "s-maxage=600, stale-while-revalidate=300");
    res.status(r.status).send(text);
  } catch (e) {
    res.status(502).json({ error: "Upstream hiba", detail: String(e) });
  }
}
