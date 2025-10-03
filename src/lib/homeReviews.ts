import type { Review } from '@/types/product';

export const homeReviews: Review[] = [
  {
    id: "home-review-1",
    author: "sarahj_nyc",
    avatar: "https://i.ibb.co/4w8W5qG8/icon-7797704-640.png",
    rating: 5,
    date: "2025-01-15",
    title: "Solid camera, not perfect but worth it",
    content: "Wasn’t sure about buying used tbh, but this G7X Mark III surprised me. There’s a tiny nick on the corner (not a big deal), but the pics are sharp and it fits in my jacket pocket. Battery life’s good, camera quality’s dope. Shipping was fast too. Would buy again, honestly.",
    helpful: 17,
    verified: true,
    location: "New York, NY",
    purchaseDate: "January 2025",
    images: [
      "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=400&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop&auto=format&q=80"
    ]
  },
  {
    id: "home-review-2",
    author: "daveT",
    avatar: "https://i.ibb.co/ZzZm6PT2/avatars-000652081152-ddbg70-t500x500.jpg",
    rating: 5,
    date: "2025-02-10",
    title: "Drone is a beast (DJI Mavic 2 Pro)",
    content: "This thing rips. Camera is super crisp, and the controls are way smoother than my old Phantom. Obstacle avoidance actually saved me from crashing into a tree lol. Only thing is, the app glitched once, but reboot fixed it. Battery lasts longer than I expected. Would recommend for anyone into aerial shots.",
    helpful: 22,
    verified: true,
    location: "Seattle, WA",
    purchaseDate: "February 2025",
    images: [
      "https://i.ibb.co/vCq3Gd7h/s-l1600-18.webp",
      "https://i.ibb.co/pvtFkydF/s-l1600-19.webp"
    ]
  },
  {
    id: "home-review-3",
    author: "Jessica M.",
    avatar: "https://i.ibb.co/4w8W5qG8/icon-7797704-640.png",
    rating: 5,
    date: "2025-03-22",
    title: "Game changer for summer parties!",
    content: "I bought the Ninja SLUSHi for my daughter's birthday party and it was a total hit. We made blue raspberry slushies and frozen lemonade all afternoon. The 72oz pitcher is huge—enough for a dozen kids at once. I love that the parts are dishwasher safe because cleanup was a breeze after a sticky day.",
    helpful: 18,
    verified: true,
    location: "Austin, TX",
    purchaseDate: "March 2025",
    images: [
      "https://i.ibb.co/PZLLSbFW/s-l1600-21.webp",
      "https://i.ibb.co/twZpCnsP/s-l1600-20.webp"
    ]
  },
  {
    id: "home-review-4",
    author: "ashleyj_gold",
    avatar: "https://i.ibb.co/whhmMqhv/2219349473-huge.jpg",
    rating: 5,
    date: "2025-04-18",
    title: "Sleep tracking is actually fun now",
    content: "I was skeptical about wearing a ring to bed, but the Oura Ring is so light I forget it's on. The sleep insights are wild—turns out my '8 hours' was more like 6.5 of real sleep. The gold finish is gorgeous and matches my other jewelry. Battery lasts me 5 days, and the charger is super compact.",
    helpful: 9,
    verified: true,
    location: "Portland, OR",
    purchaseDate: "April 2025",
    images: [
      "https://i.ibb.co/RGYHKDMg/s-l1600-22.webp",
      "https://i.ibb.co/WW8DJ95q/s-l1600-23.webp"
    ]
  },
  {
    id: "home-review-5",
    author: "MikeC87",
    avatar: "https://i.ibb.co/4w8W5qG8/icon-7797704-640.png",
    rating: 4,
    date: "2025-05-05",
    title: "Camera works, but not a fan of the color",
    content: "The camera does what it’s supposed to and the pics are sharp. There’s some scratches on the screen and the silver color isn’t really my thing, but it’s fine for the price. 256GB card is a nice extra. Not perfect, but gets the job done.",
    helpful: 23,
    verified: true,
    location: "Los Angeles, CA",
    purchaseDate: "May 2025",
    images: [
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=400&fit=crop&auto=format&q=80"
    ]
  }
];

export const homeReviewsStats = {
  averageRating: 4.8,
  totalReviews: 156
}; 