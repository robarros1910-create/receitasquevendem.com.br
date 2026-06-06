export interface RecipeItem {
  id: string;
  name: string;
  category: string;
  defaultCost: number;
  defaultPrice: number;
  unit: string;
  popularity: "Alta" | "Média" | "Estouro";
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface BonusItem {
  id: string;
  title: string;
  value: number;
  description: string;
  badge: string;
}

export interface DeliverableItem {
  id: string;
  title: string;
  description: string;
  tagline: string;
}
