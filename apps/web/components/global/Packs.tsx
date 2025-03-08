import { PackCard } from "../ui/pack-cards";


export function Packs () {
    return <>
    <div>
        Pack It UPPP!!
    </div>
    <div className="flex flex-col-5 gap-4">
        <PackCard 
        imgsrc="https://res.cloudinary.com/demgnq2iy/image/upload/v1741382744/luxury_dpjlo8.jpg" 
        heading="Luxury Lifestyle Pack."
        subHeading="Create luxurious photos of yourselves, Show off philanthropy"
        />
        <PackCard 
        imgsrc="https://res.cloudinary.com/demgnq2iy/image/upload/v1741383598/valentins_a2jysp.jpg" 
        heading="Valentine's Day Pack."
        subHeading="Be Valentine's ready, create awesome photos of yourselves in valentines day theme"
        />
        <PackCard 
        imgsrc="https://res.cloudinary.com/demgnq2iy/image/upload/v1741412221/adventure_gz1rzd.jpg" 
        heading="Adventurous Vacation Pack."
        subHeading="Create Adventurous photos of yourselves, Exploring the beauty of nature"
        />
    </div>
    
    </>
}