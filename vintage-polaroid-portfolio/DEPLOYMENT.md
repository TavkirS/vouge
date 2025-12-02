# Deployment Guide

This guide will help you deploy the Vintage Moments Photography portfolio website to various hosting platforms.

## 🚀 Quick Deployment Options

### Option 1: GitHub Pages (Free)

1. **Create GitHub Repository**
   ```bash
   # Create new repository on GitHub
   # Don't initialize with README since we already have one
   ```

2. **Upload Files**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/your-repo-name.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**
   - Go to repository Settings
   - Scroll to "Pages" section
   - Select "main" branch as source
   - Choose root directory
   - Save and wait for deployment

4. **Custom Domain (Optional)**
   - Add `CNAME` file with your domain
   - Configure DNS settings

### Option 2: Netlify (Free with Custom Domain)

1. **Connect Repository**
   - Sign up at [Netlify](https://netlify.com)
   - Connect your GitHub repository
   - Deploy automatically

2. **Configure Build Settings**
   ```
   Build command: echo 'Static site'
   Publish directory: /
   ```

3. **Custom Domain**
   - Go to Domain Management
   - Add your custom domain
   - Configure DNS records

### Option 3: Vercel (Free)

1. **Deploy from GitHub**
   ```bash
   # Install Vercel CLI
   npm i -g vercel

   # Deploy
   vercel
   ```

2. **Configure Project**
   - Project name: vintage-polaroid-portfolio
   - Directory: ./
   - Build command: (leave empty)
   - Output directory: ./

### Option 4: Traditional Hosting

1. **FTP Upload**
   ```bash
   # Using FileZilla or similar FTP client
   # Upload all files to public_html or www directory
   ```

2. **File Permissions**
   ```bash
   # Set correct permissions
   find . -type f -exec chmod 644 {} \;
   find . -type d -exec chmod 755 {} \;
   ```

## ⚙️ Pre-Deployment Checklist

### Content Check
- [ ] Update personal information in `data/config.json`
- [ ] Replace placeholder images with real photos
- [ ] Update contact information and WhatsApp number
- [ ] Customize color scheme if desired
- [ ] Add real portfolio images and descriptions

### Technical Check
- [ ] Test all pages in multiple browsers
- [ ] Verify mobile responsiveness
- [ ] Test contact form functionality
- [ ] Check for broken links
- [ ] Optimize all images
- [ ] Validate HTML and CSS

### Performance Check
- [ ] Enable gzip compression
- [ ] Set up browser caching
- [ ] Optimize images (WebP format recommended)
- [ ] Minify CSS and JavaScript (optional)
- [ ] Test loading speed

## 🔧 Server Configuration

### Apache (.htaccess)
```apache
# Enable compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/plain
  AddOutputFilterByType DEFLATE text/html
  AddOutputFilterByType DEFLATE text/xml
  AddOutputFilterByType DEFLATE text/css
  AddOutputFilterByType DEFLATE application/xml
  AddOutputFilterByType DEFLATE application/xhtml+xml
  AddOutputFilterByType DEFLATE application/rss+xml
  AddOutputFilterByType DEFLATE application/javascript
  AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Enable browser caching
<IfModule mod_expires.c>
  ExpiresActive on
  ExpiresByType image/jpg "access plus 1 month"
  ExpiresByType image/jpeg "access plus 1 month"
  ExpiresByType image/gif "access plus 1 month"
  ExpiresByType image/png "access plus 1 month"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/pdf "access plus 1 year"
  ExpiresByType text/javascript "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>

# Security headers
<IfModule mod_headers.c>
  Header always set X-Content-Type-Options nosniff
  Header always set X-Frame-Options DENY
  Header always set X-XSS-Protection "1; mode=block"
</IfModule>
```

### Nginx Configuration
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /path/to/your/website;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # Caching
    location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
        expires 1M;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
}
```

## 🔒 SSL Certificate (HTTPS)

### Let's Encrypt (Free)
```bash
# Install Certbot
sudo apt install certbot

# Get certificate
sudo certbot certonly --webroot -w /var/www/html -d yourdomain.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

### Cloudflare (Free)
1. Sign up at Cloudflare
2. Add your domain
3. Update nameservers
4. Enable SSL/TLS encryption

## 📊 Analytics Setup

### Google Analytics
1. Create GA4 property at [Google Analytics](https://analytics.google.com)
2. Get measurement ID (G-XXXXXXXXXX)
3. Update `data/config.json`:
   ```json
   {
     "analytics": {
       "googleAnalytics": {
         "enabled": true,
         "trackingId": "G-XXXXXXXXXX"
       }
     }
   }
   ```

### Search Console
1. Add property at [Google Search Console](https://search.google.com/search-console)
2. Verify ownership
3. Submit sitemap: `https://yourdomain.com/sitemap.xml`

## 🔍 SEO Optimization

### Sitemap Generation
Create `sitemap.xml` in root directory:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yourdomain.com/</loc>
    <lastmod>2024-12-02</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://yourdomain.com/pages/portfolio.html</loc>
    <lastmod>2024-12-02</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://yourdomain.com/pages/stories.html</loc>
    <lastmod>2024-12-02</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://yourdomain.com/pages/about.html</loc>
    <lastmod>2024-12-02</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://yourdomain.com/pages/contact.html</loc>
    <lastmod>2024-12-02</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
</urlset>
```

### Robots.txt
Create `robots.txt` in root directory:
```
User-agent: *
Allow: /

Sitemap: https://yourdomain.com/sitemap.xml
```

## 🧪 Testing Checklist

### Before Going Live
- [ ] All pages load without errors
- [ ] Contact form works correctly
- [ ] WhatsApp integration functions
- [ ] Images load properly
- [ ] Mobile responsiveness verified
- [ ] Cross-browser compatibility checked
- [ ] SSL certificate installed
- [ ] Domain DNS configured
- [ ] Analytics tracking set up

### Performance Testing
- [ ] Google PageSpeed Insights score > 90
- [ ] GTmetrix score > A grade
- [ ] WebPageTest results acceptable
- [ ] Core Web Vitals pass

### Security Testing
- [ ] SSL Labs test: A+ grade
- [ ] Security headers configured
- [ ] No mixed content warnings
- [ ] XSS protection enabled

## 🚨 Post-Deployment Monitoring

### Uptime Monitoring
- Use services like UptimeRobot or Pingdom
- Set up alerts for downtime
- Monitor response times

### Error Monitoring
```javascript
// Add to main.js for error tracking
window.addEventListener('error', function(e) {
    // Send error to monitoring service
    console.error('JavaScript Error:', e.error);
});
```

### Performance Monitoring
- Set up Core Web Vitals tracking
- Monitor Largest Contentful Paint (LCP)
- Track First Input Delay (FID)
- Monitor Cumulative Layout Shift (CLS)

## 🆘 Troubleshooting Deployment

### Common Issues

#### 404 Errors
- Check file paths in HTML
- Verify case sensitivity
- Ensure all files uploaded

#### HTTPS Mixed Content
- Change all HTTP links to HTTPS
- Update CDN URLs to HTTPS
- Check external resources

#### Contact Form Not Working
- Verify WhatsApp number format
- Check JavaScript console
- Test WhatsApp link manually

#### Slow Loading
- Optimize images
- Enable compression
- Use CDN for assets
- Minimize HTTP requests

### Getting Help
- Check browser developer tools
- Review server error logs
- Test on different devices
- Validate HTML/CSS with W3C validators

## 📞 Support

Need help with deployment?
- Check the main README.md for detailed instructions
- Review browser console for JavaScript errors
- Test contact form functionality
- Verify all file paths are correct

---

**Happy deploying! 🎉**

