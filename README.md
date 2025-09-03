# Serverless Honeypot / Canary Token

A programmable honeypot system built with Azion Edge Functions that detects and alerts on suspicious access attempts. This project includes a fake admin panel that triggers email alerts via Resend when accessed.

## Features

- 🍯 **Honeypot Route**: Fake admin panel at `/admin/secret` that appears legitimate
- 📧 **Email Alerts**: Automatic email notifications via Resend when honeypot is accessed
- 🔍 **Client Tracking**: Captures IP address, User-Agent, and other request details
- 🎨 **Realistic UI**: Professional-looking maintenance page to avoid suspicion
- ⚡ **Edge Deployed**: Runs on Azion Edge Functions for global distribution

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 2. Configure Environment Variables

Set up the following environment variables in your Azion Edge Function:

```bash
# Required: Your Resend API key
RESEND_API_KEY=your_resend_api_key_here

# Required: Email address to receive alerts
ALERT_EMAIL=your-email@example.com

# Optional: Custom sender email (must be verified in Resend)
ALERT_FROM_EMAIL=security@yourdomain.com
```

### 3. Get Resend API Key

1. Sign up at [resend.com](https://resend.com)
2. Create an API key in your dashboard
3. Add the API key to your environment variables

### 4. Build and Deploy

_Build Command_:
```bash
npx edge-functions@latest build
```

_Run locally for testing_:
```bash
npx edge-functions@latest dev
```

## Usage

Once deployed, the honeypot will be available at:
- **Honeypot URL**: `https://your-domain.com/admin/secret`

When someone accesses this URL, they'll see a realistic "Admin panel maintenance in progress" page, and you'll receive an email alert with details about the access attempt.

## Alert Information

The email alerts include:
- Timestamp of access
- IP address of the visitor
- User-Agent string
- Requested path and method
- Referer header (if available)
- Additional request headers

## Security Considerations

- The honeypot appears as a legitimate admin panel
- No actual sensitive information is exposed
- Alerts are sent asynchronously to avoid blocking the response
- IP addresses are captured from various headers for accuracy

## Customization

You can customize the honeypot by:
- Modifying the fake admin panel HTML in `src/lib/html/admin-panel.ts`
- Adding more honeypot routes in `src/lib/page-router.ts`
- Customizing the alert email template in `src/lib/alert-service.ts`
- Adjusting configuration settings in `src/lib/config.ts`
