# Trivial Tulsa

A modern trivia website featuring weekly questions in a pub quiz format with Trivial Pursuit-style cards.

## Features

- **Interactive Question Cards**: Flip cards with questions and answers
- **Multiple Routes**: 
  - Landing page with site information
  - Random question generator (`/random`)
  - Individual question permalinks (`/questions/[id]`)
  - Browse all questions with filtering (`/browse`)
- **Filtering & Search**: Filter by category, date, and search through questions/answers
- **Responsive Design**: Works on desktop and mobile
- **Share Functionality**: Share individual questions via social media or copy link

## Tech Stack

- **Frontend**: React 19 + Vite
- **Routing**: React Router DOM
- **Styling**: Pure CSS with CSS Grid and Flexbox
- **Data**: JSON file-based question storage
- **Deployment**: Vercel (static hosting)

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Question Data Structure

Questions are stored in `/src/data/questions.json`:

```json
{
  "id": 1,
  "date": "2024-07-01",
  "category": "Geography",
  "question": "What is the capital of Oklahoma?",
  "answer": "Oklahoma City"
}
```

## Adding New Questions

1. Add questions to `/src/data/questions.json`
2. Follow the existing structure with unique IDs
3. Use date format: `YYYY-MM-DD`
4. Categories: Geography, Sports, History, Entertainment, Science, Art

## Deployment

The site is configured for Vercel deployment:
- `vercel.json` handles SPA routing
- Build output goes to `dist/`
- Static assets are optimized

## Routes

- `/` - Landing page
- `/random` - Random question
- `/questions/[id]` - Specific question
- `/browse` - Browse all questions with filters

## Categories

- Geography (Green)
- Sports (Orange) 
- History (Purple)
- Entertainment (Pink)
- Science (Blue)
- Art (Brown)
