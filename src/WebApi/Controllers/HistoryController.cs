using DatabaseService;
using Microsoft.AspNetCore.Mvc;
using StackOverFLow.DomainModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.JsonModels;

namespace WebApi.Controllers
{
    [Route("api/history")]
    public class HistoryController : BaseController
    {
        public HistoryController(IDataService dataService) : base(dataService)
        {
        }
        // GET api/history
        [HttpGet(Name = Config.HistoriesRoute)]

            public IActionResult Get(int page = 0, int pagesize = Config.DefaultPageSize)
            {
                var data = DataService.GetHistory(page, pagesize)
                    .Select(h => ModelFactory.MapHistory(h, Url));
                var total = DataService.GetNumberOfHistories();

                var result = new
                {
                    Total = total,
                    Url = Url.Link(Config.HistoriesRoute, new { page, pagesize }),
                    Previous = PrevUrl(Url, Config.HistoriesRoute, page, pagesize),
                    Next = NextUrl(Url, Config.HistoriesRoute, page, pagesize, total),
                    Data = data
                };

                return Json(result);
            
            }
            // GET api/history/1
            [HttpGet("{id}", Name = Config.HistoryRoute)]

            public IActionResult Get(int id)
            {
                History history = DataService.GetHistory(id);
                if (history == null) return NotFound();
                return Json(ModelFactory.MapHistory(history, Url));
            }

      
        }
}
