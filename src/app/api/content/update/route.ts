import { NextResponse } from "next/server";
import { readJson, writeJson, isAllowedFile } from "@/lib/fs-json";

export async function POST(req: Request) {
  try {
    const { pinOk, file, op } = await req.json();
    
    // Verify authentication
    if (!pinOk) {
      return NextResponse.json(
        { error: "Unauthorized - PIN required" }, 
        { status: 401 }
      );
    }
    
    // Validate file
    if (!isAllowedFile(file)) {
      return NextResponse.json(
        { error: "File not allowed" }, 
        { status: 400 }
      );
    }
    
    // Read current data
    const current = await readJson<unknown[]>(file);
    
    if (!Array.isArray(current)) {
      return NextResponse.json(
        { error: "File does not contain an array" }, 
        { status: 400 }
      );
    }
    
    // Apply operations
    if (op?.type === "add") {
      current.push(op.item);
    } else if (op?.type === "update") {
      if (op.index >= 0 && op.index < current.length) {
        const currentItem = current[op.index];
        if (typeof currentItem === 'object' && currentItem !== null) {
          current[op.index] = { ...currentItem, ...op.patch };
        } else {
          return NextResponse.json(
            { error: "Cannot update non-object item" }, 
            { status: 400 }
          );
        }
      } else {
        return NextResponse.json(
          { error: "Invalid index for update" }, 
          { status: 400 }
        );
      }
    } else if (op?.type === "remove") {
      if (op.index >= 0 && op.index < current.length) {
        current.splice(op.index, 1);
      } else {
        return NextResponse.json(
          { error: "Invalid index for removal" }, 
          { status: 400 }
        );
      }
    } else {
      return NextResponse.json(
        { error: "Invalid operation type" }, 
        { status: 400 }
      );
    }
    
    // Write updated data
    await writeJson(file, current);
    
    return NextResponse.json({ 
      ok: true, 
      message: `Successfully ${op.type}ed item in ${file}`,
      itemsCount: current.length
    });
    
  } catch (error) {
    console.error("Content update error:", error);
    return NextResponse.json(
      { error: "Failed to update content" }, 
      { status: 500 }
    );
  }
}