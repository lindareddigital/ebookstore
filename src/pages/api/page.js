import { NextResponse } from "next/server";
import apiManager from "src/pages/api/api";

export async function handler(req) {

  try {
    const data = await apiManager.getPageBySlug();
    console.log('data',data);
    
    // res.status(200).json({ 'data' });
  } catch (err) {
    res.status(500).json({ error: "failed to load data" });
  }

  // return NextResponse.json({ data });
}

export default handler
