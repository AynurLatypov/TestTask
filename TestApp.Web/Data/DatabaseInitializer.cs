using Dapper;

namespace TestApp.Web.Data;

public class DatabaseInitializer : DbServiceBase
{
    private bool _isInitialized = false;
    private readonly object _locker = new();

    public DatabaseInitializer(IConfiguration config) : base(config)
    {
    }

    public void Init()
    {
        lock (_locker)
        {
            if (_isInitialized)
                return;

            _isInitialized = true;

            var files = Directory.GetFiles(Directory.GetCurrentDirectory(), "*.sql", SearchOption.AllDirectories);

            if (!files.Any())
                throw new ApplicationException("Init.sql file was not found");

            var scripts = files.Select(x => File.ReadAllText(x));

            UsingDb(db =>
            {
                foreach (var sql in scripts)
                    db.Execute(sql);
                return 0;
            });
        }
    }
}
