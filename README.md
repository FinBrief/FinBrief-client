# FinBrief

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

3. **Configure Environment Variables**

   Create a `.env.local` file in the root directory and add the necessary environment variables:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=
   NEXT_PUBLIC_SUPABASE_ANON_KEY=
   NEXT_PUBLIC_VULTR_API_KEY=
   ```
   Create a `.env` file in the root directory and add your postgres db url

   ```env
   DATABASE_URL=
   ```

### Running the Development Server

Start the development server:

```bash
  npm run dev
```