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
}

export interface HospitalBedOccupancyTable extends TableModel {
  rows: HospitalBedOccupancyItem[];
}

export interface HospitalBedOccupancyItem {
  id: number;
  hospitalName: string;
  generalBedOccupancy: number;
  internalDepartmentBedOccupancy: number;
}

export type Table = HospitalBedOccupancyTable;
