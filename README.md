# todo-app-server

This project was created with [Better-T-Stack](https://github.com/AmanVarshney01/create-better-t-stack), a modern TypeScript stack that combines Express, and more.

## Features

- **TypeScript** - For type safety and improved developer experience
- **Express** - Fast, unopinionated web framework
- **Node.js** - Runtime environment
- **Prisma** - TypeScript-first ORM
- **MySQL** - Database engine

## Getting Started

First, install the dependencies:

```bash
npm install
```
## Database Setup

This project uses MySQL with Prisma.

1. Make sure you have a MySQL database set up.
2. Update your `apps/server/.env` file with your MySQL connection details.

3. Generate the Prisma client and push the schema:
```bash
npm run db:push
```


Then, run the development server:

```bash
npm run dev
```

The API is running at [http://localhost:3000](http://localhost:3000).



## Project Structure

```
todo-app-server/
├── apps/
│   └── server/      # Backend API (Express)
```

## Available Scripts

- `npm run dev`: Start all applications in development mode
- `npm run build`: Build all applications
- `npm run dev:web`: Start only the web application
- `npm run dev:server`: Start only the server
- `npm run check-types`: Check TypeScript types across all apps
- `npm run db:push`: Push schema changes to database
- `npm run db:studio`: Open database studio UI
