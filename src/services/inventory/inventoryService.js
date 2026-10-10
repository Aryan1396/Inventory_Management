const STORAGE_KEY = 'baps_store_products_v4';

export const CATEGORIES = [
  'Clothing & Wearables',
  'Puja Items & Ritual Accessories',
  'Mandirs & Murtis',
  'Books & Publications',
  'Gifts & Accessories',
  'Prints & Photographs',
  'Wedding & Invitation Stationery',
  'Digital & Media Products',
  'Other / Special Products',
];

export const PRODUCT_STATUSES = ['Active', 'Draft', 'Archived'];

export const INITIAL_BAPS_PRODUCTS = [
  {
    id: 'BAPS-2001',
    name: 'BAPS Volunteer Uniform Kurta Suit (Punjabi Suit)',
    sku: 'BAPS-CLO-16420',
    category: 'Clothing & Wearables',
    brand: 'Swaminarayan Aksharpith',
    price: 850.00,
    status: 'Active',
    imageUrl: 'https://us.baps.store/pub/media/catalog/product/cache/3f829d3d8fb1028520840883bef73d10/1/6/16420-1_1.jpg',
    details: 'Official volunteer uniform Punjabi suit stitched with high-grade breathable cotton fabric, designed for comfort during mandir seva and devotional gatherings.',
    categoryData: {
      productType: 'Kurta Suit / Uniform',
      targetAudience: 'Women',
      fabricMaterial: 'Pure Cotton',
      availableSizes: '38, 40, 42, 44',
      availableColors: 'Off-White, Pure White',
      sizeChart: 'Regular Comfort Fit (Chest 38" - 44")',
      sleeveNeckType: 'Full Sleeve / Mandarin Collar',
      variantDetails: 'Sz-38: ₹850, Sz-40: ₹850, Sz-42: ₹890',
    },
    createdAt: '2026-10-10',
  },
  {
    id: 'BAPS-2002',
    name: 'Decorative Aarti Divi Brass Stand',
    sku: 'BAPS-PUJ-16050',
    category: 'Puja Items & Ritual Accessories',
    brand: 'Swaminarayan Aksharpith',
    price: 450.00,
    status: 'Active',
    imageUrl: 'https://us.baps.store/pub/media/catalog/product/cache/780d9d5f88c415706ac6a8a3a062edca/1/6/16050-1.jpg',
    details: 'Traditional heavy brass decorative aarti stand with carved handle and heat-resistant base, ideal for daily ghar mandir aarti and thal rituals.',
    categoryData: {
      itemType: 'Aarti Divi Stand',
      material: 'Pure Heavy Brass',
      weightVolume: '320 grams',
      numberOfPieces: '1 Piece',
      colorFragrance: 'Mirror Gold Brass Polish',
      dimensions: 'Height: 5.5 inches, Width: 4 inches',
      includedItems: '1 Aarti Divi Stand with Handle',
    },
    createdAt: '2026-10-09',
  },
  {
    id: 'BAPS-2003',
    name: 'Kesar Chandan Natural Incense Sticks (Agarbatti)',
    sku: 'BAPS-PUJ-6140',
    category: 'Puja Items & Ritual Accessories',
    brand: 'Swaminarayan Aksharpith',
    price: 120.00,
    status: 'Active',
    imageUrl: 'https://us.baps.store/pub/media/catalog/product/cache/780d9d5f88c415706ac6a8a3a062edca/i/m/img_6140.jpg',
    details: 'Slow-burning natural agarbatti hand-rolled with aromatic herbs, pure sandalwood oil, and saffron extract for morning prayer and meditation.',
    categoryData: {
      itemType: 'Incense Sticks (Agarbatti)',
      material: 'Herbal Wood Powder & Essential Oils',
      weightVolume: 'Pack of 100 sticks (200g)',
      numberOfPieces: '100 Sticks Box',
      colorFragrance: 'Kesar Chandan (Saffron Sandalwood)',
      dimensions: 'Stick Length: 9 inches',
      includedItems: '1 Sealed Box of 100 Incense Sticks',
    },
    createdAt: '2026-10-09',
  },
  {
    id: 'BAPS-2004',
    name: 'Shree Nilkanth Varni Tapomurti Sacred Idol',
    sku: 'BAPS-MAN-14169',
    category: 'Mandirs & Murtis',
    brand: 'Aksharpith Murtis',
    price: 1250.00,
    status: 'Active',
    imageUrl: 'https://us.baps.store/pub/media/catalog/product/cache/780d9d5f88c415706ac6a8a3a062edca/1/4/14169-1_1.jpg',
    details: 'Exquisitely crafted murti of Teenage Bhagwan Swaminarayan (Shree Nilkanth Varni) performing intense penance on one foot in the Himalayas.',
    categoryData: {
      productType: 'Sacred Devotional Murti',
      deityName: 'Shree Nilkanth Varni',
      materialWood: 'Panchdhatu Metal Alloy & Resin',
      finishColor: 'Antique Bronze & Golden Embellishments',
      dimensionsHWD: 'Height: 8.5", Width: 3.5", Depth: 3.0"',
      weight: '650 grams',
      mountingType: 'Tabletop or Mandir Platform',
      includedAccessories: 'Velvet Base Mat, Protective Packaging Box',
    },
    createdAt: '2026-10-08',
  },
  {
    id: 'BAPS-2005',
    name: 'Zarukha Guruparampara Traditional Mandir Frame',
    sku: 'BAPS-MAN-14748',
    category: 'Mandirs & Murtis',
    brand: 'Akshardham Crafts',
    price: 3200.00,
    status: 'Active',
    imageUrl: 'https://us.baps.store/pub/media/catalog/product/cache/780d9d5f88c415706ac6a8a3a062edca/1/4/14748_14749_14772-1_1_1_1.jpg',
    details: 'Traditional carved wooden Zarukha frame enshrining Bhagwan Swaminarayan and the Gunatit Guru Parampara, with intricate arch carvings.',
    categoryData: {
      productType: 'Wooden Zarukha Mandir Frame',
      deityName: 'Bhagwan Swaminarayan & Gunatit Gurus',
      materialWood: 'Solid Sheesham Wood (Teak Finish)',
      finishColor: 'Rich Teak Brown Semi-Gloss',
      dimensionsHWD: 'Height: 20", Width: 16", Depth: 4"',
      weight: '3.2 kg',
      mountingType: 'Wall Mount or Tabletop',
      includedAccessories: 'Wall Mounting Brackets, Glass Front Cover',
    },
    createdAt: '2026-10-08',
  },
  {
    id: 'BAPS-2006',
    name: 'The Vachanamrut (Large Print Gujarati Deluxe Edition)',
    sku: 'BAPS-BOO-3636',
    category: 'Books & Publications',
    brand: 'Swaminarayan Aksharpith',
    price: 350.00,
    status: 'Active',
    imageUrl: 'https://us.baps.store/pub/media/catalog/product/cache/780d9d5f88c415706ac6a8a3a062edca/i/m/img_3636_1.png',
    details: 'The supreme scriptural authority of the Swaminarayan Sampraday containing all 273 discourses delivered by Bhagwan Swaminarayan with extensive glossaries.',
    categoryData: {
      bookTitle: 'Shri Vachanamrut',
      publicationType: 'Book / Scripture (Granth)',
      language: 'Gujarati',
      subjectTopic: 'Akshar-Purushottam Philosophy, Spiritual Living',
      author: 'Bhagwan Swaminarayan',
      publisher: 'Swaminarayan Aksharpith',
      seriesName: 'Vachanamrut Bhashyam Series',
      edition: '4th Deluxe Large Print Edition',
      volumePartNumber: 'Single Volume Complete Edition',
      isbn: '978-81-7526-021-4',
      pageCount: '864 Pages',
      bindingFormat: 'Hardbound (Hardcover)',
      publicationYear: '2025',
      intendedAudience: 'All Spiritual Seekers & Devotees',
      setContents: 'Complete 273 Vachanamruts with Kirtan Index',
    },
    createdAt: '2026-10-07',
  },
  {
    id: 'BAPS-2007',
    name: 'Key Ring Satsang Diksha Shloka Inscribed',
    sku: 'BAPS-GIF-16109',
    category: 'Gifts & Accessories',
    brand: 'Swaminarayan Aksharpith',
    price: 85.00,
    status: 'Active',
    imageUrl: 'https://us.baps.store/pub/media/catalog/product/cache/3f829d3d8fb1028520840883bef73d10/1/6/16109.jpg',
    details: 'Durable metallic keyring featuring engraved Satsang Diksha shloka and Akshardham emblem with scratch-resistant protective lacquer.',
    categoryData: {
      productType: 'Metal Keyring / Keychain',
      material: 'Zinc Alloy & Chrome Plating',
      colorDesign: 'Silver Metal with Blue Enamel Inlay',
      dimensions: 'Length: 3.5", Width: 1.2"',
      packQuantity: '1 Piece Card Pack',
      compatibility: 'Car Keys, Bike Keys, Home Keys',
      personalizationOptions: 'Bulk Satsang Gift Packaging Available',
    },
    createdAt: '2026-10-06',
  },
  {
    id: 'BAPS-2008',
    name: 'Polyresin Aksharderi Gondal Memorial Souvenir',
    sku: 'BAPS-GIF-14944',
    category: 'Gifts & Accessories',
    brand: 'Akshardham Souvenirs',
    price: 250.00,
    status: 'Active',
    imageUrl: 'https://us.baps.store/pub/media/catalog/product/cache/780d9d5f88c415706ac6a8a3a062edca/1/4/14944-1.jpg',
    details: 'Finely detailed 3D miniature architectural replica of Akshar Dehra shrine in Gondal, commemorating the holy resting place of Aksharbrahma Gunatitanand Swami.',
    categoryData: {
      productType: 'Miniature Memorial Replica',
      material: 'High-Density Polyresin',
      colorDesign: 'Natural Marble White with Golden Kalash',
      dimensions: 'Height: 4.5", Base: 3.5" x 3.5"',
      packQuantity: '1 Piece Thermocol Box Pack',
      compatibility: 'Office Desks, Showcase, Puja Altar',
      personalizationOptions: 'Gift Box with Certificate Card',
    },
    createdAt: '2026-10-05',
  },
  {
    id: 'BAPS-2009',
    name: 'Sacred Tulsi Japamala (Red Polish Beads)',
    sku: 'BAPS-PUJ-14599',
    category: 'Puja Items & Ritual Accessories',
    brand: 'Swaminarayan Aksharpith',
    price: 150.00,
    status: 'Active',
    imageUrl: 'https://us.baps.store/pub/media/catalog/product/cache/780d9d5f88c415706ac6a8a3a062edca/1/4/14599-1_1_1.jpg',
    details: '108-bead rosary hand-crafted from natural sacred Tulsi wood with smooth red protective finish and red cotton tasselled meru bead.',
    categoryData: {
      itemType: 'Japamala (Rosary)',
      material: 'Pure Sacred Tulsi Wood',
      weightVolume: '45 grams',
      numberOfPieces: '1 Mala (108 + 1 Meru Bead)',
      colorFragrance: 'Natural Red Polish',
      dimensions: 'Bead Size: 8mm, Total Loop: 34 inches',
      includedItems: '1 Japamala in Cotton Storage Pouch',
    },
    createdAt: '2026-10-04',
  },
];

export const inventoryService = {
  getAll: () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_BAPS_PRODUCTS));
    return INITIAL_BAPS_PRODUCTS;
  },

  saveAll: (items) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (err) {
      console.error('Failed to save products:', err);
    }
  },

  addItem: (item) => {
    const items = inventoryService.getAll();
    const newItem = {
      ...item,
      id: `BAPS-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toISOString().split('T')[0],
      price: Number(item.price),
      imageUrl: item.imageUrl?.trim() || 'https://us.baps.store/pub/media/catalog/product/cache/780d9d5f88c415706ac6a8a3a062edca/i/m/img_3636_1.png',
      categoryData: item.categoryData || {},
    };
    const updated = [newItem, ...items];
    inventoryService.saveAll(updated);
    return updated;
  },

  deleteItem: (id) => {
    const items = inventoryService.getAll();
    const updated = items.filter((item) => item.id !== id);
    inventoryService.saveAll(updated);
    return updated;
  },
};
