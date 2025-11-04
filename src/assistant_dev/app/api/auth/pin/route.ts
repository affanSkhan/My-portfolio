import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { pin } = await req.json();
    
    // Validate PIN against environment variable
    const correctPin = process.env.ASSISTANT_ADMIN_PIN;
    
    if (!correctPin) {
      console.error("ASSISTANT_ADMIN_PIN not set in environment variables");
      return NextResponse.json(
        { ok: false, error: "Server configuration error" }, 
        { status: 500 }
      );
    }
    
    const isValid = pin === correctPin;
    
    return NextResponse.json({ 
      ok: isValid,
      message: isValid ? "PIN verified successfully" : "Invalid PIN"
    });
  } catch (error) {
    console.error("PIN authentication error:", error);
    return NextResponse.json(
      { ok: false, error: "Authentication failed" }, 
      { status: 500 }
    );
  }
}