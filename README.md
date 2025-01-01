## FinBrief

### Personalized financial news, simplified summaries

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/FinBrief/FinBrief-client.git
   cd FinBrief-client
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```
   
3. **Set up the database schema and generate Prisma Client:**

   ```bash
   npx prisma generate
   ```

4. **Configure Environment Variables**

   Create a `.env.local` file in the root directory and add the necessary environment variables:

   ```env
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-api-key
    CLERK_SECRET_KEY=your-clerk-secret
    
    NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
    NEXT_PUBLIC_CLERK_SIGN_UP_URL=/signup
    NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/feed/custom
    NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/feed/all
   ```
   Create a `.env` file in the root directory and add your postgres db url

   ```env
   DATABASE_URL=your-postgresdb-url
   ```

### Running the Development Server

Start the development server:

```bash
  npm run dev
```

### To run and start the scrapper, follow the instructions in its repo [here](https://github.com/FinBrief/Scrapper)