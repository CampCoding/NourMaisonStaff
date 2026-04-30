import { Category, Video } from './types';

export const CATEGORIES: Category[] = [
  { id: 'all', label: 'All Videos' },
  { id: 'app', label: 'App Guide' },
  { id: 'service', label: 'Service' },
  { id: 'kitchen', label: 'Kitchen' },
  { id: 'safety', label: 'Safety' },
];

export const VIDEOS: Video[] = [
  // App guide
  {
    id: '1',
    category: 'app',
    title: 'Getting Started with the App',
    subtitle: 'App Guide',
    duration: '4:32',
    thumbnail:
      'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80',
    instructor: 'Sarah M.',
    watched: true,
    featured: true,
    description:
      'A complete walkthrough of the app interface, from logging in to navigating your daily tasks.',
  },
  {
    id: '2',
    category: 'app',
    title: 'Managing Orders & Tables',
    subtitle: 'App Guide',
    duration: '6:15',
    thumbnail:
      'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80',
    instructor: 'James R.',
    watched: false,
    featured: false,
    description:
      'Learn how to assign tables, track live orders, and send updates to the kitchen in real time.',
  },
  {
    id: '3',
    category: 'app',
    title: 'Shift Scheduling & Requests',
    subtitle: 'App Guide',
    duration: '3:48',
    thumbnail:
      'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80',
    instructor: 'Sarah M.',
    watched: false,
    featured: false,
    description:
      'How to view your shifts, swap with colleagues, and submit time-off requests through the app.',
  },
  {
    id: '4',
    category: 'app',
    title: 'Payments & Receipts',
    subtitle: 'App Guide',
    duration: '5:10',
    thumbnail:
      'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80',
    instructor: 'Omar K.',
    watched: false,
    featured: false,
    description:
      'Process split bills, apply discounts, and print or email receipts directly from your device.',
  },
  // Service
  {
    id: '5',
    category: 'service',
    title: 'The Art of Table Service',
    subtitle: 'Service',
    duration: '8:20',
    thumbnail:
      'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80',
    instructor: 'Emily T.',
    watched: true,
    featured: true,
    description:
      'Master the fundamentals of attentive, professional table service that creates memorable dining experiences.',
  },
  {
    id: '6',
    category: 'service',
    title: 'Upselling Without the Pressure',
    subtitle: 'Service',
    duration: '5:55',
    thumbnail:
      'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=600&q=80',
    instructor: 'Emily T.',
    watched: false,
    featured: false,
    description:
      'Techniques for recommending premium dishes and drinks in a way that feels helpful, not pushy.',
  },
  // Kitchen
  {
    id: '7',
    category: 'kitchen',
    title: 'Food Prep Fundamentals',
    subtitle: 'Kitchen',
    duration: '10:00',
    thumbnail:
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80',
    instructor: 'Chef Ali',
    watched: false,
    featured: false,
    description:
      'Core prep techniques every kitchen team member should know before their first shift.',
  },
  {
    id: '8',
    category: 'kitchen',
    title: 'Kitchen Station Setup',
    subtitle: 'Kitchen',
    duration: '7:30',
    thumbnail:
      'https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=600&q=80',
    instructor: 'Chef Ali',
    watched: false,
    featured: false,
    description:
      'How to organise and prep your station for peak service — mise en place done right.',
  },
  // Safety
  {
    id: '9',
    category: 'safety',
    title: 'Food Safety & Hygiene',
    subtitle: 'Safety',
    duration: '9:15',
    thumbnail:
      'https://images.unsplash.com/photo-1584473457493-17c4c24290c5?w=600&q=80',
    instructor: 'Manager Nour',
    watched: false,
    featured: false,
    description:
      'Essential food-handling rules, temperature guidelines, and hygiene practices for all staff.',
  },
  {
    id: '10',
    category: 'safety',
    title: 'Fire Safety & Evacuation',
    subtitle: 'Safety',
    duration: '6:40',
    thumbnail:
      'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80',
    instructor: 'Manager Nour',
    watched: false,
    featured: false,
    description:
      'Emergency procedures, fire extinguisher use, and evacuation routes every team member must know.',
  },
];
