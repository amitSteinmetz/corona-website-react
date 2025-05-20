export interface BaseCard {
  title: string;
  type: string;
}

export interface TextualCard extends BaseCard {
  body: {
    mainData: Array<{ amount: string; text?: string }>;
    additionalData?: Array<{ amount: string; text: string }>;
  };
}

export interface GraphicalCard extends BaseCard {
  body: {
    data;
  };
}

export interface ContainerCard extends BaseCard {
  children: CardModel[];
}

export type CardModel = TextualCard | GraphicalCard | ContainerCard;
