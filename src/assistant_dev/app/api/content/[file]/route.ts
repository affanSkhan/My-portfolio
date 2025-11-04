import { NextResponse } from "next/server";
import { readJson, isAllowedFile } from "@/lib/fs-json";

export async function GET(
  _req: Request,
  { params }: { params: { file: string } }
) {
  try {
    const filename = params.file;
    
    // Validate file is in allowed list
    if (!isAllowedFile(filename)) {
      return NextResponse.json(
        { error: "File not found or not allowed" }, 
        { status: 404 }
      );
    }
    
    // Read and return the JSON data
    const data = await readJson<unknown>(filename);
    
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    });
    
  } catch (error) {
    console.error(`Error reading ${params.file}:`, error);
    
    if (error instanceof Error && error.message.includes('ENOENT')) {
      return NextResponse.json(
        { error: "File not found" }, 
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { error: "Failed to read content" }, 
      { status: 500 }
    );
  }
}