# NeoMarket - Gaming Hardware Marketplace

A complete dark futuristic e-commerce platform built with **pure HTML, CSS, and vanilla JavaScript** - no frameworks or libraries.

## Project Overview

NeoMarket is a fully functional gaming hardware marketplace featuring a Neo-Shadow dark theme with electric teal accents, glass-morphism effects, and smooth animations. The platform includes comprehensive shopping functionality, user authentication, admin panel, and vendor dashboard.

## Features

### Core Functionality
- ✅ **Product Browsing** - Full-featured product catalog with filtering and search
- ✅ **Shopping Cart** - Add, update, remove items with persistent storage
- ✅ **Checkout Flow** - Multi-step checkout with shipping and payment
- ✅ **Wishlist** - Save favorite products for later
- ✅ **User Authentication** - Login/Register with role-based access
- ✅ **Admin Panel** - Complete product and user management
- ✅ **Vendor Dashboard** - Seller interface for managing listings

### Technical Features
- Pure HTML5, CSS3, and vanilla JavaScript (ES6+)
- Fully responsive design (mobile, tablet, desktop)
- LocalStorage for cart and wishlist persistence
- SessionStorage for user authentication
- Accessible (WCAG 2.1 compliant)
- No frameworks or build tools required

## Design System

### Neo-Shadow Theme
- **Background**: `#0a0b0f` (deep dark)
- **Surface**: Glass-morphism with backdrop blur
- **Primary Accent**: `#00e6c3` (electric teal)
- **Secondary Accent**: `#ff2d95` (neon magenta)
- **Success**: `#2dd36f`
- **Warning**: `#ffb86b`

### Typography
- **Headings**: Orbitron (techno/condensed)
- **Body**: Inter (clean, readable)
- **Monospace**: JetBrains Mono (specs/code)

## File Structure

```
public/
├── html/                   # All HTML pages
│   ├── index.html             # Homepage
│   ├── products.html          # Product browsing with filters
│   ├── product-detail.html    # Individual product page
│   ├── search.html            # Search results
│   ├── cart.html              # Shopping cart
│   ├── checkout.html          # Multi-step checkout
│   ├── wishlist.html          # Saved products
│   ├── login.html             # User login
│   ├── register.html          # User registration
│   ├── admin.html             # Admin panel
│   └── vendor-dashboard.html  # Seller dashboard
├── css/                    # All stylesheets
│   ├── reset.css              # CSS normalization
│   ├── variables.css          # Design tokens
│   ├── global.css             # Base styles
│   ├── components.css         # Reusable components
│   ├── layout.css             # Layout & navigation
│   └── responsive.css         # Media queries
├── js/                     # All JavaScript files
│   ├── config.js              # Mock data & constants
│   ├── utils.js               # Helper functions
│   ├── toasts.js              # Notification system
│   ├── modals.js              # Modal management
│   ├── auth.js                # Authentication logic
│   ├── cart.js                # Cart management
│   ├── wishlist.js            # Wishlist functionality
│   ├── products.js            # Product filtering & display
│   ├── admin.js               # Admin utilities
│   └── main.js                # App initialization
└── pic/                    # Product images
    ├── nvidia-rtx-4090-graphics-card.jpg
    ├── amd-rx-7900-xtx-graphics-card.jpg
    └── ...
```

## Demo Credentials

### Buyer Account
- Email: `buyer@test.com`
- Password: `password123`

### Seller Account
- Email: `seller@test.com`
- Password: `password123`

### Admin Account
- Email: `admin@test.com`
- Password: `admin123`

## Setup Instructions

1. **No build process required!** Simply open `public/html/index.html` in a modern web browser.

2. **For local development**, use a local server (navigate to public folder first):
   ```bash
   # Python 3
   cd public
   python -m http.server 8000
   
   # Node.js (http-server)
   cd public
   npx http-server -p 8000
   
   # PHP
   cd public
   php -S localhost:8000
   ```

3. Navigate to `http://localhost:8000/html/index.html` in your browser.

## Browser Compatibility

Tested and working on:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Android 90+)

## Key Features Showcase

### Shopping Flow
1. Browse products by category or search
2. Apply filters (brand, price range, condition)
3. View detailed product information
4. Add items to cart or wishlist
5. Complete checkout with shipping and payment
6. Receive order confirmation

### Admin Features
- Dashboard with statistics
- Add/Edit/Delete products
- Manage users
- View all orders
- Product inventory management

### Seller Features
- Personal dashboard with metrics
- Manage product listings
- Track sales and revenue
- Performance analytics
- Seller tips and guidelines

## Data Persistence

- **Cart**: Stored in `localStorage` (persists across sessions)
- **Wishlist**: Stored in `localStorage`
- **User Session**: Stored in `sessionStorage` (clears on tab close)
- **Products**: Initially loaded from config, stored in `localStorage` for admin edits

## Accessibility Features

- Semantic HTML5 elements
- ARIA labels and attributes
- Keyboard navigation support
- Focus indicators
- Screen reader friendly
- High contrast color scheme (4.5:1 minimum)

## Performance Optimizations

- Lazy loading images
- CSS animations use GPU-accelerated properties
- Debounced search input
- Minimal DOM manipulation
- Efficient event delegation

## Future Enhancements (Optional)

- Product comparison feature
- Price history charts
- 360° product views
- Review submission system
- Advanced analytics dashboard
- Multi-language support
- Currency converter
- Dark/light theme toggle

## Credits

Built as a demonstration of pure HTML/CSS/JS skills. No external frameworks or libraries used except for Google Fonts (Orbitron, Inter, JetBrains Mono).

## License

This is a demonstration project created for educational purposes.

---

**Built with ❤️ using pure web technologies**
