export interface PurchasedPartModel {
  plantId: number;
  partId: number;
  purchasedDate: string; // JSON refers to dates as iso strings, therefore, string type
}

/*
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MANUFACTURED_PART](
	[PLANT_ID] [int] NOT NULL,
	[PART_ID] [int] NOT NULL,
	[MANUFACTURE_DATE] [date] NOT NULL
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[MANUFACTURED_PART]  WITH CHECK ADD FOREIGN KEY([PART_ID])
REFERENCES [dbo].[PART] ([PART_ID])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[MANUFACTURED_PART]  WITH CHECK ADD FOREIGN KEY([PLANT_ID])
REFERENCES [dbo].[PLANT] ([PLANT_ID])
ON UPDATE CASCADE
GO

 */
