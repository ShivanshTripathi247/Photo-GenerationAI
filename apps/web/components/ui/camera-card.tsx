"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";

export interface TImage {
    id: string;
    status: string;
    imageUrl: string;
  }
  
  // Update the component to use props object
  export function CameraCard({ id, status, imageUrl }: TImage) {
  
  return (
    <div className="max-w-xs w-full group/card">
      <div
        className={cn(
          "cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-xl max-w-sm mx-auto backgroundImage flex flex-col justify-between p-4 bg-cover bg-center"
        )}
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <div className="absolute w-full h-full top-0 left-0 transition duration-300 group-hover/card:bg-black opacity-60"></div>
        <div className="flex flex-row items-center space-x-4 z-10">

        </div>
        <div className="text content">
          <h1 className="font-bold text-xl md:text-2xl text-gray-50 relative z-10">
            
          </h1>
          <p className="font-normal text-sm text-gray-50 relative z-10 my-4">
            
          </p>
        </div>
      </div>
    </div>
  );
}
