export interface Property {
  id: string;
  propertyNumber: string;
  propertyName: string;
  operator: string;
  state: string;
  county: string;
  propertyType: "Lease" | "Unit" | "Well" | string;
  workingInterest: number; // percentage, e.g., 12.5
  netRevenueInterest: number; // percentage
  status: "Active" | "Inactive" | "Pending" | string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}
