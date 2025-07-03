export interface TableModel {
  id: number;
  title: string;
  type: string; // this will act as the "discriminator"
  description: string;
  columns: TableColumn[];
}

export interface TableColumn {
  id: number;
  key: string;
  value: string;
  inPercentages: boolean;
}

export interface HospitalBedOccupancyTable extends TableModel {
  rows: HospitalBedOccupancyItem[];
}

export interface IncomingPersonsTable extends TableModel {
  rows: IncomingPersonsItem[];
}

export interface HospitalBedOccupancyItem {
  id: number;
  hospitalName: string;
  generalBedOccupancy: number;
  internalDepartmentBedOccupancy: number;
}

export interface IncomingPersonsItem {
  srcCountry: string;
  riskLevel: string;
  TotalAmount: number;
  VerifiedCitizensAmount: number;
  VerifiedStrangersAmount: number;
  TotalVerifiedPercentage: number;
}

export type Table = HospitalBedOccupancyTable | IncomingPersonsTable;
