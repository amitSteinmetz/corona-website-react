import { Card } from "./card.model";

export type SectionModel = {
  id: number;
  title: string;
  relatedLinks?: string[];
  cards: Card[];
};
