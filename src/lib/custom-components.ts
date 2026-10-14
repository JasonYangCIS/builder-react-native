import type { RegisteredComponent } from '@builder.io/sdk-react-native';

import { Hero } from '@/components/Hero';
import { ProductCard } from '@/components/ProductCard';
import { Testimonial } from '@/components/Testimonial';

// Components listed here show up in the Builder Visual Editor.
export const customComponents: RegisteredComponent[] = [
  {
    component: Hero,
    name: 'Hero',
    inputs: [
      { name: 'title', type: 'text', defaultValue: 'Welcome to React Native' },
      { name: 'subtitle', type: 'text', defaultValue: 'Content powered by Builder.io' },
      { name: 'backgroundImage', type: 'file', allowedFileTypes: ['jpeg', 'jpg', 'png', 'webp'] },
      { name: 'buttonText', type: 'text', defaultValue: 'Learn more' },
      { name: 'buttonLink', type: 'url', defaultValue: 'https://www.builder.io' },
    ],
  },
  {
    component: ProductCard,
    name: 'Product Card',
    inputs: [
      { name: 'name', type: 'text', defaultValue: 'Sample Product' },
      { name: 'price', type: 'number', defaultValue: 29.99 },
      { name: 'description', type: 'longText', defaultValue: 'A great product you will love.' },
      { name: 'image', type: 'file', allowedFileTypes: ['jpeg', 'jpg', 'png', 'webp'] },
    ],
  },
  {
    component: Testimonial,
    name: 'Testimonial',
    inputs: [
      { name: 'quote', type: 'longText', defaultValue: 'This product changed how we ship.' },
      { name: 'author', type: 'text', defaultValue: 'Jane Doe' },
      { name: 'role', type: 'text', defaultValue: 'CTO, Acme' },
    ],
  },
];
