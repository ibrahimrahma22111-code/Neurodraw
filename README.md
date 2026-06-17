# Neurodraw

Neurodraw is a React-based application for Parkinson's disease detection through spiral drawing analysis, featuring an AI chatbot and clinician portal.

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- npm (usually comes with Node.js)

## Getting Started

1.  **Clone the repository** (if you haven't already):
    ```bash
    git clone <repository-url>
    cd Neurodraw
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Configuration**:
    - Copy `.env.example` to `.env`:
      ```bash
      cp .env.example .env
      ```
    - **Mock Mode (Default)**: If you don't have a backend running, set the following in `.env` to `false`:
      ```env
      VITE_USE_REAL_AUTH_API=false
      VITE_USE_REAL_HISTORY_API=false
      VITE_USE_REAL_CHAT_API=false
      VITE_USE_REAL_NOTIFICATIONS_API=false
      ```
    - **Real API Mode**: If you have the backend running locally (e.g., at `http://localhost:3000`), set them to `true`.

4.  **Run the Application**:
    ```bash
    npm run dev
    ```
    Open your browser to the URL shown in the terminal (usually `http://localhost:5173`).

## Features

- **Spiral Drawing Test**: Analyze hand tremors.
- **AI Chatbot**: Ask questions about Parkinson's.
- **Clinician Dashboard**: For doctors to review patient data.
- **Mock Data**: Built-in mock services for testing without a backend.

## Scripts

- `npm run dev`: Start development server.
- `npm run build`: Build for production.
- `npm run lint`: Run ESLint.
