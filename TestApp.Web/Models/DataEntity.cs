using System.ComponentModel.DataAnnotations;

namespace TestApp.Web.Models;

public class DataEntity
{
    public int Id { get; set; }

    [Required]
    public int Code { get; set; }

    [Required]
    public string Value { get; set; }
}
