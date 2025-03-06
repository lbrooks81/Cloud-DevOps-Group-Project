export interface PurchasedPartModel {
  plantId: number;
  partId: number;
  purchasedDate: string; // JSON refers to dates as iso strings, therefore, string type
}
