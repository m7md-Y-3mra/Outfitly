import { AllOccasions, CreateOutfitDTO } from "../outfit/types/outfit.dto";
import { AIGeneratorFormData, IGeneratedOutfit } from "./components/aiGenerator";
import { AIOutfitResponse, IItemsForAI, IUserRequirements } from "./types/generator.types";

export function createPrompt(
  wardrobeItems: IItemsForAI[],
  availableOccasions: AllOccasions[],
  userRequest: IUserRequirements,
): string {
  const occasionsJson = JSON.stringify(availableOccasions, null, 2);
  const itemsJson = JSON.stringify(wardrobeItems, null, 2);

  const userRequestJson = JSON.stringify(
    {
      weather: userRequest.weather,
      style: userRequest.style,
      occasion: userRequest.occasion,
      requirements: userRequest.requirments,
    },
    null,
    2,
  );

  return `
You are a specialized AI stylist.

Your sole function is to read USER_REQUEST, select items ONLY from ALL_WARDROBE_ITEMS, and respond ONLY with valid JSON.

### CRITICAL CONSTRAINTS:
1) STRICT JSON ONLY: Output MUST be valid JSON (no markdown, no text).
2) OUTPUT SHAPE:
   - Return ONE outfit object if you can only make 1 strong outfit.
   - Return an ARRAY of outfit objects (2 to 3 outfits) if you can make multiple good options.
3) EACH OUTFIT MUST:
   - Include at least 2 items.
   - Use wardrobeItemIds that contain ONLY existing IDs from ALL_WARDROBE_ITEMS.
4) If returning an array: do NOT repeat the same wardrobeItemIds combination.
5) Occasion Logic:
   - If the occasion matches one in AVAILABLE_OCCASIONS, use { "id": "..." }.
   - Otherwise, use { "name": "...", "description": "..." }.
6) STYLE RULE:
   - Always include "style" in each outfit. Use USER_REQUEST.style unless you have a strong reason to refine it.

### IMAGE URL RULES (MANDATORY):
7) imageUrl is REQUIRED for each outfit (must NOT be null).
8) imageUrl MUST be selected ONLY from the images of the wardrobe items used in wardrobeItemIds.
   - That means the chosen imageUrl MUST exactly match one of the image URLs found under
     ALL_WARDROBE_ITEMS where item.id is included in wardrobeItemIds.
   - NEVER invent an imageUrl and NEVER use an external URL.
9) Choose the MOST REPRESENTATIVE image for the outfit:
   - Prefer the image of the "Top" or "Outerwear" item if such an item exists in the selected items.
   - If multiple candidates exist, choose the clearest front-view product image.
   - If no top/outerwear is clearly identifiable, choose the first available image among the selected items.
10) VALIDATION CHECK (before responding):
   - If imageUrl is not found in the images of the selected wardrobe items, your output is INVALID.
   - Fix it before responding.

### AIOutfitResponse JSON SCHEMA (EACH OUTFIT OBJECT MUST MATCH THIS):
{
  "title": "AIOutfitResponse",
  "type": "object",
  "properties": {
    "name": { "type": "string" },
    "description": { "type": "string", "nullable": true },

    "imageUrl": { "type": "string" },  // REQUIRED & must come from selected items' images

    "style": { "type": "string" },

    "occasion": {
      "anyOf": [
        { "type": "object", "properties": { "id": { "type": "string" } }, "required": ["id"] },
        { "type": "object", "properties": { "name": { "type": "string" }, "description": { "type": "string", "nullable": true } }, "required": ["name"] }
      ],
      "nullable": true
    },

    "wardrobeItemIds": { "type": "array", "items": { "type": "string" }, "minItems": 2 }
  },
  "required": ["name", "style", "wardrobeItemIds", "imageUrl"]
}

### FINAL OUTPUT MUST BE EITHER:
- ONE AIOutfitResponse object
OR
- An array of AIOutfitResponse objects (length 2 to 3)

---

### INPUT DATA

AVAILABLE_OCCASIONS:
${occasionsJson}

ALL_WARDROBE_ITEMS:
${itemsJson}

USER_REQUEST (JSON):
${userRequestJson}
`.trim();
}

export function transformAIResponse(ai: AIOutfitResponse, userId: string): CreateOutfitDTO {
  return {
    name: ai.name,
    description: ai.description ?? null,
    imageUrl: ai.imageUrl ?? null,
    isAiGenerated: true,
    visibility: "public",
    user: { connect: { id: userId } },

    occasion: ai.occasion
      ? "id" in ai.occasion
        ? { connect: { id: ai.occasion.id } }
        : { create: ai.occasion }
      : undefined,

    items:
      ai.wardrobeItemIds.length > 0
        ? {
            create: ai.wardrobeItemIds.map((id) => ({
              wardrobeItem: { connect: { id } },
            })),
          }
        : undefined,
  };
}

export const normalizeResponse = (text: string): AIOutfitResponse[] => {
  const cleaned = text
    .replace(/```json\s*/gi, "")
    .replace(/```\s*/g, "")
    .trim();

  const parsed = JSON.parse(cleaned) as AIOutfitResponse | AIOutfitResponse[];
  return Array.isArray(parsed) ? parsed : [parsed];
};

export const getItemsByIds = (allItems: IItemsForAI[], ids: string[]) => {
  const selectedItems = allItems.filter((item) => ids.includes(item.id));

  return selectedItems;
};

export function toUserRequirements(formData: AIGeneratorFormData): IUserRequirements {
  return {
    occasion: formData.occasion.trim(),
    weather: formData.weather.trim(),
    style: formData.style.trim(),
    requirments: formData.requirements.trim(), // mapping
  };
}

export function toGeneratedOutfits(ai: AIOutfitResponse[]): IGeneratedOutfit[] {
  return ai.map((o) => ({
    name: o.name,
    description: o.description ?? "",
    confidence: 90,
    style: o.style ?? "",
    items: o.wardrobeItemIds,
    image: o.imageUrl ?? "",
  }));
}
