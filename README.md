# Virtual Try-On Web App

A modern web application that allows users to upload their photo and a clothing item image to generate a virtual try-on result using Google's Gemini 2.5 Flash model.

## Project Structure

```
tryOn/
├── frontend/          # React 19 + TypeScript + Vite frontend
├── backend/           # Rust backend server
└── README.md         # This file
```

## Features

- **Modern UI**: Beautiful, responsive interface with drag-and-drop image uploads
- **React 19**: Latest React with TypeScript for type safety
- **Rust Backend**: High-performance Rust server with Axum framework
- **Image Processing**: Support for multiple image formats
- **API Integration**: Ready for Google Gemini 2.5 Flash API integration

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Rust (latest stable version)
- Cargo

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Build the Rust project:
   ```bash
   cargo build
   ```

3. Run the backend server:
   ```bash
   cargo run
   ```

   The backend will start on `http://localhost:3001`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

   The frontend will start on `http://localhost:5173`

## Usage

1. Start both the backend and frontend servers
2. Open your browser and navigate to `http://localhost:5173`
3. Upload your photo in the "Your Photo" section
4. Upload a clothing item image in the "Clothing Item" section
5. Click "Try On" to process the images
6. View the result (API integration pending)

## API Integration

The backend is structured to integrate with Google's Gemini 2.5 Flash model. To complete the integration:

1. Obtain a Google AI API key
2. Set up environment variables for the API key
3. Implement the `call_gemini_api` function in `backend/src/main.rs`
4. Update the try-on handler to return the generated result image

## Development

### Backend Development

- The backend uses Axum for the web framework
- CORS is configured to allow frontend connections
- Multipart form handling for image uploads
- Structured error handling and logging

### Frontend Development

- Built with Vite for fast development and building
- TypeScript for type safety
- Axios for HTTP requests
- Modern CSS with gradients and animations
- Responsive design for mobile and desktop

## API Endpoints

### Backend API

- `GET /` - Health check endpoint
- `POST /api/try-on` - Virtual try-on endpoint
  - Accepts multipart form data with `person_image` and `clothing_image` fields
  - Returns JSON response with success status and result

## Next Steps

1. Set up Google AI API credentials
2. Implement Gemini 2.5 Flash API integration
3. Add image preprocessing and validation
4. Implement result caching
5. Add user authentication (optional)
6. Deploy to production

## Technologies Used

### Frontend
- React 19
- TypeScript
- Vite
- Axios
- Modern CSS

### Backend
- Rust
- Axum web framework
- Tokio async runtime
- Serde for JSON serialization
- Reqwest for HTTP requests
- Tower for middleware

## License

This project is for educational and development purposes.
