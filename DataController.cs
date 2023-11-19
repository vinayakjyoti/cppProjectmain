using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

[Route("api")]
[ApiController]
public class DataController : ControllerBase
{
    private static List<string> data = new List<string>
    {
        "Item 1",
        "Item 2",
        "Item 3"
    };

    [HttpGet("data")]
    public ActionResult<IEnumerable<string>> GetData()
    {
        return Ok(data);
    }

    [HttpPost("data")]
    public ActionResult AddData([FromBody] string newItem)
    {
        data.Add(newItem);
        return Ok();
    }
}

public class Program
{
    public static void Main(string[] args)
    {
        var host = new WebHostBuilder()
            .UseKestrel()
            .UseStartup<Startup>()
            .Build();

        host.Run();
    }
}
