using System.Data;
using System.Data.SqlClient;

namespace TestApp.Web.Data;

public abstract class DbServiceBase
{
    private readonly string _dbConnectionString;

    protected DbServiceBase(IConfiguration config)
    {
        _dbConnectionString = config.GetConnectionString("Default")
            ?? throw new ApplicationException("ConnectionString.Default was not found in config.");
    }

    protected T UsingDb<T>(Func<IDbConnection, T> func)
    {
        using var db = new SqlConnection(_dbConnectionString);

        db.Open();

        var result = func(db);

        db.Close();

        return result;
    }
}
