import { Button } from "@/components/ui/button";
import Navbar from "@/components/ui/navbar";
import { WavyBackground } from "@/components/ui/wavy-background";




export default function Home() {
  return (
    <div className="item-center justify-center flex text-white h-screen bg-black">
      <Navbar className="top-2" />
      <WavyBackground className="max-w-4xl mx-auto pb-40 items-center justify-center flex flex-col">
      <p className="text-2xl md:text-4xl lg:text-7xl  font-bold inter-var text-center 
      bg-gradient-to-r from-red-400 to-fuchsia-100 bg-clip-text text-transparent">
        Welcome To PhotoGen-AI.
      </p>

      <p className="text-base md:text-lg mt-4 text-white font-normal inter-var text-center">
        Leverage the power of AI to generate you-specific Photos
      </p>
      <Button className="mt-10 bg-red-300 hover:fuchsia-200">
        View our Plans
      </Button>
      
    </WavyBackground>
    
    </div>

  );
}
