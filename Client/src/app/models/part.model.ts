export interface PartModel {
  partId: number;
  partName: string;
  partDescription: string | null;
  partCost: number | null;
  partQOH: number | null;
  vendorId: number;
}


/*
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE TABLE [dbo].[PART](
  [PART_ID] [int] NOT NULL,
  [PART_NAME] [varchar](64) NOT NULL,
  [PART_DESCRIPTION] [varchar](64) NULL,
  [PART_COST] [decimal](9, 2) NULL,
  [PART_QOH] [int] NULL,
  [VENDOR_ID] [int] NOT NULL
)

ON [PRIMARY]
GO
ALTER TABLE [dbo].[PART] ADD PRIMARY KEY CLUSTERED
(
  [PART_ID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[PART]  WITH CHECK ADD FOREIGN KEY([VENDOR_ID])
REFERENCES [dbo].[VENDOR] ([VENDOR_ID])
GO
*/
