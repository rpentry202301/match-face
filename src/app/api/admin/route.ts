import { NextResponse } from "next/server";

export const GET = async () => {
  const url = process.env.BE_URL;
  const response = await fetch(`${url}/administrator_main_elements`);
  const data = await response.json();
  return NextResponse.json(data);
};
