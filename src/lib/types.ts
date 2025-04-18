export interface Perfume {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  image: string;
  notes: {
    top: string[];
    middle: string[];
    base: string[];
  };
  volume: string;
  isNew?: boolean;
  isBestseller?: boolean;
} 