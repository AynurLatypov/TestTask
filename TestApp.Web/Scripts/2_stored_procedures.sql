CREATE OR ALTER PROC dbo.ReplaceData
    @json NVARChAR(MAX)
AS
BEGIN

    BEGIN TRY
        BEGIN TRANSACTION;

        DELETE FROM [dbo].[Значения]

        INSERT INTO [dbo].[Значения]([Код], [Значение]) 
            SELECT * FROM OPENJSON(@json) 
            WITH (
	            [Код] INT 'strict $.Code',
	            [Значение] varchar(1000) 'strict $.Value'
            )
            ORDER BY [Код];

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;
        
        RETURN -1;
    END CATCH;

    RETURN 1;

END 

