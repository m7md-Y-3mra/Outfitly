# Outfitly

![Next.js](https://img.shields.io/badge/Next.js-16.x-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.x-blue?style=for-the-badge&logo=react)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16.x-blue?style=for-the-badge&logo=postgresql)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC?style=for-the-badge&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

A modern full-stack web application for personal wardrobe management and AI-powered outfit styling. Built with Next.js 16, React 19, and TypeScript.

## Features

### Wardrobe Management
- Add, organize, and categorize clothing items
- Support for multiple categories: tops, bottoms, shoes, accessories, and more
- Assign styles (Casual, Formal, Work, Sporty, Streetwear, Loungewear, Party)
- Track seasonal availability and item metadata (color, size, brand, notes)
- Image upload and management

### AI-Powered Outfit Generator
- Intelligent outfit recommendations using Groq SDK with Llama 3.3 70B
- Considers weather, style preferences, occasions, and specific requirements
- Returns multiple outfit options with confidence ratings
- Smart item selection from your personal wardrobe

### Outfit Management
- Create custom outfits from wardrobe items
- Assign occasions to outfits
- Privacy settings (private, friends, public)
- Like and favorite functionality

### Explore & Social
- Browse outfits from other users
- Discover outfits by occasion
- Like and save favorite outfits

### Admin Dashboard
- User management
- Outfit moderation
- Platform settings

## Tech Stack

| Category | Technologies |
|----------|-------------|
| Framework | Next.js 16, React 19 |
| Language | TypeScript (strict mode) |
| Database | PostgreSQL, Prisma ORM |
| Authentication | JWT, Argon2 password hashing |
| UI Components | shadcn/ui, Radix UI |
| Styling | Tailwind CSS 4, Framer Motion, GSAP |
| State Management | Zustand |
| Forms | Formik, Zod validation |
| AI | Groq SDK (Llama 3.3 70B) |
| File Storage | AWS S3 / Tigris |

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- AWS S3 or Tigris account (for file storage)
- Groq API key (for AI features)

### Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/outfitly"

# Authentication
SESSION_SECRET="your-session-secret"
NEXT_SERVER_ACTIONS_ENCRYPTION_KEY="your-encryption-key"

# AWS S3 / Tigris Storage
AWS_ACCESS_KEY_ID="your-access-key"
AWS_SECRET_ACCESS_KEY="your-secret-key"
AWS_ENDPOINT_URL_S3="your-endpoint-url"
AWS_REGION="your-region"
S3_BUCKET_NAME="your-bucket-name"

# AI
GROQ_API_KEY="your-groq-api-key"
```

### Installation

```bash
# Install dependencies
npm install

# Generate Prisma client
npm run prisma:generate

# Run database migrations
npm run migrate

# Seed the database (optional)
npm run seed

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |
| `npm run type-check` | Run TypeScript type checking |
| `npm run check` | Run all code quality checks |
| `npm run prisma:generate` | Generate Prisma client |
| `npm run migrate` | Deploy database migrations |
| `npm run migration:create` | Create new migration |
| `npm run seed` | Seed database with initial data |
| `npm run studio` | Open Prisma Studio |

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── (main)/            # Main application routes
│   ├── (admin)/           # Admin dashboard routes
│   ├── (auth)/            # Authentication routes
│   └── api/               # API routes
├── modules/               # Feature modules
│   ├── wardrobe/          # Wardrobe management
│   ├── outfit/            # Outfit management
│   ├── AI-generator/      # AI outfit generation
│   ├── auth/              # Authentication
│   ├── explore/           # Explore feature
│   ├── user/              # User management
│   └── dashboard/         # Admin dashboard
├── components/            # Reusable UI components
│   └── ui/                # Base UI components (shadcn/ui)
├── lib/                   # Utilities and helpers
├── hooks/                 # Custom React hooks
├── config/                # Configuration files
├── prisma/                # Database schema and migrations
└── public/                # Static assets
```

## Database Schema

Key models include:

- **User** - User accounts and profiles
- **WardrobeItem** - Personal clothing items
- **Outfit** - Collections of styled items
- **Occasion** - Outfit occasions (wedding, office, casual, etc.)

Run `npm run studio` to explore the database visually with Prisma Studio.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
