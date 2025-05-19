export interface Card {
  cardTitle: string;
  cardBody: {
    mainData: Array<{ amount: string; text: string }>;
    additionalData: Array<{ amount: string; text: string }>;
  };
}
