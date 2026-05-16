# Stage 1: Build the React frontend
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend

# Install dependencies first for better caching
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install

# Copy source code and build
COPY frontend/ ./
RUN npm run build

# Stage 2: Build the Django backend
FROM python:3.11-slim
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    libpq-dev gcc \
    && rm -rf /var/lib/apt/lists/*

# Install python dependencies
COPY backend/requirements.txt backend/
RUN pip install --no-cache-dir -r backend/requirements.txt

# Copy backend source code
COPY backend/ backend/

# Copy built frontend from Stage 1 to the backend directory
COPY --from=frontend-builder /app/frontend/dist /app/backend/frontend_dist

# Set the working directory to where manage.py is
WORKDIR /app/backend

# Run collectstatic to prepare static files
ENV SECRET_KEY=dummy-key-for-build
RUN python manage.py collectstatic --noinput

# Start gunicorn to serve the app
CMD python manage.py migrate && gunicorn core.wsgi:application --bind 0.0.0.0:${PORT:-8000}
