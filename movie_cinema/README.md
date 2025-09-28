# Movie Cinema 🎬

A modern movie and TV show discovery app built with React and Vite.

## Features

- Browse popular, top-rated, now playing, and upcoming movies
- Discover TV shows airing today and on the air
- Search for movies and TV shows
- Multi-language support (English & Vietnamese)
- Responsive design for all devices
- Favorites functionality
- Movie trailers and detailed information

## Quick Start

### 1. Clone the repository
```bash
git clone <https://github.com/Thuongle2112/movie-cinema-react.git>
cd movie_cinema
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Setup
1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Get your TMDB API key:
   - Visit [TMDB](https://www.themoviedb.org/settings/api)
   - Create an account if you don't have one
   - Request an API key

3. Update `.env` with your API key:
   ```env
   VITE_TMDB_API_KEY=your_actual_api_key_here
   ```

### 4. Run the development server
```bash
npm run dev
```

### 5. Build for production
```bash
npm run build
```

## Tech Stack

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **API**: TMDB API
- **State Management**: Context API

## Project Structure

```
src/
├── components/         # Reusable components
├── pages/             # Page components
├── contexts/          # Context providers
├── services/          # API services
├── assets/            # Static assets
└── css/              # Stylesheets
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_TMDB_API_KEY` | TMDB API Key | Yes |
| `VITE_TMDB_BASE_URL` | TMDB API Base URL | Yes |

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.