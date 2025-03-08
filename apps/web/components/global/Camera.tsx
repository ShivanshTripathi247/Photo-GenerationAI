'use client'

import { BACKEND_URL } from "@/app/config"
import { useAuth } from "@clerk/nextjs"
import axios from "axios"
import { useEffect, useState } from "react"
import { CameraCard, TImage } from "../ui/camera-card"

export function Camera() {
    const [images, setImages] = useState<TImage[]>([]);
    const [loading, setLoading] = useState(true);
    const { getToken } = useAuth();

    // Function to fetch images
    const fetchImages = async () => {
        try {
            setLoading(true);
            const token = await getToken();
            const response = await axios.get(`${BACKEND_URL}/image/bulk`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            
            // Store in state
            setImages(response.data.images);
            
            // Save to localStorage for persistence
            localStorage.setItem('cachedImages', JSON.stringify(response.data.images));
            
            setLoading(false);
        } catch (error) {
            console.error("Error fetching images:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        // First try to load from localStorage
        const cachedImages = localStorage.getItem('cachedImages');
        
        if (cachedImages) {
            setImages(JSON.parse(cachedImages));
            setLoading(false);
        }
        
        // Then fetch fresh data
        fetchImages();
        
        // Add event listener for when the tab becomes visible again
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                fetchImages();
            }
        };
        
        document.addEventListener('visibilitychange', handleVisibilityChange);
        
        // Clean up
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [getToken]);

    return (
        <>
            {loading && (
                <div className="fixed w-full h-full inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="flex flex-col items-center">
                        {/* Pulse loader */}
                        <div className="relative">
                            <div className="w-24 h-24 rounded-full border-4 border-purple-400 border-t-transparent animate-spin"></div>
                            <div className="absolute top-0 left-0 w-24 h-24 rounded-full border-4 border-fuchsia-400 border-r-transparent animate-ping opacity-50"></div>
                        </div>
                        
                        {/* Text that fades in and out */}
                        <div className="mt-6 text-white font-medium animate-pulse">
                            <span className="bg-gradient-to-r from-red-400 to-fuchsia-300 bg-clip-text text-transparent text-xl">
                                Loading your masterpieces...
                            </span>
                        </div>
                    </div>
                </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
                {images.length > 0 ? (
                    images.map((image, index) => (
                        <CameraCard 
                            key={image.id || `image-${index}`}
                            id={image.id || ""}
                            status={image.status || ""}
                            imageUrl={image.imageUrl || ""}
                        />
                    ))
                ) : !loading && (
                    <div className="col-span-full flex flex-col items-center justify-center p-12 text-center">
                        <div className="w-20 h-20 mb-4 text-4xl flex items-center justify-center rounded-full bg-gradient-to-r from-purple-400 to-pink-300">
                            📷
                        </div>
                        <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-300 bg-clip-text text-transparent">
                            No Images Found
                        </h3>
                        <p className="text-neutral-300">
                            Start creating your AI-powered images to see them here
                        </p>
                    </div>
                )}
            </div>
        </>
    );
}