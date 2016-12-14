using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using DatabaseService;
using WebApi.JsonModels;
using StackOverFLow.DomainModel;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApi.Controllers
{
    [Route("api/marking")]
    public class MarkingController : BaseController
    {
        public MarkingController(IDataService dataService) : base(dataService)
        {
        }
        // GET api/marking
        [HttpGet(Name = Config.MarkingsRoute)]

        public IActionResult Get(int page = 0, int pagesize = Config.DefaultPageSize)
        {
            var data = DataService.GetMarking(page, pagesize)
                .Select(h => ModelFactory.MapMarking(h, Url));
            var total = DataService.GetNumberOfMarkings();

            var result = new
            {
                Total = total,
                Previous = PrevUrl(Url, Config.MarkingsRoute, page, pagesize),
                Next = NextUrl(Url, Config.MarkingsRoute, page, pagesize, total),
                Data = data
            };

            return Ok(result);
        }
        // GET api/marking/1
        [HttpGet("{id}", Name = Config.MarkingRoute)]

        public IActionResult Get(int id)
        {
            Marking marking = DataService.GetMarking(id);
            if (marking == null) return NotFound();
            return Ok(ModelFactory.MapMarking(marking, Url));
        }
        
        // PUT api/marking/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] MarkingModel model)
        {
            var marking = ModelFactory.MapMarking(model);
            marking.PostId = id;
            if (!DataService.UpdateMarking(marking))
            {
                return NotFound();
            }
            return Ok();
        }

        
    }
}
