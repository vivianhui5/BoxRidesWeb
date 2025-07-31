# BoxRides - Eco-Friendly Shipping Solutions

A modern, minimalistic web application for BoxRides, featuring clean design and eco-friendly shipping solutions.

## Features

- **Clean, Modern Design**: Minimalistic UI with focus on user experience
- **Responsive Layout**: Works seamlessly across desktop, tablet, and mobile devices
- **Eco-Friendly Focus**: Emphasizes sustainable shipping and environmental responsibility
- **Contact Form**: Functional contact form that sends emails to vivianhui05@gmail.com
- **Beta Signup**: Pre-launch signup functionality for early access
- **Smooth Scrolling**: Navigation with smooth scrolling between sections

## Tech Stack

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful, customizable icons
- **Nodemailer**: Email functionality (for production)

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
BoxRidesWeb/
├── app/
│   ├── api/
│   │   ├── contact/          # Contact form API endpoint
│   │   └── beta-signup/      # Beta signup API endpoint
│   ├── globals.css           # Global styles and Tailwind config
│   ├── layout.tsx            # Root layout component
│   └── page.tsx              # Home page
├── components/
│   ├── Header.tsx            # Navigation header
│   ├── Hero.tsx              # Hero section
│   ├── Features.tsx          # Features section
│   ├── BetaSignup.tsx        # Beta signup section
│   ├── Contact.tsx           # Contact form section
│   └── Footer.tsx            # Footer component
└── ...
```

## Customization

### Colors

The app uses a green color palette to emphasize eco-friendliness. You can customize colors in `tailwind.config.js`:

- Primary colors: Green shades from 50 to 900
- Neutral colors: Gray shades for text and backgrounds

### Email Configuration

To enable actual email sending:

1. Set up environment variables in `.env.local`:
   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   ```

2. Uncomment the email sending code in `app/api/contact/route.ts`

### Content

All content can be customized by editing the respective component files in the `components/` directory.

## Deployment

This app can be deployed to any platform that supports Next.js:

- Vercel (recommended)
- Netlify
- Railway
- Docker

## License

© 2024 BoxRides. All rights reserved. 