/* eslint-disable @typescript-eslint/no-explicit-any */
import { WardrobeStyle } from "@/app/generated/prisma/enums";
import prisma from "@/lib/prisma";

/**
 * =========================
 * Config (scale it)
 * =========================
 */
const CFG = {
  ITEMS_PER_USER: 30,
  OUTFITS_PER_USER: 250,

  MIN_IMAGES_PER_ITEM: 1,
  MAX_IMAGES_PER_ITEM: 3,

  MIN_ITEMS_PER_OUTFIT: 3,
  MAX_ITEMS_PER_OUTFIT: 7,

  PUBLIC_RATIO: 0.7,
  PURCHASED_RATIO: 0.35, // only affects `source` now (variantId is always null)
  NOTES_RATIO: 0.15,

  BATCH_SIZE: 500,
};

/**
 * =========================
 * Shared hashed password
 * =========================
 */
const HASHED_PASSWORD =
  "$argon2id$v=19$m=65536,t=3,p=4$j4bzKPpwk0Tt9OAf2trQ4Q$aisWdvJ6pDc2+TO8VAxacpeoD/P/WVY0SSfVj6DL074";

/**
 * =========================
 * Static pools
 * =========================
 */
const IMAGE_URLS = [
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  "https://images.unsplash.com/photo-1542272604-787c3835535d",
  "https://images.unsplash.com/photo-1551028719-00167b16eac5",
  "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
  "https://images.unsplash.com/photo-1515886657613-9f3519b39692",
  "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126",
  "https://images.unsplash.com/photo-1590338692112-3d65e2b25890",
  "https://images.unsplash.com/photo-1505022610485-0249ba5b3675",
];

const ITEM_TYPES = [
  "T-Shirt",
  "Shirt",
  "Jeans",
  "Pants",
  "Jacket",
  "Coat",
  "Hoodie",
  "Sneakers",
  "Boots",
  "Dress",
  "Sweater",
  "Blazer",
  "Skirt",
  "Shorts",
];

const ADJECTIVES = [
  "Classic",
  "Oversized",
  "Slim Fit",
  "Relaxed",
  "Vintage",
  "Minimal",
  "Sport",
  "Street",
  "Formal",
  "Casual",
  "Premium",
  "Everyday",
];

const BRANDS = ["Zara", "H&M", "Uniqlo", "Mango", "COS", "Nike", "Adidas", "Levi's"];
const COLORS = ["Black", "White", "Beige", "Navy", "Gray", "Olive", "Brown", "Cream", "Blue"];
const SIZES = ["XS", "S", "M", "L", "XL", "38", "39", "40", "41", "42", "43"];
const SEASONS = ["all-year", "spring,summer", "fall,winter"];

const STYLES: WardrobeStyle[] = [
  WardrobeStyle.CASUAL,
  WardrobeStyle.FORMAL,
  WardrobeStyle.WORK,
  WardrobeStyle.SPORTY,
  WardrobeStyle.STREETWEAR,
  WardrobeStyle.LOUNGEWEAR,
  WardrobeStyle.PARTY,
];

/**
 * =========================
 * Helpers
 * =========================
 */
function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function pick<T>(arr: T[]) {
  return arr[randInt(0, arr.length - 1)];
}
function pickManyUnique<T>(arr: T[], count: number) {
  const n = Math.min(count, arr.length);
  const set = new Set<T>();
  while (set.size < n) set.add(pick(arr));
  return [...set];
}
function chunk<T>(arr: T[], size: number) {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}
function randomDateInLastYears(years = 2) {
  const now = new Date();
  const start = new Date();
  start.setFullYear(now.getFullYear() - years);
  const t = start.getTime() + Math.random() * (now.getTime() - start.getTime());
  return new Date(t);
}
function img(url: string) {
  return `${url}?auto=format&fit=crop&w=900`;
}

/**
 * =========================
 * 1) Wipe ONLY outfit/wardrobe related tables
 * =========================
 */
async function wipeDB() {
  console.log("🧹 Deleting outfit/wardrobe related data...");

  // Order matters because of FKs
  const tables = [
    "OutfitItem",
    "WardrobeItemImage",
    "WardrobeItem",
    "Outfit",
    "_FavoriteOutfits",
    "_LikedOutfits",
    "Occasion",
    "Category",
    "Brand",
    "User",
  ];

  for (const table of tables) {
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE "${table}" RESTART IDENTITY CASCADE;`);
    console.log(`   Cleared ${table}`);
  }

  console.log("✅ Wipe done!\n");
}

/**
 * =========================
 * 2) Lookups (Brands/Categories/Occasions)
 * =========================
 */
async function seedLookups() {
  await prisma.brand.createMany({
    data: [
      { id: "b_nike", name: "Nike", slug: "nike" },
      { id: "b_adidas", name: "Adidas", slug: "adidas" },
      { id: "b_zara", name: "Zara", slug: "zara" },
      { id: "b_hm", name: "H&M", slug: "hm" },
      { id: "b_levis", name: "Levi's", slug: "levis" },
      { id: "b_uniqlo", name: "Uniqlo", slug: "uniqlo" },
      { id: "b_mango", name: "Mango", slug: "mango" },
      { id: "b_cos", name: "COS", slug: "cos" },
    ],
    skipDuplicates: true,
  });

  await prisma.category.createMany({
    data: [
      { id: "c_tshirt", name: "T-Shirts", slug: "t-shirts" },
      { id: "c_shirt", name: "Shirts", slug: "shirts" },
      { id: "c_jeans", name: "Jeans", slug: "jeans" },
      { id: "c_pants", name: "Pants", slug: "pants" },
      { id: "c_jacket", name: "Jackets", slug: "jackets" },
      { id: "c_coat", name: "Coats", slug: "coats" },
      { id: "c_hoodie", name: "Hoodies", slug: "hoodies" },
      { id: "c_sneakers", name: "Sneakers", slug: "sneakers" },
      { id: "c_boots", name: "Boots", slug: "boots" },
      { id: "c_dress", name: "Dresses", slug: "dresses" },
    ],
    skipDuplicates: true,
  });

  await prisma.occasion.createMany({
    data: [
      { id: "occ_casual", name: "Casual" },
      { id: "occ_office", name: "Office" },
      { id: "occ_date", name: "Date Night" },
      { id: "occ_winter", name: "Winter" },
    ],
    skipDuplicates: true,
  });

  console.log("✅ Seeded lookups");
}

/**
 * =========================
 * 3) Users (ALL same hashed pass as Moamen)
 * =========================
 */
async function seedUsers() {
  await prisma.user.createMany({
    data: [
      { id: "u_emma", fullName: "Emma Wilson", email: "emma@example.com", password: HASHED_PASSWORD, emailVerified: true },
      { id: "u_liam", fullName: "Liam Chen", email: "liam@example.com", password: HASHED_PASSWORD, emailVerified: true },
      { id: "u_ava", fullName: "Ava Martinez", email: "ava@example.com", password: HASHED_PASSWORD, emailVerified: true },
      { id: "u_sophia", fullName: "Sophia Patel", email: "sophia@example.com", password: HASHED_PASSWORD, emailVerified: true },
      { id: "u_noah", fullName: "Noah Kim", email: "noah@example.com", password: HASHED_PASSWORD, emailVerified: true },
      { id: "u_moamen", fullName: "Moamen Yazouri", email: "moamen@admin.com", password: HASHED_PASSWORD, emailVerified: true, role: "ADMIN" },
    ],
    skipDuplicates: true,
  });

  console.log("✅ Seeded users (same password)");
}

/**
 * =========================
 * 4) HUGE per-user wardrobe + outfits
 * =========================
 */
async function seedHugePerUser() {
  const [categoryIds, occasionIds] = await Promise.all([
    prisma.category.findMany({ select: { id: true } }).then((x) => x.map((c) => c.id)),
    prisma.occasion.findMany({ select: { id: true } }).then((x) => x.map((o) => o.id)),
  ]);

  const users = await prisma.user.findMany({
    where: { role: { not: "ADMIN" } },
    select: { id: true, fullName: true },
  });

  let totalWardrobe = 0;
  let totalImages = 0;
  let totalOutfits = 0;
  let totalOutfitItems = 0;

  for (const user of users) {
    console.log(`\n👤 Seeding huge data for ${user.fullName} (${user.id})`);

    // A) Wardrobe items
    const wardrobeIds: string[] = [];
    const wardrobeRows: any[] = [];

    for (let i = 0; i < CFG.ITEMS_PER_USER; i++) {
      const wid = `ward_${user.id}_${String(i + 1).padStart(5, "0")}`;
      wardrobeIds.push(wid);

      const isPurchased = Math.random() < CFG.PURCHASED_RATIO;

      wardrobeRows.push({
        id: wid,
        userId: user.id,
        categoryId: pick(categoryIds),

        // ✅ No e-commerce relations:
        variantId: null,

        name: `${pick(ADJECTIVES)} ${pick(ITEM_TYPES)}`,
        brand: pick(BRANDS),
        color: pick(COLORS),
        size: pick(SIZES),
        season: pick(SEASONS),
        style: pick(STYLES),

        notes: Math.random() < CFG.NOTES_RATIO ? "Great fit, keep it." : "",
        source: isPurchased ? "purchased" : Math.random() > 0.85 ? "ai-suggested" : "manual",

        // ✅ Your schema requires purchasedDate → always provide it
        purchasedDate: randomDateInLastYears(2),
      });
    }

    for (const part of chunk(wardrobeRows, CFG.BATCH_SIZE)) {
      await prisma.wardrobeItem.createMany({ data: part, skipDuplicates: true });
      totalWardrobe += part.length;
    }

    // B) Wardrobe images
    const imagesRows: any[] = [];
    for (const wid of wardrobeIds) {
      const count = randInt(CFG.MIN_IMAGES_PER_ITEM, CFG.MAX_IMAGES_PER_ITEM);
      for (let j = 0; j < count; j++) {
        imagesRows.push({
          wardrobeItemId: wid,
          imageUrl: img(pick(IMAGE_URLS)),
          altText: "Wardrobe item",
          isPrimary: j === 0,
          displayOrder: j,
        });
      }
    }

    for (const part of chunk(imagesRows, CFG.BATCH_SIZE)) {
      await prisma.wardrobeItemImage.createMany({ data: part, skipDuplicates: true });
      totalImages += part.length;
    }

    // C) Outfits
    const outfitIds: string[] = [];
    const outfitsRows: any[] = [];

    for (let i = 0; i < CFG.OUTFITS_PER_USER; i++) {
      const oid = `out_${user.id}_${String(i + 1).padStart(5, "0")}`;
      outfitIds.push(oid);

      outfitsRows.push({
        id: oid,
        name: `${pick(["Daily", "Smart", "Weekend", "Office", "Night", "Street"])} Look #${i + 1}`,
        description: `Generated outfit for load testing.`,
        imageUrl: img(pick(IMAGE_URLS)),
        visibility: Math.random() < CFG.PUBLIC_RATIO ? "public" : "private",
        userId: user.id,
        occasionId: pick(occasionIds),
      });
    }

    for (const part of chunk(outfitsRows, CFG.BATCH_SIZE)) {
      await prisma.outfit.createMany({ data: part, skipDuplicates: true });
      totalOutfits += part.length;
    }

    // D) OutfitItems
    const outfitItemsRows: any[] = [];
    let oiCounter = 0;

    for (const oid of outfitIds) {
      const count = randInt(CFG.MIN_ITEMS_PER_OUTFIT, CFG.MAX_ITEMS_PER_OUTFIT);
      const selectedWardrobe = pickManyUnique(wardrobeIds, count);

      for (const wid of selectedWardrobe) {
        oiCounter++;
        outfitItemsRows.push({
          id: `oi_${user.id}_${String(oiCounter).padStart(7, "0")}`,
          outfitId: oid,
          wardrobeItemId: wid,
        });
      }
    }

    for (const part of chunk(outfitItemsRows, CFG.BATCH_SIZE)) {
      await prisma.outfitItem.createMany({ data: part, skipDuplicates: true });
      totalOutfitItems += part.length;
    }

    console.log(`✅ Done ${user.fullName}: wardrobe=${CFG.ITEMS_PER_USER}, outfits=${CFG.OUTFITS_PER_USER}`);
  }

  console.log("\n📦 HUGE SEED SUMMARY");
  console.log(`   - Wardrobe Items: ${totalWardrobe}`);
  console.log(`   - Wardrobe Images: ${totalImages}`);
  console.log(`   - Outfits: ${totalOutfits}`);
  console.log(`   - Outfit Items: ${totalOutfitItems}`);
}

/**
 * =========================
 * Main
 * =========================
 */
async function main() {
  await wipeDB();

  await seedLookups();
  await seedUsers();

  await seedHugePerUser();

  console.log("\n✅ SEED COMPLETED SUCCESSFULLY!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
