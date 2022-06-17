using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using TestApp.Web.Data;
using TestApp.Web.Models;

namespace TestApp.Web.Controllers;

[ApiController]
[Route("api/data")]
public class DataController : ControllerBase
{
    private readonly ILogger<DataController> _logger;
    private readonly IDataRepository _repository;

    public DataController(ILogger<DataController> logger, IDataRepository repository)
    {
        _logger = logger;
        _repository = repository;
    }

    [HttpGet]
    public IEnumerable<DataEntity> Get([FromQuery] int? code = null, [FromQuery] int? min = null, [FromQuery] int? max = null, [FromQuery] string? search = null)
        => _repository.GetData(
            code, 
            min.HasValue || max.HasValue ? (min ?? int.MinValue, max ?? int.MaxValue) : null, 
            search);

    [HttpPost]
    public IActionResult Post([FromBody] Dictionary<int, string>[] values)
    {
        if (values == null)
            return BadRequest();

        var data =
            values.Select(x => x.FirstOrDefault())
            .Select(x => new DataEntity { Code = x.Key, Value = x.Value });

        var result = _repository.ReplaceData(data);

        if (!result)
            _logger.LogError("Data was not replaced by {0}", JsonConvert.SerializeObject(values));

        return result 
            ? Ok()
            : BadRequest();
    }
}