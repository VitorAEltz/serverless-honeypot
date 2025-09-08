import { Hono } from "hono";

const app = new Hono();

const RESEND_API_KEY = process.env.RESEND_API_KEY!;
const EMAIL_TO = "vitor.eltz@azion.com";

// Utility function to send honeypot alerts
async function sendHoneypotAlert(accessInfo: {
  ip: string;
  userAgent: string;
  timestamp: string;
  path: string;
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

// Main route - Ecommerce Homepage
app.get("/", async (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>TechStore - Premium Electronics</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <script>
            tailwind.config = {
                theme: {
                    extend: {
                        colors: {
                            primary: '#3b82f6',
                            secondary: '#1e40af'
                        }
                    }
                }
            }
        </script>
    </head>
    <body class="bg-gray-50">
        <!-- Navigation -->
        <nav class="bg-white shadow-lg">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between h-16">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <h1 class="text-2xl font-bold text-primary">TechStore</h1>
                        </div>
                        <div class="hidden md:ml-6 md:flex md:space-x-8">
                            <a href="#" class="text-gray-900 hover:text-primary px-3 py-2 text-sm font-medium">Home</a>
                            <a href="#" class="text-gray-500 hover:text-primary px-3 py-2 text-sm font-medium">Products</a>
                            <a href="#" class="text-gray-500 hover:text-primary px-3 py-2 text-sm font-medium">About</a>
                            <a href="#" class="text-gray-500 hover:text-primary px-3 py-2 text-sm font-medium">Contact</a>
                        </div>
                    </div>
                    <div class="flex items-center">
                        <button class="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-secondary">
                            Cart (0)
                        </button>
                    </div>
                </div>
            </div>
        </nav>

        <!-- Hero Section -->
        <section class="bg-gradient-to-r from-primary to-secondary text-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <div class="text-center">
                    <h1 class="text-4xl md:text-6xl font-bold mb-6">
                        Premium Electronics
                    </h1>
                    <p class="text-xl md:text-2xl mb-8 text-blue-100">
                        Discover the latest in technology with our curated collection
                    </p>
                    <button class="bg-white text-primary px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors">
                        Shop Now
                    </button>
                </div>
            </div>
        </section>

        <!-- Featured Products -->
        <section class="py-16">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 class="text-3xl font-bold text-center text-gray-900 mb-12">Featured Products</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <!-- Product 1 -->
                    <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                        <img src="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&h=300&fit=crop" 
                             alt="MacBook Pro" class="w-full h-48 object-cover">
                        <div class="p-6">
                            <h3 class="text-xl font-semibold text-gray-900 mb-2">MacBook Pro 16"</h3>
                            <p class="text-gray-600 mb-4">Powerful laptop for professionals and creators</p>
                            <div class="flex justify-between items-center">
                                <span class="text-2xl font-bold text-primary">$2,499</span>
                                <button class="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary transition-colors">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Product 2 -->
                    <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                        <img src="https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&h=300&fit=crop" 
                             alt="iPhone 15" class="w-full h-48 object-cover">
                        <div class="p-6">
                            <h3 class="text-xl font-semibold text-gray-900 mb-2">iPhone 15 Pro</h3>
                            <p class="text-gray-600 mb-4">Latest iPhone with advanced camera system</p>
                            <div class="flex justify-between items-center">
                                <span class="text-2xl font-bold text-primary">$999</span>
                                <button class="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary transition-colors">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Product 3 -->
                    <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                        <img src="https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&h=300&fit=crop" 
                             alt="AirPods Pro" class="w-full h-48 object-cover">
                        <div class="p-6">
                            <h3 class="text-xl font-semibold text-gray-900 mb-2">AirPods Pro</h3>
                            <p class="text-gray-600 mb-4">Wireless earbuds with active noise cancellation</p>
                            <div class="flex justify-between items-center">
                                <span class="text-2xl font-bold text-primary">$249</span>
                                <button class="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary transition-colors">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Product 4 -->
                    <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                        <img src="https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop" 
                             alt="iPad Pro" class="w-full h-48 object-cover">
                        <div class="p-6">
                            <h3 class="text-xl font-semibold text-gray-900 mb-2">iPad Pro 12.9"</h3>
                            <p class="text-gray-600 mb-4">Professional tablet for work and creativity</p>
                            <div class="flex justify-between items-center">
                                <span class="text-2xl font-bold text-primary">$1,099</span>
                                <button class="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary transition-colors">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Product 5 -->
                    <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                        <img src="https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop" 
                             alt="Apple Watch" class="w-full h-48 object-cover">
                        <div class="p-6">
                            <h3 class="text-xl font-semibold text-gray-900 mb-2">Apple Watch Series 9</h3>
                            <p class="text-gray-600 mb-4">Advanced health and fitness tracking</p>
                            <div class="flex justify-between items-center">
                                <span class="text-2xl font-bold text-primary">$399</span>
                                <button class="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary transition-colors">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Product 6 -->
                    <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                        <img src="https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=400&h=300&fit=crop" 
                             alt="Gaming Setup" class="w-full h-48 object-cover">
                        <div class="p-6">
                            <h3 class="text-xl font-semibold text-gray-900 mb-2">Gaming Setup Bundle</h3>
                            <p class="text-gray-600 mb-4">Complete gaming setup with monitor and accessories</p>
                            <div class="flex justify-between items-center">
                                <span class="text-2xl font-bold text-primary">$1,799</span>
                                <button class="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary transition-colors">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Features Section -->
        <section class="bg-white py-16">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div class="text-center">
                        <div class="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                            </svg>
                        </div>
                        <h3 class="text-xl font-semibold text-gray-900 mb-2">Free Shipping</h3>
                        <p class="text-gray-600">Free shipping on orders over $100</p>
                    </div>
                    <div class="text-center">
                        <div class="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </div>
                        <h3 class="text-xl font-semibold text-gray-900 mb-2">Quality Guarantee</h3>
                        <p class="text-gray-600">30-day money-back guarantee</p>
                    </div>
                    <div class="text-center">
                        <div class="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z"></path>
                            </svg>
                        </div>
                        <h3 class="text-xl font-semibold text-gray-900 mb-2">24/7 Support</h3>
                        <p class="text-gray-600">Round-the-clock customer support</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Footer -->
        <footer class="bg-gray-900 text-white py-12">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 class="text-2xl font-bold mb-4">TechStore</h3>
                        <p class="text-gray-400">Your trusted source for premium electronics and technology products.</p>
                    </div>
                    <div>
                        <h4 class="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul class="space-y-2">
                            <li><a href="#" class="text-gray-400 hover:text-white">About Us</a></li>
                            <li><a href="#" class="text-gray-400 hover:text-white">Contact</a></li>
                            <li><a href="#" class="text-gray-400 hover:text-white">Support</a></li>
                            <li><a href="#" class="text-gray-400 hover:text-white">Returns</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="text-lg font-semibold mb-4">Categories</h4>
                        <ul class="space-y-2">
                            <li><a href="#" class="text-gray-400 hover:text-white">Laptops</a></li>
                            <li><a href="#" class="text-gray-400 hover:text-white">Phones</a></li>
                            <li><a href="#" class="text-gray-400 hover:text-white">Accessories</a></li>
                            <li><a href="#" class="text-gray-400 hover:text-white">Gaming</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="text-lg font-semibold mb-4">Connect</h4>
                        <div class="flex space-x-4">
                            <a href="#" class="text-gray-400 hover:text-white">
                                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                                </svg>
                            </a>
                            <a href="#" class="text-gray-400 hover:text-white">
                                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                                </svg>
                            </a>
                            <a href="#" class="text-gray-400 hover:text-white">
                                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="border-t border-gray-800 mt-8 pt-8 text-center">
                    <p class="text-gray-400">&copy; 2024 TechStore. All rights reserved.</p>
                </div>
            </div>
        </footer>

        <script>
            // Simple cart functionality
            let cartCount = 0;
            
            document.querySelectorAll('button').forEach(button => {
                if (button.textContent.includes('Add to Cart')) {
                    button.addEventListener('click', function() {
                        cartCount++;
                        document.querySelector('button:contains("Cart")').textContent = \`Cart (\${cartCount})\`;
                        
                        // Add visual feedback
                        this.textContent = 'Added!';
                        this.classList.add('bg-green-500');
                        setTimeout(() => {
                            this.textContent = 'Add to Cart';
                            this.classList.remove('bg-green-500');
                        }, 1000);
                    });
                }
            });
        </script>
    </body>
    </html>
  `);
});

// Honeypot route - fake admin panel
app.get("/admin/secret", async (c) => {
  const ip = c.req.header("x-forwarded-for") || c.req.header("x-real-ip") || "unknown";
  const userAgent = c.req.header("user-agent") || "unknown";
  const timestamp = new Date().toISOString();

  // Log the access attempt
  console.log(`🚨 HONEYPOT ACCESS: ${ip} accessed /admin/secret at ${timestamp}`);
  console.log(`User Agent: ${userAgent}`);

  // Send alert email
  await sendHoneypotAlert({
    ip,
    userAgent,
    timestamp,
    path: "/admin/secret"
  });

  // Return fake admin panel
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Admin Panel - Maintenance</title>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                margin: 0;
                padding: 0;
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .container {
                background: white;
                padding: 40px;
                border-radius: 15px;
                box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                text-align: center;
                max-width: 500px;
                width: 90%;
            }
            .icon {
                font-size: 4rem;
                margin-bottom: 20px;
            }
            h1 {
                color: #333;
                margin-bottom: 20px;
                font-size: 2rem;
            }
            .message {
                color: #666;
                font-size: 1.1rem;
                line-height: 1.6;
                margin-bottom: 30px;
            }
            .status {
                background: #fff3cd;
                border: 1px solid #ffeaa7;
                color: #856404;
                padding: 15px;
                border-radius: 8px;
                font-weight: 500;
            }
            .footer {
                margin-top: 30px;
                color: #999;
                font-size: 0.9rem;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="icon">🔧</div>
            <h1>Admin Panel</h1>
            <div class="message">
                Admin panel maintenance in progress.
            </div>
            <div class="status">
                System temporarily unavailable for scheduled maintenance.
            </div>
            <div class="footer">
                Please check back later or contact your system administrator.
            </div>
        </div>
    </body>
    </html>
  `);
});

// Additional honeypot routes for common attack vectors
app.get("/admin", async (c) => {
  const ip = c.req.header("x-forwarded-for") || c.req.header("x-real-ip") || "179.152.200.1";
  const userAgent = c.req.header("user-agent") || "unknown";
  const timestamp = new Date().toISOString();

  console.log(`🚨 HONEYPOT ACCESS: ${ip} accessed /admin at ${timestamp}`);
  
  await sendHoneypotAlert({
    ip,
    userAgent,
    timestamp,
    path: "/admin"
  });

  return c.redirect("/admin/secret");
});

app.get("/wp-admin", async (c) => {
  const ip = c.req.header("x-forwarded-for") || c.req.header("x-real-ip") || "179.152.200.1";
  const userAgent = c.req.header("user-agent") || "unknown";
  const timestamp = new Date().toISOString();

  console.log(`🚨 HONEYPOT ACCESS: ${ip} accessed /wp-admin at ${timestamp}`);
  
  await sendHoneypotAlert({
    ip,
    userAgent,
    timestamp,
    path: "/wp-admin"
  });

  return c.redirect("/admin/secret");
});

app.get("/.env", async (c) => {
  const ip = c.req.header("x-forwarded-for") || c.req.header("x-real-ip") || "179.152.200.1";
  const userAgent = c.req.header("user-agent") || "unknown";
  const timestamp = new Date().toISOString();

  console.log(`🚨 HONEYPOT ACCESS: ${ip} accessed /.env at ${timestamp}`);
  
  await sendHoneypotAlert({
    ip,
    userAgent,
    timestamp,
    path: "/.env"
  });

  return c.text("Environment variables not accessible", 403);
});

export default app;