# Vintage Moments Photography Portfolio

A professional vintage-modern hybrid photographer portfolio website featuring a "Vintage B&W Polaroid Wall Theme" with black & white retro aesthetic, polaroid frames scattered on a wall, and smooth animations.

![Vintage Moments](assets/images/og-image.jpg)

## 🎨 Features

- **Vintage Polaroid Theme**: Black & white retro aesthetic with polaroid frames
- **Responsive Design**: Mobile-first approach with Bootstrap 5
- **Smooth Animations**: Fade-in effects, typewriter text, floating polaroids
- **Portfolio Gallery**: Filterable polaroid wall layout with lightbox
- **Blog System**: Stories with typewriter effects and pagination
- **Contact Integration**: WhatsApp API form submission
- **Performance Optimized**: Lazy loading, intersection observer, optimized animations
- **Accessibility**: Reduced motion support, ARIA labels, keyboard navigation

## 🚀 Quick Start

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional but recommended)
- Text editor or IDE

### Installation

1. **Clone or Download**
   ```bash
   # Download the project files to your local machine
   # Extract to your web server's document root or use as static files
   ```

2. **File Structure**
   ```
   vintage-polaroid-portfolio/
   ├── index.html                 # Home page
   ├── pages/                     # Sub-pages
   │   ├── portfolio.html
   │   ├── stories.html
   │   ├── about.html
   │   └── contact.html
   ├── assets/
   │   ├── css/
   │   │   └── style.css         # Main stylesheet
   │   ├── js/
   │   │   ├── main.js           # Core functionality
   │   │   ├── animations.js     # Animation effects
   │   │   ├── portfolio.js      # Portfolio features
   │   │   ├── stories.js        # Stories/blog features
   │   │   └── contact.js        # Contact form & WhatsApp
   │   └── images/
   │       ├── polaroids/        # Portfolio images
   │       ├── textures/         # Background textures
   │       └── icons/            # UI icons
   └── data/
       ├── portfolio.json        # Portfolio data
       ├── stories.json          # Blog stories data
       ├── about.json            # About page data
       └── config.json           # Site configuration
   ```

3. **Run Locally**
   ```bash
   # Using Python (if installed)
   cd vintage-polaroid-portfolio
   python -m http.server 8000

   # Using Node.js (if installed)
   npx serve .

   # Or simply open index.html in your browser
   ```

4. **View the Website**
   - Open `index.html` in your web browser
   - Navigate through the different sections

## 📁 File Structure Explanation

### HTML Files
- `index.html` - Home page with hero section and floating polaroids
- `pages/portfolio.html` - Portfolio gallery with filtering
- `pages/stories.html` - Blog/stories with typewriter effects
- `pages/about.html` - About page with timeline and awards
- `pages/contact.html` - Contact form with WhatsApp integration

### CSS & Styling
- `assets/css/style.css` - Complete stylesheet with vintage theme

### JavaScript Modules
- `assets/js/main.js` - Core functionality (lazy loading, navigation, etc.)
- `assets/js/animations.js` - Animation effects and typewriter
- `assets/js/portfolio.js` - Portfolio filtering and lightbox
- `assets/js/stories.js` - Stories pagination and modal
- `assets/js/contact.js` - Contact form validation and WhatsApp

### Data Files
- `data/portfolio.json` - Portfolio images and metadata
- `data/stories.json` - Blog posts and content
- `data/about.json` - About page information
- `data/config.json` - Site configuration and settings

## 🎯 Customization Guide

### 1. Personal Information

Edit `data/config.json` to update:
```json
{
  "site": {
    "name": "Your Name Photography",
    "tagline": "Your Tagline",
    "description": "Your description"
  },
  "contact": {
    "email": "your.email@example.com",
    "phone": "+91 YOUR_NUMBER",
    "whatsapp": "+91 YOUR_WHATSAPP"
  }
}
```

### 2. Portfolio Content

Update `data/portfolio.json`:
```json
{
  "portfolio": [
    {
      "id": 1,
      "title": "Your Photo Title",
      "category": "weddings",
      "image": "assets/images/polaroids/your-photo.jpg",
      "description": "Photo description",
      "date": "2024-12-01",
      "location": "Location"
    }
  ]
}
```

### 3. Stories/Blog Content

Edit `data/stories.json`:
```json
{
  "stories": [
    {
      "id": 1,
      "title": "Your Story Title",
      "content": "Your story content...",
      "image": "assets/images/polaroids/story-image.jpg",
      "date": "2024-12-15",
      "category": "Photography Tips"
    }
  ]
}
```

### 4. About Page Content

Modify `data/about.json`:
```json
{
  "profile": {
    "name": "Your Name",
    "bio": "Your biography...",
    "specialties": ["Your specialties"]
  },
  "timeline": [
    {
      "year": "2024",
      "title": "Your Achievement",
      "description": "Description..."
    }
  ]
}
```

### 5. Styling Customization

Edit `assets/css/style.css`:

#### Change Colors
```css
:root {
  --primary-black: #your-color;
  --off-white: #your-color;
}
```

#### Modify Fonts
```css
@import url('https://fonts.googleapis.com/css2?family=Your+Font&display=swap');

body {
  font-family: 'Your Font', serif;
}
```

#### Adjust Animations
```css
.polaroid-frame {
  animation-duration: 15s; /* Slower/faster floating */
}
```

### 6. WhatsApp Integration

Update the phone number in multiple places:

1. `data/config.json` - Contact information
2. `pages/contact.html` - Form initialization
3. `assets/js/contact.js` - WhatsApp integration

```javascript
// In contact.js
const whatsappNumber = '+91 YOUR_NUMBER';
```

## 🖼️ Adding Images

### Portfolio Images
1. Place images in `assets/images/polaroids/`
2. Create thumbnails in `assets/images/polaroids/thumbnails/`
3. Update `data/portfolio.json` with image paths

### Other Images
- **Profile photo**: `assets/images/polaroids/profile.jpg`
- **Story images**: `assets/images/polaroids/story-*.jpg`
- **Textures**: `assets/images/textures/`
- **Icons**: `assets/images/icons/`

### Image Optimization Tips
- Use WebP format for better performance
- Compress images (target 100-200KB per image)
- Use appropriate dimensions (1200px width for portfolio images)
- Add alt text for accessibility

## 📱 Mobile Optimization

The site is built mobile-first with:
- Responsive grid layouts
- Touch-friendly buttons (44px minimum)
- Optimized typography scaling
- Mobile navigation menu
- Reduced motion for performance

### Testing Mobile
- Use browser dev tools device emulation
- Test on actual mobile devices
- Check touch interactions and scrolling

## ⚡ Performance Features

### Built-in Optimizations
- **Lazy Loading**: Images load as they enter viewport
- **Intersection Observer**: Efficient scroll-based animations
- **Optimized CSS**: Minimal repaints and reflows
- **Preloading**: Critical resources load first
- **Caching**: Browser caching headers

### Performance Monitoring
```javascript
// Check performance in browser console
console.log(performance.getEntriesByType('navigation')[0]);
```

## ♿ Accessibility

### Features Included
- ARIA labels and descriptions
- Keyboard navigation support
- Reduced motion for users with vestibular disorders
- High contrast text ratios
- Screen reader friendly

### Testing Accessibility
- Use WAVE Web Accessibility Evaluation Tool
- Test with keyboard-only navigation
- Check color contrast ratios
- Validate with axe DevTools

## 🔧 Maintenance

### Regular Updates

#### Content Updates
1. Update portfolio images monthly
2. Add new blog posts weekly
3. Refresh testimonials quarterly
4. Update awards and exhibitions

#### Technical Maintenance
1. Test across browsers quarterly
2. Update dependencies annually
3. Monitor performance metrics
4. Backup data regularly

### Backup Strategy
```bash
# Create backups of important files
cp -r vintage-polaroid-portfolio vintage-polaroid-portfolio-backup-$(date +%Y%m%d)
```

### Monitoring
- Use Google Analytics for traffic insights
- Monitor Core Web Vitals
- Check for broken links
- Test contact form functionality

## 🐛 Troubleshooting

### Common Issues

#### Images Not Loading
- Check file paths in JSON data
- Verify image files exist
- Check browser console for 404 errors

#### Animations Not Working
- Check for `prefers-reduced-motion` setting
- Verify CSS animations are enabled
- Test in different browsers

#### Contact Form Not Submitting
- Verify WhatsApp number format
- Check JavaScript console for errors
- Test WhatsApp link manually

#### Mobile Layout Issues
- Clear browser cache
- Check viewport meta tag
- Test CSS media queries

### Debug Mode
Enable debug logging:
```javascript
// Add to browser console
localStorage.setItem('debug', 'true');
location.reload();
```

## 🚀 Deployment

### Web Hosting
1. Upload all files to your web host
2. Ensure correct file permissions (644 for files, 755 for directories)
3. Configure server for gzip compression
4. Set up SSL certificate (HTTPS)

### CDN Integration (Optional)
```html
<!-- Add to <head> for CDN images -->
<link rel="preconnect" href="https://your-cdn.com">
```

### SEO Optimization
1. Update meta tags in `config.json`
2. Submit sitemap to Google Search Console
3. Add structured data markup
4. Optimize images with alt text

## 📈 Analytics & Tracking

### Google Analytics Setup
1. Add your GA tracking ID to `data/config.json`
2. Enable analytics in the configuration
3. Set up goals for contact form submissions

### Event Tracking
The site automatically tracks:
- Page views
- Portfolio image views
- Contact form submissions
- WhatsApp link clicks
- Story article reads

## 🤝 Contributing

### Development Setup
```bash
# Clone repository
git clone https://github.com/yourusername/vintage-polaroid-portfolio.git

# Install development dependencies (if any)
npm install

# Start development server
npm run dev
```

### Code Style
- Use consistent indentation (2 spaces)
- Add comments for complex functions
- Follow BEM CSS methodology
- Validate HTML and CSS

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Credits

- **Fonts**: Google Fonts (Cinzel, Playfair Display, Dancing Script)
- **Icons**: Custom SVG icons
- **Framework**: Bootstrap 5
- **Animations**: Custom CSS and JavaScript

## 📞 Support

For support and questions:
- Email: hello@vintagemoments.com
- Documentation: This README.md
- Issues: GitHub Issues (if applicable)

---

**Built with ❤️ for photographers who value timeless moments**

