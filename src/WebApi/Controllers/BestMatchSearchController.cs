using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatabaseService;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    [Route("api/bestmatchsearch")]
    public class BestMatchSearchController : BaseController
    {
        public BestMatchSearchController(IDataService dataService) : base(dataService)
        {
        }
        [HttpGet("{searchkeyword1}", Name = Config.BestMatchSearchRoute)]
        public IActionResult Get(string searchkeyword1)
        {
            var result = DataService.GetAllMatchPostsWithKeyword(searchkeyword1);
            return Ok(result);
        }
    }
}
