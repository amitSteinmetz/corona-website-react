export interface CardModel {
  id: number;
  title: string;
  type: string; // this will act as the "discriminator"
  description: string;
}

export interface TextualCardModel extends CardModel {
  data: CardTextDataModel[];
}

export interface GraphicalCardModel extends CardModel {
  options: string;
  hasTimeRangeFilter: boolean;
}

export interface ContainerCardModel extends CardModel {
  children: Card[];
}

export interface CardTextDataModel {
  amount: string;
  text: string;
}

export type Card = TextualCardModel | GraphicalCardModel | ContainerCardModel;
