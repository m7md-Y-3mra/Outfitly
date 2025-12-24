import { WardrobeStyle } from '@/app/generated/prisma/enums';
import prisma from '@/lib/prisma';


async function main() {
  console.log('🧹 Deleting all existing data...');

  // Order matters because of foreign keys!
  const tables = [
    'OutfitItem',
    'WardrobeItemImage',
    'WardrobeItem',
    'Outfit',
    '_FavoriteOutfits',
    '_LikedOutfits',
    'CartItem',
    'OrderItem',
    'Transaction',
    'Order',
    'ProductReview',
    'ProductImage',
    'ProductVariant',
    'Product',
    'UserAddress',
    'ProductColor',
    'Occasion',
    'Category',
    'Brand',
    'User',
  ];

  for (const table of tables) {
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE "${table}" RESTART IDENTITY CASCADE;`);
    console.log(`   Cleared ${table}`);
  }

  console.log('✅ Database wiped clean! Starting fresh seed...\n');

  // ==============================================================
  // 1. Brands, Categories, Colors, Occasions
  // ==============================================================
  await prisma.brand.createMany({
    data: [
      { id: 'b_nike', name: 'Nike', slug: 'nike' },
      { id: 'b_adidas', name: 'Adidas', slug: 'adidas' },
      { id: 'b_zara', name: 'Zara', slug: 'zara' },
      { id: 'b_hm', name: 'H&M', slug: 'hm' },
      { id: 'b_levis', name: "Levi's", slug: 'levis' },
      { id: 'b_uniqlo', name: 'Uniqlo', slug: 'uniqlo' },
      { id: 'b_mango', name: 'Mango', slug: 'mango' },
      { id: 'b_cos', name: 'COS', slug: 'cos' },
    ],
    skipDuplicates: true,
  });

  await prisma.category.createMany({
    data: [
      { id: 'c_tshirt', name: 'T-Shirts', slug: 't-shirts' },
      { id: 'c_shirt', name: 'Shirts', slug: 'shirts' },
      { id: 'c_jeans', name: 'Jeans', slug: 'jeans' },
      { id: 'c_pants', name: 'Pants', slug: 'pants' },
      { id: 'c_jacket', name: 'Jackets', slug: 'jackets' },
      { id: 'c_coat', name: 'Coats', slug: 'coats' },
      { id: 'c_hoodie', name: 'Hoodies', slug: 'hoodies' },
      { id: 'c_sneakers', name: 'Sneakers', slug: 'sneakers' },
      { id: 'c_boots', name: 'Boots', slug: 'boots' },
      { id: 'c_dress', name: 'Dresses', slug: 'dresses' },
    ],
    skipDuplicates: true,
  });

  await prisma.productColor.createMany({
    data: [
      { id: 'col_black', name: 'Black', hexCode: '#000000' },
      { id: 'col_white', name: 'White', hexCode: '#FFFFFF' },
      { id: 'col_navy', name: 'Navy', hexCode: '#1e3a8a' },
      { id: 'col_gray', name: 'Gray', hexCode: '#6b7280' },
      { id: 'col_beige', name: 'Beige', hexCode: '#f5f5dc' },
    ],
    skipDuplicates: true,
  });

  await prisma.occasion.createMany({
    data: [
      { id: 'occ_casual', name: 'Casual' },
      { id: 'occ_office', name: 'Office' },
      { id: 'occ_date', name: 'Date Night' },
      { id: 'occ_winter', name: 'Winter' },
    ],
    skipDuplicates: true,
  });

  // ==============================================================
  // 2. Users
  // ==============================================================
  await prisma.user.createMany({
    data: [
      { id: 'u_emma', fullName: 'Emma Wilson', email: 'emma@example.com', password: 'hashed', emailVerified: true },
      { id: 'u_liam', fullName: 'Liam Chen', email: 'liam@example.com', password: 'hashed', emailVerified: true },
      { id: 'u_ava', fullName: 'Ava Martinez', email: 'ava@example.com', password: 'hashed', emailVerified: true },
      { id: 'u_sophia', fullName: 'Sophia Patel', email: 'sophia@example.com', password: 'hashed', emailVerified: true },
      { id: 'u_noah', fullName: 'Noah Kim', email: 'noah@example.com', password: 'hashed', emailVerified: true },
      { fullName: 'Moamen Yazouri', email: 'moamen@admin.com', password: '$argon2id$v=19$m=65536,t=3,p=4$j4bzKPpwk0Tt9OAf2trQ4Q$aisWdvJ6pDc2+TO8VAxacpeoD/P/WVY0SSfVj6DL074', emailVerified: true, role: 'ADMIN' },
    ],
    skipDuplicates: true,
  });

  // ==============================================================
  // 3. Products + Variants
  // ==============================================================
  await prisma.product.createMany({
    data: [
      { id: 'p_nike_af1', name: 'Nike Air Force 1', slug: 'nike-air-force-1', basePrice: 109.99, brandId: 'b_nike', categoryId: 'c_sneakers' },
      { id: 'p_levis_501', name: "Levi's 501", slug: 'levis-501', basePrice: 69.5, brandId: 'b_levis', categoryId: 'c_jeans' },
      { id: 'p_zara_blazer', name: 'Zara Oversized Blazer', slug: 'zara-oversized-blazer', basePrice: 89.9, brandId: 'b_zara', categoryId: 'c_jacket' },
      { id: 'p_uniqlo_tee', name: 'Uniqlo AIRism Tee', slug: 'uniqlo-airism-tee', basePrice: 19.9, brandId: 'b_uniqlo', categoryId: 'c_tshirt' },
    ],
    skipDuplicates: true,
  });

  await prisma.productVariant.createMany({
    data: [
      { id: 'var_nike_1', sku: 'NK-AF1-WHT-40', size: '40', colorId: 'col_white', quantity: 20, productId: 'p_nike_af1' },
      { id: 'var_nike_2', sku: 'NK-AF1-WHT-42', size: '42', colorId: 'col_white', quantity: 15, productId: 'p_nike_af1' },
      { id: 'var_levis_1', sku: 'LV501-32', size: '32', colorId: 'col_navy', quantity: 30, productId: 'p_levis_501' },
      { id: 'var_zara_1', sku: 'ZARA-BLAZER-M', size: 'M', colorId: 'col_black', quantity: 12, productId: 'p_zara_blazer' },
      { id: 'var_uniqlo_1', sku: 'UNIQLO-TEE-L', size: 'L', colorId: 'col_white', quantity: 50, productId: 'p_uniqlo_tee' },
    ],
    skipDuplicates: true,
  });

  const validVariantIds = ['var_nike_1', 'var_nike_2', 'var_levis_1', 'var_zara_1', 'var_uniqlo_1'];

  // ==============================================================
  // 4. WARDROBE ITEMS – 156+ items
  // ==============================================================
  const wardrobeItems = [];
  const users = ['u_emma', 'u_liam', 'u_ava', 'u_sophia', 'u_noah'];
  const itemNames = ['Oversized Blazer', 'Mom Jeans', 'White Sneakers', 'Black Leather Jacket', 'Linen Shirt', 'Knit Sweater', 'Denim Jacket', 'Midi Dress', 'Hoodie', 'Trench Coat', 'Crop Top', 'Cargo Pants', 'Ankle Boots'];
  const brands = ['Zara', 'H&M', 'Uniqlo', 'Mango', 'COS', 'Nike', "Levi's"];
  const colors = ['Black', 'White', 'Beige', 'Navy', 'Gray', 'Olive'];
  const sizes = ['XS', 'S', 'M', 'L', '38', '39', '40', '41', '42'];
  const seasons = ['all-year', 'spring,summer', 'fall,winter'];
  const styles: WardrobeStyle[] = [
    WardrobeStyle.CASUAL,
    WardrobeStyle.FORMAL,
    WardrobeStyle.WORK,
    WardrobeStyle.SPORTY,
    WardrobeStyle.STREETWEAR,
    WardrobeStyle.LOUNGEWEAR,
    WardrobeStyle.PARTY,
  ];
  const catgs = await prisma.category.findMany();
  const Categories = catgs.map(c => c.id);

  for (let i = 0; i < 156; i++) {
    const isPurchased = Math.random() > 0.75;
    const variantId = isPurchased ? validVariantIds[Math.floor(Math.random() * validVariantIds.length)] : null;

    wardrobeItems.push({
      id: `ward_${String(i + 1).padStart(3, '0')}`,
      userId: users[Math.floor(Math.random() * users.length)],
      categoryId: Categories[Math.floor(Math.random() * Categories.length)], // FIXED: was using users.length
      variantId,
      name: itemNames[Math.floor(Math.random() * itemNames.length)],
      brand: brands[Math.floor(Math.random() * brands.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
      size: sizes[Math.floor(Math.random() * sizes.length)],
      season: seasons[Math.floor(Math.random() * seasons.length)],
      style: styles[Math.floor(Math.random() * styles.length)], // ADDED: required field
      notes: Math.random() > 0.8 ? 'My favorite!' : '',
      source: isPurchased ? 'purchased' : Math.random() > 0.8 ? 'ai-suggested' : 'manual',
      purchasedDate: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
    });
  }

  await prisma.wardrobeItem.createMany({
    data: wardrobeItems,
    skipDuplicates: true,
  });

  // ==============================================================
  // 5. Images for wardrobe items
  // ==============================================================
  const imageUrls = [
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
    'https://images.unsplash.com/photo-1542272604-787c3835535d',
    'https://images.unsplash.com/photo-1551028719-00167b16eac5',
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab',
    'https://images.unsplash.com/photo-1515886657613-9f3519b39692',
    'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126',
    'https://images.unsplash.com/photo-1590338692112-3d65e2b25890',
    'https://images.unsplash.com/photo-1505022610485-0249ba5b3675',
  ];

  const wardrobeIds = wardrobeItems.map(w => w.id);
  const imagesToInsert = [];

  for (const wid of wardrobeIds) {
    const count = Math.random() > 0.6 ? 2 : 1;
    for (let j = 0; j < count; j++) {
      imagesToInsert.push({
        wardrobeItemId: wid,
        imageUrl: imageUrls[Math.floor(Math.random() * imageUrls.length)] + '?auto=format&fit=crop&w=800',
        altText: 'Wardrobe item',
        isPrimary: j === 0,
        displayOrder: j,
      });
    }
  }

  await prisma.wardrobeItemImage.createMany({
    data: imagesToInsert,
    skipDuplicates: true,
  });

  // ==============================================================
  // 6. Sample outfits
  // ==============================================================
  await prisma.outfit.createMany({
    data: [
      {
        id: 'outfit_01',
        name: 'Smart Casual Friday',
        description: 'Perfect office look',
        imageUrl: 'https://images.unsplash.com/photo-1505022610485-0249ba5b3675',
        visibility: 'public',
        userId: 'u_ava',
        occasionId: 'occ_office',
      },
      {
        id: 'outfit_02',
        name: 'Date Night',
        description: 'Elegant and chic',
        imageUrl: 'https://images.unsplash.com/photo-1534030347209-467a33b1e9b7',
        visibility: 'private',
        userId: 'u_emma',
        occasionId: 'occ_date',
      },
      {
        id: 'outfit_03',
        name: 'Weekend Casual',
        description: 'Comfortable and stylish',
        imageUrl: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126',
        visibility: 'public',
        userId: 'u_liam',
        occasionId: 'occ_casual',
      },
    ],
    skipDuplicates: true,
  });

  // ==============================================================
  // 7. OutfitItems - Connect outfits with wardrobe items
  // ==============================================================
  // Get wardrobe items for each user who has outfits
  const avaItems = wardrobeItems.filter(w => w.userId === 'u_ava').slice(0, 4);
  const emmaItems = wardrobeItems.filter(w => w.userId === 'u_emma').slice(0, 3);
  const liamItems = wardrobeItems.filter(w => w.userId === 'u_liam').slice(0, 3);

  const outfitItemsData = [
    // Outfit 01 - Ava's Smart Casual Friday
    ...avaItems.map((item, idx) => ({
      id: `oi_01_${idx}`,
      outfitId: 'outfit_01',
      wardrobeItemId: item.id,
    })),
    // Outfit 02 - Emma's Date Night
    ...emmaItems.map((item, idx) => ({
      id: `oi_02_${idx}`,
      outfitId: 'outfit_02',
      wardrobeItemId: item.id,
    })),
    // Outfit 03 - Liam's Weekend Casual
    ...liamItems.map((item, idx) => ({
      id: `oi_03_${idx}`,
      outfitId: 'outfit_03',
      wardrobeItemId: item.id,
    })),
  ];

  await prisma.outfitItem.createMany({
    data: outfitItemsData,
    skipDuplicates: true,
  });

  console.log('\n✅ SEED COMPLETED SUCCESSFULLY!');
  console.log(`📦 Created:`);
  console.log(`   - 156 wardrobe items with images`);
  console.log(`   - 3 outfits with ${outfitItemsData.length} outfit items`);
  console.log(`   - 5 products with variants`);
  console.log(`   - 6 users (including admin)`);
  console.log(`   - All supporting data (brands, categories, colors, occasions)`);
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });