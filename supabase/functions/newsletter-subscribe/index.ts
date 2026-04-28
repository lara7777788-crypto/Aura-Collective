// Public newsletter subscribe — no auth required. Accepts an email and tags.
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const json = (b: unknown, s = 200) =>
  new Response(JSON.stringify(b), { status: s, headers: { ...corsHeaders, "Content-Type": "application/json" } });

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const apiKey = Deno.env.get("MAILCHIMP_API_KEY");
    const audienceId = Deno.env.get("MAILCHIMP_AUDIENCE_ID");
    if (!apiKey || !audienceId) return json({ error: "Mailchimp not configured" }, 500);

    const dc = apiKey.split("-")[1];
    if (!dc) return json({ error: "Invalid Mailchimp API key (missing region)" }, 500);

    let body: any = {};
    try { body = await req.json(); } catch { /* empty */ }
    const email: string = (body?.email || "").toString().trim().toLowerCase();
    const extraTags: string[] = Array.isArray(body?.tags)
      ? body.tags.filter((t: any) => typeof t === "string")
      : [];

    if (!email || !EMAIL_RE.test(email) || email.length > 254) {
      return json({ error: "Invalid email" }, 400);
    }

    const tags = Array.from(new Set(["aurablog", ...extraTags]));
    const subscriberHash = await md5(email);
    const url = `https://${dc}.api.mailchimp.com/3.0/lists/${audienceId}/members/${subscriberHash}`;

    const res = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Basic ${btoa(`anystring:${apiKey}`)}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_address: email,
        status_if_new: "subscribed",
        tags,
      }),
    });

    if (!res.ok) {
      const t = await res.text();
      console.error("Mailchimp error", res.status, t);
      return json({ error: "Subscribe failed" }, 500);
    }

    return json({ success: true });
  } catch (e) {
    console.error(e);
    return json({ error: e instanceof Error ? e.message : "unknown" }, 500);
  }
});

async function md5(text: string): Promise<string> {
  const bytes = new TextEncoder().encode(text);
  const r = md5Bytes(bytes);
  return Array.from(r).map(b => b.toString(16).padStart(2, "0")).join("");
}

function md5Bytes(input: Uint8Array): Uint8Array {
  const x: number[] = [];
  const len = input.length;
  for (let i = 0; i < len; i += 4) {
    x[i >> 2] = (input[i] || 0) | ((input[i + 1] || 0) << 8) | ((input[i + 2] || 0) << 16) | ((input[i + 3] || 0) << 24);
  }
  x[len >> 2] = (x[len >> 2] || 0) | (0x80 << ((len % 4) * 8));
  const bitLen = len * 8;
  const padded = Math.ceil((len + 9) / 64) * 16;
  for (let i = x.length; i < padded; i++) x[i] = 0;
  x[padded - 2] = bitLen;
  x[padded - 1] = Math.floor(bitLen / 0x100000000);

  let a = 0x67452301, b = 0xefcdab89, c = 0x98badcfe, d = 0x10325476;
  const add = (a: number, b: number) => (a + b) | 0;
  const rol = (n: number, s: number) => (n << s) | (n >>> (32 - s));
  const F = (x: number, y: number, z: number) => (x & y) | (~x & z);
  const G = (x: number, y: number, z: number) => (x & z) | (y & ~z);
  const H = (x: number, y: number, z: number) => x ^ y ^ z;
  const I = (x: number, y: number, z: number) => y ^ (x | ~z);
  const cmn = (q: number, a: number, b: number, x: number, s: number, t: number) => add(rol(add(add(a, q), add(x, t)), s), b);
  const ff = (a: number, b: number, c: number, d: number, x: number, s: number, t: number) => cmn(F(b, c, d), a, b, x, s, t);
  const gg = (a: number, b: number, c: number, d: number, x: number, s: number, t: number) => cmn(G(b, c, d), a, b, x, s, t);
  const hh = (a: number, b: number, c: number, d: number, x: number, s: number, t: number) => cmn(H(b, c, d), a, b, x, s, t);
  const ii = (a: number, b: number, c: number, d: number, x: number, s: number, t: number) => cmn(I(b, c, d), a, b, x, s, t);

  for (let i = 0; i < x.length; i += 16) {
    const oa = a, ob = b, oc = c, od = d;
    a = ff(a, b, c, d, x[i + 0], 7, -680876936); d = ff(d, a, b, c, x[i + 1], 12, -389564586); c = ff(c, d, a, b, x[i + 2], 17, 606105819); b = ff(b, c, d, a, x[i + 3], 22, -1044525330);
    a = ff(a, b, c, d, x[i + 4], 7, -176418897); d = ff(d, a, b, c, x[i + 5], 12, 1200080426); c = ff(c, d, a, b, x[i + 6], 17, -1473231341); b = ff(b, c, d, a, x[i + 7], 22, -45705983);
    a = ff(a, b, c, d, x[i + 8], 7, 1770035416); d = ff(d, a, b, c, x[i + 9], 12, -1958414417); c = ff(c, d, a, b, x[i + 10], 17, -42063); b = ff(b, c, d, a, x[i + 11], 22, -1990404162);
    a = ff(a, b, c, d, x[i + 12], 7, 1804603682); d = ff(d, a, b, c, x[i + 13], 12, -40341101); c = ff(c, d, a, b, x[i + 14], 17, -1502002290); b = ff(b, c, d, a, x[i + 15], 22, 1236535329);
    a = gg(a, b, c, d, x[i + 1], 5, -165796510); d = gg(d, a, b, c, x[i + 6], 9, -1069501632); c = gg(c, d, a, b, x[i + 11], 14, 643717713); b = gg(b, c, d, a, x[i + 0], 20, -373897302);
    a = gg(a, b, c, d, x[i + 5], 5, -701558691); d = gg(d, a, b, c, x[i + 10], 9, 38016083); c = gg(c, d, a, b, x[i + 15], 14, -660478335); b = gg(b, c, d, a, x[i + 4], 20, -405537848);
    a = gg(a, b, c, d, x[i + 9], 5, 568446438); d = gg(d, a, b, c, x[i + 14], 9, -1019803690); c = gg(c, d, a, b, x[i + 3], 14, -187363961); b = gg(b, c, d, a, x[i + 8], 20, 1163531501);
    a = gg(a, b, c, d, x[i + 13], 5, -1444681467); d = gg(d, a, b, c, x[i + 2], 9, -51403784); c = gg(c, d, a, b, x[i + 7], 14, 1735328473); b = gg(b, c, d, a, x[i + 12], 20, -1926607734);
    a = hh(a, b, c, d, x[i + 5], 4, -378558); d = hh(d, a, b, c, x[i + 8], 11, -2022574463); c = hh(c, d, a, b, x[i + 11], 16, 1839030562); b = hh(b, c, d, a, x[i + 14], 23, -35309556);
    a = hh(a, b, c, d, x[i + 1], 4, -1530992060); d = hh(d, a, b, c, x[i + 4], 11, 1272893353); c = hh(c, d, a, b, x[i + 7], 16, -155497632); b = hh(b, c, d, a, x[i + 10], 23, -1094730640);
    a = hh(a, b, c, d, x[i + 13], 4, 681279174); d = hh(d, a, b, c, x[i + 0], 11, -358537222); c = hh(c, d, a, b, x[i + 3], 16, -722521979); b = hh(b, c, d, a, x[i + 6], 23, 76029189);
    a = hh(a, b, c, d, x[i + 9], 4, -640364487); d = hh(d, a, b, c, x[i + 12], 11, -421815835); c = hh(c, d, a, b, x[i + 15], 16, 530742520); b = hh(b, c, d, a, x[i + 2], 23, -995338651);
    a = ii(a, b, c, d, x[i + 0], 6, -198630844); d = ii(d, a, b, c, x[i + 7], 10, 1126891415); c = ii(c, d, a, b, x[i + 14], 15, -1416354905); b = ii(b, c, d, a, x[i + 5], 21, -57434055);
    a = ii(a, b, c, d, x[i + 12], 6, 1700485571); d = ii(d, a, b, c, x[i + 3], 10, -1894986606); c = ii(c, d, a, b, x[i + 10], 15, -1051523); b = ii(b, c, d, a, x[i + 1], 21, -2054922799);
    a = ii(a, b, c, d, x[i + 8], 6, 1873313359); d = ii(d, a, b, c, x[i + 15], 10, -30611744); c = ii(c, d, a, b, x[i + 6], 15, -1560198380); b = ii(b, c, d, a, x[i + 13], 21, 1309151649);
    a = ii(a, b, c, d, x[i + 4], 6, -145523070); d = ii(d, a, b, c, x[i + 11], 10, -1120210379); c = ii(c, d, a, b, x[i + 2], 15, 718787259); b = ii(b, c, d, a, x[i + 9], 21, -343485551);
    a = add(a, oa); b = add(b, ob); c = add(c, oc); d = add(d, od);
  }
  const out = new Uint8Array(16);
  [a, b, c, d].forEach((n, i) => {
    out[i * 4] = n & 0xff; out[i * 4 + 1] = (n >>> 8) & 0xff; out[i * 4 + 2] = (n >>> 16) & 0xff; out[i * 4 + 3] = (n >>> 24) & 0xff;
  });
  return out;
}
