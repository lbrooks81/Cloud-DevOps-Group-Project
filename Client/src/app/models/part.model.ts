export interface PartModel {
  partId: number;
  partName: string;
  partDescription: string | null;
  partCost: number | null;
  partQOH: number | null;
  vendorId: number;
}
