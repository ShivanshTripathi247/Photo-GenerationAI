'use client'
import { Button } from "@/components/ui/button";
import { LampComponent } from "@/components/ui/lamp-effect";
import Navbar from "@/components/ui/navbar";
import { WavyBackground } from "@/components/ui/wavy-background";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";



export default function Home() {
  const { scrollYProgress, scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(false);
  return (<>
    <div className="relative flex flex-col text-white bg-black min-h-screen">
      
      {/* Hero Section */}
      <div className="h-screen relative">
        <Navbar className="top-2" />
        
        <div className="absolute top-10 right-6 w-auto rounded-full gap-4
        bg-transparent shadow-lg flex items-center justify-between z-50">
          {/* Add your content here (icon/text/etc) */}
          <SignedOut >
            <SignInButton />
            <SignUpButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>

        <WavyBackground className="max-w-4xl mx-auto h-full flex flex-col items-center justify-center">
        <p className="text-2xl md:text-4xl lg:text-7xl  font-bold inter-var text-center 
        bg-gradient-to-r from-red-400 to-fuchsia-100 bg-clip-text text-transparent">
          Welcome To PhotoGen-AI.
        </p>

        <p className="text-base md:text-lg mt-4 text-white font-normal inter-var text-center">
          Leverage the power of AI to generate you-specific Photos
        </p>
        <Button className="mt-10 bg-red-300 hover:fuchsia-200 rounded-full">
          View our Plans
        </Button>
        
        {/* Scroll prompt inside hero section */}
        <motion.div 
          className="absolute bottom-20 w-full text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <p className="text-lg text-white/80">
            Scroll to explore
            <span className="ml-2 animate-bounce inline-block">↓</span>
          </p>
        </motion.div>
      </WavyBackground>

      {/* Scroll progress in hero */}
      <motion.div 
        className="absolute bottom-10 right-10 z-50"
        style={{ 
          scaleX: scrollYProgress,
          transformOrigin: "left center"
        }}
      >
      </motion.div>
    </div>

    {/* Content Sections */}
    <div className="px-4 md:px-8 py-20 space-y-40">
      {[1, 2, 3].map((index) => (
        <motion.div
          key={index}
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
          transition={{ duration: 0.8, delay: index * 0.2 }}
          viewport={{ margin: "-30% 0px -30% 0px", once: false }}
        >
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-300 bg-clip-text text-transparent">
            Feature {index}
          </h2>
          <p className="mt-4 text-neutral-300 text-lg leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </motion.div>
      ))}
    </div>
    <LampComponent />

    </div>
    </>
  );
}
