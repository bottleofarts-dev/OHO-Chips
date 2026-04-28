/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Flavor {
  id: string;
  name: string;
  fullName: string;
  description: string;
  tagline: string;
  color: {
    primary: string;
    secondary: string;
    text: string;
    accent: string;
  };
  image: string;
  features: string[];
  ingredients: string[];
  nutrition: {
    calories: string;
    totalFat: string;
    sodium: string;
    carbs: string;
    protein: string;
  };
}

export const FLAVORS: Flavor[] = [
  {
    id: 'chilli',
    name: 'Chilli',
    fullName: 'OHO Chilli Flavour Chips',
    description: 'An explosion of fiery heat in every bite! Our Chilli Flavour Chips are crafted for those who crave a spicy blaze. Made with premium artisan techniques, these chips deliver a crunchy kick that keeps you coming back for more.',
    tagline: 'Explosion of Fiery Heat!',
    color: {
      primary: '#ca1a1a', // Rich red
      secondary: '#000000', // Deep black
      text: '#ffffff',
      accent: '#ff4d4d',
    },
    image: 'https://i.postimg.cc/YqC0FxHK/Poster-with-Chilli-202604281455.jpg',
    features: ['Fiery Spice', 'Crunchy Kick', 'Artisan Quality'],
    ingredients: ['Selected Potatoes', 'Rice Bran Oil', 'Dried Red Chilli', 'Spices & Condiments', 'Salt', 'Onion Powder', 'Garlic Powder'],
    nutrition: {
      calories: '160 kcal',
      totalFat: '10g',
      sodium: '240mg',
      carbs: '15g',
      protein: '2g'
    }
  },
  {
    id: 'masala',
    name: 'Masala',
    fullName: 'OHO Masala Flavor Chips',
    description: 'Unleash the flavor magic with our authentic spice blend! Every chip is packed with Masala goodness, offering a rich and aromatic experience. A premium artisan snack that celebrates the bold traditions of spice.',
    tagline: 'Unleash the Flavor Magic!',
    color: {
      primary: '#cc8500', // Golden amber
      secondary: '#502a11', // Coffee brown
      text: '#ffffff',
      accent: '#ffcc66',
    },
    image: 'https://i.postimg.cc/05wj0N6C/Poster-for-Masala-202604281455.jpg',
    features: ['Authentic Spices', 'Rich Aroma', 'Bold Flavor'],
    ingredients: ['Selected Potatoes', 'Vegetable Oil', 'Coriander', 'Cumin', 'Turmeric', 'Black Pepper', 'Cloves', 'Cardamom', 'Salt'],
    nutrition: {
      calories: '155 kcal',
      totalFat: '9g',
      sodium: '220mg',
      carbs: '16g',
      protein: '2g'
    }
  },
  {
    id: 'pudina',
    name: 'Cream & Onion Pudina',
    fullName: 'OHO Cream & Onion Pudina Chips',
    description: 'Creamy richness meets zesty mint freshness! Our Pudina blend offers a cool flavor magic that refreshes your palate. A zesty and minty zing in every crunch, perfected with artisan care.',
    tagline: 'Cool Flavor Magic!',
    color: {
      primary: '#6bb38a', // Minty green
      secondary: '#f0f7f2', // Creamy off-white
      text: '#1a3321', // Dark green for text
      accent: '#c1e1c1',
    },
    image: 'https://i.postimg.cc/hPZLQjN2/Cream-and-Onion-202604281455.jpg',
    features: ['Mint Freshness', 'Creamy Texture', 'Zesty Zing'],
    ingredients: ['Selected Potatoes', 'Sunflower Oil', 'Dried Mint Leaves', 'Onion Powder', 'Sour Cream Powder', 'Dextrose', 'Citric Acid', 'Sea Salt'],
    nutrition: {
      calories: '150 kcal',
      totalFat: '8g',
      sodium: '210mg',
      carbs: '17g',
      protein: '2g'
    }
  }
];

export const MASCOT_IMAGE = 'https://i.ibb.co/MynX0KS7/Canvas-42.png'; // Attempting direct link format for ibb.co
export const GROUP_IMAGE = 'https://i.postimg.cc/FR1G1BZK/OHO-Chips-brand-202604281455.jpg';
