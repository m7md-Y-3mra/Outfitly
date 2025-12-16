import { createPrompt } from '@/modules/AI-generator/ai.utils';
import { generateAIOutfit } from '@/modules/AI-generator/generator.service'
import { IItemsForAI, IUserRequirements } from '@/modules/AI-generator/types/generator.types';



export const ITEMS_FOR_AI_DUMMY: IItemsForAI[] = [
  {

    id: '1',
    name: "White Cotton T-Shirt",
    color: "White",
    notes: "Basic, fits slightly oversized.",
    season: "Summer",
    images: "https://picsum.photos/seed/tshirt/600/800",
  },
  {
    id: '2',
    name: "Light Blue Denim Jeans",
    color: "Light Blue",
    notes: "Straight fit, comfortable for daily wear.",
    season: "All",
    images: "https://picsum.photos/seed/jeans/600/800",
  },
  {
    id: '3',
    name: "Black Sneakers",
    color: "Black",
    notes: "Everyday sneakers, clean look.",
    season: "All",
    images: "https://picsum.photos/seed/sneakers/600/800",
  },
  {
    id: '4',
    name: "Beige Hoodie",
    color: "Beige",
    notes: "Warm hoodie, good for layering.",
    season: "Winter",
    images: "https://picsum.photos/seed/hoodie/600/800",
  },
  {
    id: '5',
    name: "Olive Bomber Jacket",
    color: "Olive",
    notes: "Light jacket, perfect for spring evenings.",
    season: "Spring",
    images: "https://picsum.photos/seed/jacket/600/800",
  },
  {
    id: '6',
    name: "Brown Leather Belt",
    color: "Brown",
    notes: "Simple classic belt.",
    season: "All",
    images: "https://picsum.photos/seed/belt/600/800",
  },
];


export const ALL_OCCASIONS_DUMMY = [
  {
    id: "occ_01",
    name: "Casual Day Out",
    description: "Relaxed everyday outfits suitable for errands or meeting friends.",
  },
  {
    id: "occ_02",
    name: "Work / Office",
    description: "Professional and clean outfits appropriate for office environments.",
  },
  {
    id: "occ_03",
    name: "Formal Event",
    description: "Elegant outfits for weddings, ceremonies, or formal gatherings.",
  },
  {
    id: "occ_04",
    name: "Sport & Activity",
    description: "Comfortable and functional outfits for workouts or outdoor activities.",
  },
  {
    id: "occ_05",
    name: "Evening / Night Out",
    description: "Stylish outfits suitable for dinners, parties, or night outings.",
  },
  {
    id: "occ_06",
    name: "Travel",
    description: "Comfort-first outfits ideal for long trips or commuting.",
  },
  {
    id: "occ_07",
    name: "Beach / Summer",
    description: "Light and breathable outfits for hot weather and beach days.",
  },
  {
    id: "occ_08",
    name: "Winter / Cold Weather",
    description: "Warm layered outfits designed for cold temperatures.",
  },
];

const dummyUserReq: IUserRequirements = {
  occasion: "Casual Hangout",
  weather: "Sunny & Warm",
  style: "CASUAL",
  requirments: "Light colors, comfortable shoes",
};

const AIGenerator = async() => {
    // const prompt= createPrompt(ITEMS_FOR_AI_DUMMY, ALL_OCCASIONS_DUMMY, dummyUserReq)
    // const content = await generateAIOutfit(prompt)
    // console.log(JSON.parse(content));
  return (
    <div>Test</div>
  )
}

export default AIGenerator