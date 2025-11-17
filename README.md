# Kdentee LLC

A modern, responsive portfolio and business website built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- 🎨 Modern, responsive design with smooth animations
- ⚡️ Built with Next.js 14 for optimal performance
- 🎭 Framer Motion animations for enhanced UX
- 📱 Mobile-first responsive design
- 🎯 SEO optimized with Next.js metadata API
- 📧 Contact form with Web3Forms integration
- 📊 Google Analytics tracking
- 🌈 Custom gradient effects and aurora backgrounds
- ♿️ Accessibility-focused

## Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Forms:** React Hook Form
- **Analytics:** Google Analytics (gtag.js)
- **Form Backend:** Web3Forms

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/kdentee/kdenteeLLC.git
cd kdenteeLLC
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with header/footer
│   ├── page.tsx           # Home page
│   ├── about/             # About page
│   ├── contact/           # Contact page with form
│   ├── portfolio/         # Portfolio showcase
│   └── services/          # Services page
├── components/            # React components
│   ├── layout/           # Header, Footer
│   └── shared/           # Hero, InfoSection
├── lib/                  # Utility functions
│   └── analytics.ts      # Google Analytics helpers
├── public/               # Static assets
│   ├── jpg/             # Images
│   ├── png/             # Images
│   ├── svg/             # Logos and vectors
│   └── pdf/             # Downloadable files
└── tailwind.config.ts   # Tailwind configuration
```

## Pages

- **Home** - Hero section, services overview, CTA
- **Portfolio** - Showcase of projects and work
- **Contact** - Contact form with validation
- **Services** - Detailed service offerings
- **About** - Company information and values

## Customization

### Colors

Update the primary color palette in `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    DEFAULT: '#E91E63',
    // ... other shades
  },
}
```

### Google Analytics

Update the tracking ID in `components/GoogleAnalytics.tsx` and `lib/analytics.ts`

### Contact Form

Update the Web3Forms access key in `app/contact/page.tsx`

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Deploy with one click

### Other Platforms

Build the project:
```bash
npm run build
```

The static files will be in the `.next` directory.

## License

© 2024 Kdentee LLC. All rights reserved.

## Contact

For inquiries, visit [kdentee.com/contact](https://kdentee.com/contact)
