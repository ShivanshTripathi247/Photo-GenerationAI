import { Button } from "@/components/ui/button";
import Navbar from "@/components/ui/navbar";
import { WavyBackground } from "@/components/ui/wavy-background";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";




export default function Home() {
  return (<>
    <div className="relative item-center justify-center flex text-white h-screen bg-black">
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

      <WavyBackground className="max-w-4xl mx-auto pb-40 items-center justify-center flex flex-col mt-20">
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
      
    </WavyBackground>
    
    </div>
    </>
  );
}
