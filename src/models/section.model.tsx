import { Card } from "./card.model";
import { Link } from "./link.model";
import { Table } from "./table.model";

export type SectionModel = {
  id: number;
  title: string;
  relatedLinks?: Link[];
  cards: Card[];
  tables: Table[];
};
