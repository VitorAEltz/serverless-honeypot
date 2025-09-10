import { Hono } from "hono";
import { sendHoneypotAlert } from "./utils/alerts";
import { templates } from "./utils/templates";
import { generateToken, decodeJwt, validateLogin } from "./utils/jwt";
import { generateResponse, unauthorized, badRequest } from "./utils/responses";
import { checkAndUpdateNetworkList } from "./utils/networkList";

const app = new Hono();

// Main route - Ecommerce Homepage
app.get("/", async (c) => {
  const homepageTemplate = await templates.homepage();
  return c.html(homepageTemplate);
});

// Authentication Routes
app.get("/login", async (c) => {
  const loginTemplate = await templates.login();
  return c.html(loginTemplate);
});

app.get("/dashboard", async (c) => {
  const dashboardTemplate = await templates.dashboard();
  return c.html(dashboardTemplate);
});

app.post("/auth/login", async (c) => {
  try {
    const body = await c.req.json();
    const { user, password } = body;

    if (!user || !password) {
      return c.json({ error: "Email and password are required" }, 400);
    }

    const isValid = await validateLogin(user, password);
    if (isValid) {
      const token = await generateToken();
      return c.json({ token });
    } else {
      return c.json({ error: "Invalid credentials" }, 401);
    }
  } catch (error) {
    console.error("Login error:", error);
    return c.json({ error: "Invalid request format" }, 400);
  }
});

app.get("/auth/protected", async (c) => {
  try {
    const authHeader = c.req.header("Authorization") || "";
    const token = authHeader.split("Bearer ")[1];

    if (!token) {
      return c.json({ error: "No token provided" }, 401);
    }

    const jwt = await decodeJwt(token);
    
    const data = {
      jwt,
      message: "Protected route accessed successfully.",
      timestamp: new Date().toISOString(),
    };

    return c.json(data);
  } catch (error: any) {
    console.error("Protected route error:", error);
    return c.json({ error: `Authentication failed: ${error.message}` }, 401);
  }
});

// Honeypot route - fake admin panel
app.get("/admin/secret", async (c) => {
// @ts-ignore
  const ip = c.req?.raw?.metadata?.["remote_addr"] || "172.168.200.1";
// @ts-ignore
  const countryName = c.req?.raw?.metadata?.["geoip_city_country_name"] || "unknown";
// @ts-ignore
  const regionName = c.req?.raw?.metadata?.["geoip_region_name"] || "unknown";

  console.log("Country Name: " + countryName);

  const userAgent = c.req.header("user-agent") || "unknown";
  const timestamp = new Date().toISOString();

  // Log the access attempt
  console.log(`🚨 HONEYPOT ACCESS: ${ip} accessed /admin/secret at ${timestamp}`);
  console.log(`User Agent: ${userAgent}`);

  // Check and update network list with the IP
  if (ip !== "unknown") {
    await checkAndUpdateNetworkList(ip);
  }

  // Send alert email
  await sendHoneypotAlert({
    ip,
    userAgent,
    timestamp,
    countryName,
    regionName,
    path: "/admin/secret"
  });

  // Return fake admin panel
  const adminPanelTemplate = await templates.adminPanel();
  return c.html(adminPanelTemplate);
});

// Additional honeypot routes for common attack vectors
app.get("/admin", async (c) => {
// @ts-ignore
  const ip = c.req?.raw?.metadata?.["remote_addr"] || "unknown";
  const userAgent = c.req.header("user-agent") || "unknown";
  const timestamp = new Date().toISOString();
// @ts-ignore
  const countryName = c.req?.raw?.metadata?.["geoip_city_country_name"] || "unknown";
// @ts-ignore
  const regionName = c.req?.raw?.metadata?.["geoip_region_name"] || "unknown";

  console.log(`🚨 HONEYPOT ACCESS: ${ip} accessed /admin at ${timestamp}`);
  
  // Check and update network list with the IP
  if (ip !== "unknown") {
    await checkAndUpdateNetworkList(ip);
  }
  
  await sendHoneypotAlert({
    ip,
    userAgent,
    timestamp,
    countryName,
    regionName,
    path: "/admin"
  });

  return c.redirect("/admin/secret");
});

app.get("/wp-admin", async (c) => {
// @ts-ignore
  const ip = c.req?.raw?.metadata?.["remote_addr"] || c.req.header("x-forwarded-for") || c.req.header("x-real-ip") || "179.152.200.1";
  const userAgent = c.req.header("user-agent") || "unknown";
  const timestamp = new Date().toISOString();
// @ts-ignore
  const countryName = c.req?.raw?.metadata?.["geoip_city_country_name"] || "unknown";
// @ts-ignore
  const regionName = c.req?.raw?.metadata?.["geoip_region_name"] || "unknown";

  console.log(`🚨 HONEYPOT ACCESS: ${ip} accessed /wp-admin at ${timestamp}`);
  
  // Check and update network list with the IP
  if (ip !== "unknown") {
    await checkAndUpdateNetworkList(ip);
  }
  
  await sendHoneypotAlert({
    ip,
    userAgent,
    timestamp,
    countryName,
    regionName,
    path: "/wp-admin"
  });

  return c.redirect("/admin/secret");
});

app.get("/.env", async (c) => {
// @ts-ignore
  const ip = c.req?.raw?.metadata?.["remote_addr"] || "172.168.200.1";
  const userAgent = c.req.header("user-agent") || "unknown";
  const timestamp = new Date().toISOString();
// @ts-ignore
  const countryName = c.req.raw?.metadata?.["geoip_city_country_name"] || "unknown";
// @ts-ignore
  const regionName = c.req.raw?.metadata?.["geoip_region_name"] || "unknown";

  console.log(`🚨 HONEYPOT ACCESS: ${ip} accessed /.env at ${timestamp}`);
  
  // Check and update network list with the IP
  if (ip !== "unknown") {
    await checkAndUpdateNetworkList(ip);
  }
  
  await sendHoneypotAlert({
    ip,
    userAgent,
    timestamp,
    countryName,
    regionName,
    path: "/.env"
  });

  return c.text("Environment variables not accessible", 403);
});

export default app;