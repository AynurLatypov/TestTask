IF  NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Значения]') AND type in (N'U'))

BEGIN
	CREATE TABLE [dbo].[Значения](
		[Id] INT IDENTITY(1,1) PRIMARY KEY,
		[Код] INT NOT NULL,
		[Значение] VARCHAR(256) NOT NULL
	) 
END
