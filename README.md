# Job Portal Application

A modern job portal application built with React and Node.js, allowing users to browse and manage job listings.

## Technologies Used

### Frontend
- **React** - A JavaScript library for building user interfaces
- **TypeScript** - For type-safe code
- **Vite** - Next-generation frontend tooling
- **Tailwind CSS** - For styling and responsive design
- **Axios** - For making HTTP requests
- **React Router** - For client-side routing
- **Lucide React** - For beautiful icons

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework for Node.js
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **CORS** - For handling cross-origin requests

## Features

- Browse job listings
- Create new job postings
- Delete job listings
- Responsive design for all devices
- Real-time updates
- Modern and clean UI

## Project Structure

```
project/
├── frontend/           # React frontend application
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── context/    # React context for state management
│   │   ├── pages/      # Page components
│   │   └── types/      # TypeScript type definitions
│   └── public/         # Static assets
│
└── backend/           # Node.js backend application
    ├── models/        # MongoDB models
    ├── routes/        # API routes
    └── server.js      # Main server file
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB
- npm or yarn

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

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a .env file with your MongoDB URI:
   ```
   MONGODB_URI=your_mongodb_connection_string
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

## Deployment

### Frontend Deployment (netlify)
1. Push your code to GitHub
2. Connect your repository to netlify
3. Set the framework preset to Vite
4. Set the root directory to "frontend"
5. Deploy!

### Backend Deployment (Vercel)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set the root directory to "backend"
4. Add your environment variables
5. Deploy!

## API Endpoints

- `GET /api/jobs` - Get all jobs
- `POST /api/jobs` - Create a new job
- `DELETE /api/jobs/:id` - Delete a job


## License

This project is licensed under the MIT License.
