"use client";
import dynamic from "next/dynamic";
import React from "react";

const CustomCursor = dynamic(() => import("@/components/CustomCursor"), { ssr: false });

export default function ClientRoot({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CustomCursor />
      {children}
    </>
  );
} 