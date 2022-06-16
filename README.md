# TestApp

# Тестовое задание 2

SELECT ClientName, COUNT(*) AS [ContactCount] FROM Clients
LEFT JOIN ClientContacts on Clients.Id = ClientContacts.ClientId
GROUP BY ClientId, ClientName

GO

SELECT ClientName FROM Clients
INNER JOIN ClientContacts on Clients.Id = ClientContacts.ClientId
GROUP BY ClientId, ClientName
HAVING COUNT(*) > 2

# Тестовое задание 3

;WITH dates_with_row_numbers AS (
	SELECT
		ROW_NUMBER() OVER (PARTITION BY Id Order by Dt) as RowNumber,
		Id, 
		Dt
	FROM Dates
)
SELECT t1.Id, t1.Dt AS Sd, t2.Dt AS Ed
FROM dates_with_row_numbers t1
JOIN dates_with_row_numbers t2 ON t1.RowNumber + 1 = t2.RowNumber and t1.Id = t2.Id