'use client'
import { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./navbar-menu";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { PlaceholdersAndVanishInput } from "./placeholders-and-vanish-input";


function Navbar({ className }: { className?: string }) {
    const [active, setActive] = useState<string | null>(null);
    const placeholders = [
        "What's the first rule of Fight Club?",
        "Who is Tyler Durden?",
        "Where is Andrew Laeddis Hiding?",
        "Write a Javascript method to reverse a string",
        "How to assemble your own PC?",
      ];
   
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
      };
      const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("submitted");
      };
    return (
        <div className={cn("fixed top-10 inset-x-0 max-w-4xl mx-auto z-50", className)}>

        <Menu setActive={setActive}>
            <PlaceholdersAndVanishInput
                    placeholders={placeholders}
                    onChange={handleChange}
                    onSubmit={onSubmit}
            />
          <nav className="flex items-center gap-4 mr-6">
            <MenuItem setActive={setActive} active={active} item="Services">
              <div className="flex flex-col space-y-4 text-sm">
                <HoveredLink href="/web-dev">Web Development</HoveredLink>
                <HoveredLink href="/interface-design">Interface Design</HoveredLink>
                <HoveredLink href="/seo">Search Engine Optimization</HoveredLink>
                <HoveredLink href="/branding">Branding</HoveredLink>
              </div>
            </MenuItem>
            <MenuItem setActive={setActive} active={active} item="Products">
              <div className="text-sm grid grid-cols-2 gap-10 p-4">
                <ProductItem
                  title="Packs"
                  href="https://algochurn.com"
                  src="https://res.cloudinary.com/demgnq2iy/image/upload/v1741435583/photo-collage.png_uotkdp.png"
                  description="Generate your photos from pre-tuned Packs"
                />
                <ProductItem
                  title="Generate"
                  href="https://tailwindmasterkit.com"
                  src="https://res.cloudinary.com/demgnq2iy/image/upload/v1741382744/luxury_dpjlo8.jpg"
                  description="Generate images from your own Prompts"
                />
                <ProductItem
                  title="Train"
                  href="https://gomoonbeam.com"
                  src="https://res.cloudinary.com/demgnq2iy/image/upload/v1741412221/adventure_gz1rzd.jpg"
                  description="Train your own face on AI to generate hyper-realistic photos"
                />
              </div>
            </MenuItem>
            <MenuItem setActive={setActive} active={active} item="Pricing">
              <div className="flex flex-col space-y-4 text-sm">
                <HoveredLink href="/hobby">Hobby</HoveredLink>
                <HoveredLink href="/individual">Individual</HoveredLink>
                <HoveredLink href="/team">Team</HoveredLink>
                <HoveredLink href="/enterprise">Enterprise</HoveredLink>
              </div>
            </MenuItem>

          </nav>
        </Menu>
      </div>
    );
  }
  export default Navbar;
