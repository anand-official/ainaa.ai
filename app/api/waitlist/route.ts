import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const email: string | undefined = body?.email

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: 'Invalid email address.' }, { status: 400 })
  }

  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    // No DB configured — still return success for development
    return Response.json({
      success: true,
      position: Math.floor(Math.random() * 400) + 100,
    })
  }

  const supabase = createClient(supabaseUrl, supabaseKey)

  const { data, error } = await supabase
    .from('waitlist')
    .insert([{ email, created_at: new Date().toISOString() }])
    .select('id')
    .single()

  if (error) {
    if (error.code === '23505') {
      return Response.json({ error: 'Already on the list.' }, { status: 409 })
    }
    console.error('Supabase error:', error)
    return Response.json({ error: 'Failed to join. Please try again.' }, { status: 500 })
  }

  // Send confirmation email if Resend is configured
  const resendKey = process.env.RESEND_API_KEY
  if (resendKey) {
    const resend = new Resend(resendKey)
    await resend.emails.send({
      from: 'ainaa.ai <hello@ainaa.ai>',
      to: email,
      subject: "You're on the waitlist — ainaa.ai ✦",
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>You're on the ainaa.ai waitlist</title>
</head>
<body style="margin:0;padding:0;background:#080808;font-family:'DM Sans',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#080808;padding:60px 20px;">
    <tr>
      <td align="center">
        <table width="520" cellpadding="0" cellspacing="0" style="background:#0F0F0F;border-radius:20px;border:1px solid rgba(255,255,255,0.06);padding:48px 40px;">
          <tr>
            <td>
              <p style="font-family:Georgia,serif;font-size:28px;font-weight:300;color:#F2EDE6;letter-spacing:-0.02em;margin:0 0 4px;">ainaa<span style="font-size:14px;color:#C9A97A;font-family:monospace;">.ai</span></p>
              <p style="font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:#54514E;margin:0 0 40px;">Personal Outfit Operating System</p>

              <p style="font-family:Georgia,serif;font-size:36px;font-weight:300;line-height:1.1;color:#F2EDE6;letter-spacing:-0.02em;margin:0 0 20px;">
                You&apos;re <em style="color:#C9A97A;font-style:italic;">in.</em>
              </p>
              <p style="font-size:14px;line-height:1.7;color:#8C8680;margin:0 0 32px;">
                You&apos;re on the waitlist for ainaa.ai. We&apos;re building carefully — one layer at a time.
                When beta opens, you&apos;ll be among the first to know.
              </p>

              <div style="border-top:1px solid rgba(255,255,255,0.06);padding-top:24px;margin-top:8px;">
                <p style="font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#54514E;font-family:monospace;margin:0;">
                  Position #${data.id} · Early Access
                </p>
              </div>
            </td>
          </tr>
        </table>
        <p style="font-size:10px;color:#54514E;margin-top:24px;letter-spacing:0.05em;">
          © ${new Date().getFullYear()} ainaa.ai · You&apos;re receiving this because you signed up at ainaa.ai
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`,
    })
  }

  return Response.json({ success: true, position: data.id })
}
