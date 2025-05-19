export interface Card {
  cardTitle: string;
  children? : Card[];
}

export interface TextualCard extends Card {
  cardBody: {
    mainData?: Array<{ amount: string; text: string }>;
    additionalData?: Array<{ amount: string; text: string }>;
  };
  type: string;
}

export interface GraphicalCard extends Card {
  cardBody: {
    mainData?: Array<{ amount: string; text: string }>;
    additionalData?: Array<{ amount: string; text: string }>;
  };
  type: string
}
