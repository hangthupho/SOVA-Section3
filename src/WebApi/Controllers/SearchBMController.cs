using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatabaseService;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    [Route("api/searchbm")]
    public class SearchControllerBM : BaseController
    {
        public SearchControllerBM(IDataService dataService) : base(dataService)
        {
        }
        [HttpGet("{searchkeyword1}", Name = Config.SearchRouteBM)]
        public IActionResult Get(string searchkeyword1)
        {
            var result = DataService.GetSearchedMatchedPost(searchkeyword1);
            return Ok(result);
            //return Ok(searchkeyword);
        }
    }
}
