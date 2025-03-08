'use client'
import { ModeToggle } from "@/components/theme/theme-button";
import { Button } from "@/components/ui/button";
import { LampComponent } from "@/components/ui/lamp-effect";
import Navbar from "@/components/ui/navbar";
import { WavyBackground } from "@/components/ui/wavy-background";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";



export default function Home() {
  const { scrollYProgress, scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();
  return (<>
    <div className="relative flex flex-col text-white bg-black min-h-screen">
      
      {/* Hero Section */}
      <div className="h-screen relative">
        <Navbar className="top-2" />
        
        <div className="absolute top-10 right-6 w-auto rounded-full gap-4
        bg-transparent shadow-lg flex items-center justify-between z-50">
          {/* Add your content here (icon/text/etc) */}
          <ModeToggle/>
          <SignedOut >
            <Button className=" bg-red-300">
              <SignInButton />
            </Button>
            <Button className=" bg-red-300">
              <SignUpButton />
            </Button>         
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
        <div className="flex flex-row gap-4">
        <SignedIn>
        <Button className="mt-10 bg-red-300 hover:fuchsia-200 rounded-full"
        onClick={()=>
          router.push('/dashboard')
        }>
          Dashboard
        </Button>
        </SignedIn>
        <Button className="mt-10 bg-red-300 hover:fuchsia-200 rounded-full">
          View our Plans
        </Button>
        
        </div>
        
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
    <div className="relative py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-black to-purple-950 opacity-80"></div>
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-soft-light"></div>
      
      {/* Animated particles or stars */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: Math.random() * 0.7 + 0.3
            }}
          />
        ))}
      </div>
      
      {/* Main content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          className="text-5xl font-bold text-center mb-20"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="bg-gradient-to-r from-red-400 via-fuchsia-300 to-purple-400 bg-clip-text text-transparent">
            Unleash Your Creative Potential
          </span>
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              title: "AI-Powered Generation",
              description: "Create stunning, personalized photos with our advanced AI algorithms. Perfect for portfolios, social media, or professional branding.",
              icon: "✨",
              color: "from-red-400 to-orange-300"
            },
            {
              title: "Unlimited Customization",
              description: "Fine-tune every aspect of your generated images with intuitive controls. Adjust style, mood, lighting, and more with simple prompts.",
              icon: "🎨",
              color: "from-fuchsia-400 to-pink-300"
            },
            {
              title: "Instant Delivery",
              description: "Download high-resolution images instantly in multiple formats. No watermarks, no limitations—just beautiful AI-generated photos ready to use.",
              icon: "⚡",
              color: "from-purple-400 to-indigo-300"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="relative group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              {/* Card background with gradient border */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl opacity-70 blur group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative h-full bg-black bg-opacity-90 backdrop-blur-sm rounded-xl p-8 border border-white/10 overflow-hidden group-hover:translate-y-[-5px] transition-transform duration-300">
                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <div className={`w-16 h-16 flex items-center justify-center text-3xl rounded-full bg-gradient-to-r ${feature.color}`}>
                    {feature.icon}
                  </div>
                </div>
                
                {/* Title with gradient */}
                <h3 className={`text-2xl font-bold text-center mb-4 bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}>
                  {feature.title}
                </h3>
                
                {/* Description */}
                <p className="text-neutral-300 text-center leading-relaxed">
                  {feature.description}
                </p>
                
                {/* Hidden detail that appears on hover */}
                <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-white/30 to-transparent mb-4"></div>
                  <button className={`w-full py-2 rounded-lg bg-gradient-to-r ${feature.color} text-black font-medium`}>
                    Learn More
                  </button>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"></div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Bottom call-to-action */}
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <button className="px-8 py-3 rounded-full bg-gradient-to-r from-red-400 to-fuchsia-400 text-black font-bold text-lg hover:from-fuchsia-400 hover:to-red-400 transition-all duration-300 transform hover:scale-105">
            Start Creating Today
          </button>
        </motion.div>
      </div>
    </div>
    <div className="h-40 bg-gradient-to-b from-purple-950 to-black opacity-80 "></div>
    <LampComponent />

    </div>
    </>
  );
}
