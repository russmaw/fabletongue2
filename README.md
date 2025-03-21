# LoreLingo - Fantasy Language Learning App

LoreLingo is an innovative language learning platform that combines the power of storytelling with interactive language lessons. Learn new languages through immersive fantasy stories, powered by AI-generated content and gamified learning mechanics.

## Features

- **AI-Driven Storytelling**: Dynamic story generation based on user preferences and language level
- **Two Learning Modes**:
  - Long Story Mode: Continuous adventures that evolve with your choices
  - Bedtime Mode: Short, 10-15 minute stories perfect for evening practice
- **Interactive Learning Tools**:
  - Contextual vocabulary with translations
  - Progress tracking and achievements
  - Customizable learning paths
- **Modern UI/UX**:
  - Clean, responsive design
  - Dark/light mode support
  - Progress visualization

## Tech Stack

- React + TypeScript
- Vite for build tooling
- Chakra UI for components
- Zustand for state management
- OpenAI API for story generation
- React Router for navigation

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Add your OpenAI API key to `.env`:
     ```
     VITE_OPENAI_API_KEY=your_api_key_here
     ```
   - **IMPORTANT**: Never commit your `.env` file or share your API keys
   - For deployment, set environment variables in your hosting platform (e.g., Netlify)

4. Start the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

The following environment variables are required:

| Variable | Description | Required |
|----------|-------------|----------|
| VITE_OPENAI_API_KEY | Your OpenAI API key | Yes |

### Security Notes

- Never commit API keys or sensitive data to version control
- Use environment variables for all sensitive configuration
- Rotate API keys if they are accidentally exposed
- Use appropriate API key restrictions in the OpenAI dashboard
- For production, set environment variables in your hosting platform

## Development

### Project Structure

```
src/
  ├── components/     # Reusable UI components
  ├── pages/         # Page components
  ├── store/         # Zustand store and state management
  ├── services/      # API and external service integrations
  ├── hooks/         # Custom React hooks
  ├── utils/         # Helper functions and utilities
  ├── styles/        # Global styles and theme
  ├── types/         # TypeScript type definitions
  └── assets/        # Static assets
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Deployment

1. Set up a new site in Netlify
2. Connect your repository
3. Configure environment variables in Netlify:
   - Go to Site settings > Build & deploy > Environment
   - Add your OpenAI API key as `VITE_OPENAI_API_KEY`
4. Deploy your site

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT License - feel free to use this project for learning or inspiration!

## Acknowledgments

- Inspired by Duolingo's gamification approach
- Built with modern web technologies
- Powered by OpenAI's GPT-3.5 for story generation 