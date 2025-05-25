import { CardModel } from "./card.model";

export type SectionModel = {
  title: string;
  relatedLinks?: string[];
  cards: CardModel[];
};
