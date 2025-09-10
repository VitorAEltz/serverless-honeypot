const RESEND_API_KEY = process.env.RESEND_API_KEY!;
const EMAIL_TO = "vitor.eltz@azion.com";

// Utility function to send honeypot alerts
export async function sendHoneypotAlert(accessInfo: {
  ip: string;
  userAgent: string;
  timestamp: string;
  path: string;
  countryName: string;
  regionName: string;
}) {
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "onboarding@resend.dev",
        to: EMAIL_TO,
        subject: "🚨 HONEYPOT TRIGGERED - Potential Security Breach",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #dc2626;">🚨 Honeypot Access Detected</h2>
            <p><strong>Alert:</strong> Someone accessed a honeypot endpoint!</p>
            
            <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0;">Access Details:</h3>
              <p><strong>Path:</strong> ${accessInfo.path}</p>
              <p><strong>IP Address:</strong> ${accessInfo.ip}</p>
              <p><strong>User Agent:</strong> ${accessInfo.userAgent}</p>
              <p><strong>Timestamp:</strong> ${accessInfo.timestamp}</p>
              <p><strong>Country:</strong> ${accessInfo.countryName}</p>
              <p><strong>Region:</strong> ${accessInfo.regionName}</p>
            </div>
            
            <p style="color: #6b7280; font-size: 14px;">
              This is an automated security alert from your honeypot system.
            </p>
          </div>
        `,
      }),
    });

    const data = await res.json();
    console.log("Honeypot alert sent:", data);
    return data;
  } catch (error) {
    console.error("Failed to send honeypot alert:", error);
    return null;
  }
}
