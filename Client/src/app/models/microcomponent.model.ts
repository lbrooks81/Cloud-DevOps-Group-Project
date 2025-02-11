export interface MicrocomponentModel {
  microcomponentSKU: number;
  microcomponentName: string;
  microcomponentDescription: string | null;
  microcomponentCost: number;
  microcomponentQOH: number;
  manufactureDate: string;
  plantId: number;
}

/*
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MICRO_COMPONENTS](
	[MC_SKU] [int] NOT NULL,
	[MC_NAME] [varchar](32) NOT NULL,
	[MC_DESCRIPTION] [varchar](128) NULL,
	[MC_COST] [decimal](9, 2) NOT NULL,
	[MC_QOH] [int] NOT NULL,
	[MANUFACTURE_DATE] [date] NOT NULL,
	[PLANT_ID] [int] NOT NULL
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[MICRO_COMPONENTS] ADD PRIMARY KEY CLUSTERED
(
	[MC_SKU] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[MICRO_COMPONENTS]  WITH CHECK ADD FOREIGN KEY([PLANT_ID])
REFERENCES [dbo].[PLANT] ([PLANT_ID])
ON UPDATE CASCADE
GO

 */
