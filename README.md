# Task Manager

A full-stack task management web application built with a Python Django backend and a React frontend. It provides role-based access control, project and task management features, and a status dashboard for tracking progress.

## Features

- **User Authentication**: Secure login and registration using JWT authentication.
- **Role-based Access Control**: Different access levels for Admin and Member roles.
- **Project Management**: Create, update, and track multiple projects.
- **Task Tracking**: Create and assign tasks within projects, and update their statuses.
- **Dashboard**: A comprehensive dashboard to view the overall progress and statistics of your projects and tasks.
- **Responsive UI**: A modern, sleek, and responsive user interface built with React.

## Tech Stack

### Backend
- Python
- Django & Django REST Framework (DRF)
- PostgreSQL
- JWT Authentication

### Frontend
- React (Vite)
- HTML & CSS (Custom styling)
- Axios for API requests

## Installation & Setup

### Prerequisites
- Python 3.10+
- Node.js & npm
- PostgreSQL

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Set up environment variables (create a `.env` file based on your config).
5. Apply migrations and start the server:
   ```bash
   python manage.py migrate
   python manage.py runserver
   ```

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

## Deployment
This application is configured for deployment on Railway using the provided `railway.json` and `Procfile`.

## License
MIT License
