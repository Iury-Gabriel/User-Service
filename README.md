
# User Service Project

## How to run the project

Follow these steps to run the project after cloning the repository:

### 1. Install dependencies

```bash
npm install
```

### 2. Update the Docker configuration

Modify the `docker-compose.yml` file with your specific database credentials.

### 3. Start Docker services

Once the Docker credentials are set, run:

```bash
docker-compose up
```

### 4. Set up environment variables

Create a `.env` file by copying from the provided `.env.example` file, and update it with your environment-specific values.

```bash
cp .env.example .env
```

### 5. Run Prisma migrations

After setting up the environment variables, run the following to apply database migrations:

```bash
npx prisma migrate dev
```

### 6. Start the development server

Finally, to start the project in development mode, run:

```bash
npm run dev
```

## Additional Notes

- Ensure Docker is properly installed and running before starting the project.
- Prisma is used for database management, so ensure your database connection is properly configured in the `.env` file.
- For production environments, make sure sensitive information like credentials is properly secured and environment variables are handled safely.
