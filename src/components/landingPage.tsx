"use client";

import Link from "next/link";

export default function LandingPage() {
  return (
    <div>
      <h1>FinBrief</h1>
      <Link href="/login">Login</Link>
      <Link href="/signup">Signup</Link>
    </div>
  );
}

