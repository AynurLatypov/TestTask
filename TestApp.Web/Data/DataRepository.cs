using Dapper;
using Newtonsoft.Json;

namespace TestApp.Web.Data;

public class DataRepository : DbServiceBase, IDataRepository
{
    public DataRepository(IConfiguration config) : base(config)
    {
    }

    public IEnumerable<DataEntity> GetData(int? code = null, (int min, int max)? codeRange = null, string? search = null)
    {
        var filter = CreateWhereStatement(code, codeRange, search);
        return UsingDb(db => db.Query<DataEntity>($"SELECT [Id], [Код] as Code, [Значение] as Value FROM [dbo].[Значения] {filter}"));
    }

    public bool ReplaceData(IEnumerable<DataEntity> datas)
    {
        var parameters = new { json = JsonConvert.SerializeObject(datas) };
        return UsingDb(db => 
            db.Execute("dbo.[ReplaceData]", parameters, commandType: System.Data.CommandType.StoredProcedure)
        ) > 0;
    }

    private static string CreateWhereStatement(int? code = null, (int min, int max)? codeRange = null, string? search = null)
    {
        var filters = new List<string>();

        if (code != null)
            filters.Add($"[Код] = {code}");
        
        if (codeRange.HasValue)
            filters.Add($"[Код] BETWEEN {codeRange.Value.min} AND {codeRange.Value.max}");
        
        if (!string.IsNullOrEmpty(search))
            filters.Add($"[Значение] LIKE '%{search}%'");

        return filters.Any() 
            ? $" WHERE " + string.Join(" AND ", filters) 
            : string.Empty;
    }
}
