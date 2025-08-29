# Movie DB - React Movie Database

This is a modern, responsive movie database web application built with React.
It allows users to browse and search for movies using the OMDB API.

## Features

- **Movie Search**: Real-time search functionality in the navbar
- **Movie Carousel**: Featured movies slider with auto-play
- **Responsive Design**: Mobile-friendly Bootstrap layout
- **Movie Cards**: Beautiful card layout with movie details
- **OMDB API Integration**: Fetches real movie data from OMDB

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

## Clone the repository:
```bash
git clone <your-repo-url>
cd movie_db

## Installing dependencies
npm install

## Installing required packages:
npm install axios react-slick slick-carousel bootstrap

## Starting the development server
npm start


## Movie_DB Project Structure

movie_db/
├── src/
│   ├── components/
│   │   ├── Navbar.js          # Has the Navigation with search functionality
│   │   ├── Bodycontent.js     # Has the Main content with movie grid
│   │   ├── MovieCard.js       # Contains an Individual movie card component
│   │   ├── CardSlider.js      # This contains Movie carousel/slider
│   │   └── Footer.js          # This is the Footer component
│   ├── assets/
│   │   └── bg.png            # A default background image
│   └── App.js                # Main application component
├── public/
└── package.json

