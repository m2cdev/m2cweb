"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export const Map2CloseLogo = ({ className }) => {
  return (
    <Link href="/" className={cn("flex items-center gap-2 group", className)}>
      <div className="relative h-8 w-40">
        <Image 
          src="/logo-black.png" 
          alt="Map2Close Logo" 
          fill
          className="object-contain invert brightness-200"
          priority
        />
      </div>
    </Link>
  );
}

export default Map2CloseLogo;
