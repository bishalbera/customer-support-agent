import { NextRequest, NextResponse } from "next/server";
import { Client } from "pg";

export const GET = async () => {
  const client = new Client({
    host: process.env.DEST_HOST,
    port: 5439,
    user: process.env.DEST_USERNAME,
    password: process.env.DEST_PASS,
    database: process.env.DEST_DB,
    ssl:{
      rejectUnauthorized: false,
    },
  });

  console.log("Connecting to:", {
    host: process.env.DEST_HOST,
    user: process.env.DEST_USERNAME,
    database: process.env.DEST_DB,
  });

  try {
    await client.connect();
    const res = await client.query(
      `
      SELECT DISTINCT location
      FROM dev.public.trip_recommendations
      WHERE location IS NOT NULL
      ORDER BY location
        `
    );

    await client.end();

    const location = await res.rows.map((row) => row.location);
    console.log(location);
    return NextResponse.json({ location });
  } catch (err) {
    console.error("Failed to fetch locations:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
