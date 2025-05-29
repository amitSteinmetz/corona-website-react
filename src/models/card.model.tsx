export interface CardModel {
  id: number;
  title: string;
  type: string; // this will act as the "discriminator"
}

export interface TextualCardModel extends CardModel {
  data: CardTextDataModel[];
}

export interface GraphicalCardModel extends CardModel {
  options: string;
}

export interface ContainerCardModel extends CardModel {
  // children: CardModel[];
  amountOfChilds: number;
}

export interface CardTextDataModel {
  amount: string;
  text: string;
}

export type Card = TextualCardModel | GraphicalCardModel | ContainerCardModel;
