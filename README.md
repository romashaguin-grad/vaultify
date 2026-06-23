# Vaultify — AI-Powered Cloud Storage

Vaultify is a next-generation cloud storage platform that lets you upload, organize, and manage your files with AI-powered features. Built with React, Appwrite, and ImageKit.

## Features

### File Management
- Upload, rename, delete, and organize files into folders
- Browse files in My Drive and Recent Files
- Real-time file search across your entire drive
- File preview with inline viewer for images, videos, and PDFs

### AI Features
- **AI Image Generation** — describe an image in natural language and it gets generated and saved directly to your drive, powered by Replicate's Flux Schnell model
- **AI Document Summarizer** — click any PDF in your drive to generate an instant AI summary, powered by Google Gemini 2.5 Flash
- **AI Image Editing** — remove backgrounds, upscale resolution, add drop shadows, and retouch images using ImageKit's AI transformation pipeline

### Authentication
- Email/password login and signup
- Google OAuth
- Forgot password and reset password flow

## Tech Stack

- **Frontend:** React, Vite, TypeScript, Tailwind CSS, shadcn/ui
- **Backend:** Appwrite (authentication, serverless functions)
- **Storage:** ImageKit (file hosting, AI image editing)
- **AI:** Replicate Flux Schnell (image generation), Google Gemini 2.5 Flash (document summarization)
- **Routing:** React Router

## Getting Started

### Prerequisites
- Node.js 18+
- Appwrite account
- ImageKit account
- Replicate account
- Google AI Studio account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/vaultify.git
cd vaultify
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```properties
VITE_APPWRITE_PROJECT_ID=your_appwrite_project_id
VITE_APPWRITE_PROJECT_NAME=your_project_name
VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_FN_ID=your_appwrite_function_id

VITE_IMAGEKIT_API_KEY=your_imagekit_private_key
VITE_IMAGEKIT_API_ENDPOINT=https://api.imagekit.io/v1/files
VITE_IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint

VITE_REPLICATE_API_TOKEN=your_replicate_api_token
VITE_GEMINI_API_KEY=your_gemini_api_key
```

4. Deploy the Appwrite Function from the `imagekit-auth-fn` directory and add these environment variables to it:
```properties
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
REPLICATE_API_TOKEN=your_replicate_api_token
GEMINI_API_KEY=your_gemini_api_key
```

5. Start the development server:
```bash
npm run dev
```