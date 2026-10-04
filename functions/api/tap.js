// POST /api/tap — counts taps on Call / Text / WhatsApp and the gift buttons.
// Stored in D1 (binding DB, table "taps") as one counter per site, day and type.
// No personal data: no IP, no cookies, just the counter.
//
// See the numbers (Cloudflare dashboard → D1 → sarasota-sites → Console):
//   SELECT day, type, count FROM taps WHERE site = 'key-sailing' ORDER BY day DESC, type;

const TYPES = new Set(["call", "text", "whatsapp", "gift-400", "gift-500", "gift-600"]);

export async function onRequestPost({ request, env }) {
  const done = new Response(null, { status: 204 });

  // Only count taps sent from our own pages.
  const origin = request.headers.get("Origin");
  if (origin && new URL(origin).host !== new URL(request.url).host) return done;

  let type = "";
  try {
    type = String(JSON.parse(await request.text()).type || "");
  } catch {
    return done;
  }
  if (!TYPES.has(type) || !env.DB) return done;

  // Day in Sarasota time, YYYY-MM-DD
  const day = new Intl.DateTimeFormat("en-CA", { timeZone: "America/New_York" }).format(new Date());
  try {
    await env.DB.prepare(
      "INSERT INTO taps (site, day, type, count) VALUES (?1, ?2, ?3, 1) " +
        "ON CONFLICT (site, day, type) DO UPDATE SET count = count + 1"
    )
      .bind(env.SITE || "key-sailing", day, type)
      .run();
  } catch (err) {
    console.log("tap not counted", err);
  }
  return done;
}
