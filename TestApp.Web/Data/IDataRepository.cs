using TestApp.Web.Models;

namespace TestApp.Web.Data;

public interface IDataRepository
{
    IEnumerable<DataEntity> GetData(int? code = null, (int min, int max)? codeRange = null, string? search = null);
    bool ReplaceData(IEnumerable<DataEntity> datas);
}
