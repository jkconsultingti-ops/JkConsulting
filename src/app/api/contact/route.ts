import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, company, email, phone, challenge, preferred_contact } = body;

  if (!name || !company || !email || !challenge) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const CONTACT_EMAIL = process.env.CONTACT_EMAIL || "gustavogcavalli7@gmail.com";

  if (!RESEND_API_KEY) {
    console.error("RESEND_API_KEY not configured");
    return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
  }

  const html = `
    <h2>Novo contato via JK Consulting</h2>
    <table style="border-collapse:collapse;width:100%">
      <tr><td style="padding:8px;font-weight:bold">Nome</td><td style="padding:8px">${name}</td></tr>
      <tr><td style="padding:8px;font-weight:bold">Empresa</td><td style="padding:8px">${company}</td></tr>
      <tr><td style="padding:8px;font-weight:bold">E-mail</td><td style="padding:8px">${email}</td></tr>
      <tr><td style="padding:8px;font-weight:bold">Telefone</td><td style="padding:8px">${phone || "—"}</td></tr>
      <tr><td style="padding:8px;font-weight:bold">Contato preferido</td><td style="padding:8px">${preferred_contact}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;vertical-align:top">Desafio</td><td style="padding:8px">${challenge}</td></tr>
    </table>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "JK Consulting <noreply@jkconsulting.com.br>",
      to: [CONTACT_EMAIL],
      subject: `Novo contato: ${name} — ${company}`,
      html,
      reply_to: email,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("Resend error:", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
