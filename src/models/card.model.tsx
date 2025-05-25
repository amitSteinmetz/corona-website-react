export interface BaseCard {
  title: string;
  type: string;
}

export interface TextualCard extends BaseCard {
  mainData: Array<{ amount: string; text?: string }>;
  additionalData?: Array<{ amount: string; text: string }>;
}

export interface GraphicalCard extends BaseCard {
  option;
}

export interface ContainerCard extends BaseCard {
  children: CardModel[];
}

export type CardModel = TextualCard | GraphicalCard | ContainerCard;
