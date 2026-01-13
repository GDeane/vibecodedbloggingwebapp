"use client";

import React from "react";
import { error as logError } from "../lib/logger";
import Link from "next/link";

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  logError(error);

  return (
    <html>
      <body>
        <div style={{ padding: 40, fontFamily: "system-ui, sans-serif" }}>
          <h1>Something went wrong</h1>
          <p>{error?.message ?? "An unexpected error occurred."}</p>
          <div style={{ marginTop: 16 }}>
            <button onClick={() => reset()}>Try again</button>
            <Link style={{ marginLeft: 12 }} href="/">
              Go home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
