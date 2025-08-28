# todo-app-server

This project was created with [Better-T-Stack](https://github.com/AmanVarshney01/create-better-t-stack), a modern TypeScript stack that combines Express, and more.

## Features

- **TypeScript** - For type safety and improved developer experience
- **Express** - Fast, unopinionated web framework
- **Node.js** - Runtime environment
- **Prisma** - TypeScript-first ORM
- **MySQL** - Database engine

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- Docker (for running MySQL database)

### Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone <your-repo-url>
   cd todo-app-server
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Environment setup:**

   ```bash
   cp .env.example .env
   ```

   Update the `.env` file with your configuration:

   ```
   DATABASE_URL="mysql://user:password@localhost:3306/todo-app-server"
   CORS_ORIGIN="http://localhost:3000"
   ```

4. **Start the MySQL database with Docker:**

   ```bash
   npm run db:start
   ```

   This will start a MySQL container using Docker Compose in detached mode.
   
   **Alternative:** To see database logs in real-time:
   ```bash
   npm run db:watch
   ```
   
   The Docker setup includes:
   - MySQL 8.0 container
   - Database: `todo-app-server`
   - User: `user` / Password: `password`
   - Root password: `password`
   - Port: `3306` (mapped to localhost:3306)

5. **Initialize the database:**

   ```bash
   npm run db:push
   ```

   This will create the database schema and generate the Prisma client.

6. **Run the development server:**
   ```bash
   npm run dev
   ```

The API will be running at [http://localhost:3000](http://localhost:3000).

### Stopping the Database

To stop the MySQL Docker container:
```bash
npm run db:stop
```

To stop and remove the container (this will delete all data):
```bash
npm run db:down
```

### Alternative Database Setup

If you prefer to use your own MySQL instance instead of Docker:

1. Set up a MySQL database locally or use a cloud provider
2. Update the `DATABASE_URL` in your `.env` file with your connection string
3. Run `npm run db:push` to set up the schema

### Troubleshooting

**Port 3306 already in use:**
If you have MySQL running locally, either stop it or change the Docker port mapping in `docker-compose.yml`.

**Database connection issues:**
Make sure the Docker container is running with `docker ps` and check the container logs with `docker logs todo-app-server-mysql`.

## Project Structure

```
todo-app-server/
├── apps/
│   └── server/      # Backend API (Express)
```

## Available Scripts

### Development

- `npm run dev`: Start the server in development mode with hot reload
- `npm run start`: Start the production build

### Database Management

- `npm run db:start`: Start MySQL database using Docker Compose
- `npm run db:watch`: Start MySQL database with logs (foreground)
- `npm run db:stop`: Stop the MySQL database container
- `npm run db:down`: Stop and remove the MySQL database container
- `npm run db:push`: Push schema changes to database
- `npm run db:migrate`: Run database migrations
- `npm run db:generate`: Generate Prisma client
- `npm run db:studio`: Open Prisma Studio (database management UI)
