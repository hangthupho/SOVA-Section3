using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using DatabaseService;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApi.Controllers
{
    [Route("api/wordcloud")]
    public class WordCloudController : BaseController
    {
        public WordCloudController(IDataService dataService) : base(dataService)
        {
        }
        [HttpGet("{word}", Name = Config.WordCloud)]
        public IActionResult Get(string word)
        {
            var result = DataService.GetWordCloud(word);
            return Ok(result);
        }
    }
}
