// Vercel serverless function: POST /api/apply
// Emails each application via Resend. Set these in Vercel -> Project -> Settings -> Environment Variables:
//   RESEND_API_KEY   your Resend API key
//   APPLY_TO_EMAIL   where applications are delivered (e.g. info@1factor.com)
//   APPLY_FROM_EMAIL optional sender on a verified Resend domain (default: onboarding@resend.dev)
// Without RESEND_API_KEY it returns 503 and the page falls back to the visitor's email app.

const LIMITS = { company: 120, name: 80, email: 120, phone: 20, product: 80, amount: 20, currency: 3, turnover: 40, message: 600 };
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'method_not_allowed' });

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
  if (body.website) return res.status(200).json({ ok: true }); // honeypot: pretend success to bots

  const d = {};
  for (const [k, max] of Object.entries(LIMITS)) d[k] = String(body[k] ?? '').trim().slice(0, max);

  const bad =
    !d.company || !d.name || !d.product || !d.turnover ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email) ||
    !/^[0-9+()\-\s]{7,20}$/.test(d.phone) ||
    !(Number(d.amount) > 0) || !body.consent;
  if (bad) return res.status(400).json({ error: 'invalid' });

  const key = process.env.RESEND_API_KEY, to = process.env.APPLY_TO_EMAIL;
  if (!key || !to) return res.status(503).json({ error: 'not_configured' });

  const rows = [
    ['Company', d.company], ['Contact', d.name], ['Email', d.email], ['Phone', d.phone],
    ['Product', d.product], ['Limit', `${d.currency} ${d.amount}`], ['Turnover', d.turnover], ['Notes', d.message || '-'],
  ];
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.APPLY_FROM_EMAIL || 'onboarding@resend.dev',
      to: [to],
      reply_to: d.email,
      subject: `New finance limit application: ${d.company}`,
      html: `<table cellpadding="6">${rows.map(([k, v]) => `<tr><td><b>${k}</b></td><td>${esc(v)}</td></tr>`).join('')}</table>`,
    }),
  });
  if (!r.ok) return res.status(502).json({ error: 'send_failed' });
  return res.status(200).json({ ok: true });
}
