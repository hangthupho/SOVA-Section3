using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatabaseService;
using Microsoft.AspNetCore.Mvc;
using WebApi.JsonModels;

namespace WebApi.Controllers
{
    [Route("api/categories")]
    public class CategoriesController : BaseController
    {
        public CategoriesController(IDataService dataService) : base(dataService)
        {
        }

        // GET api/values
        [HttpGet(Name = Config.CategoriesRoute)]
        public IActionResult Get(int page = 0, int pagesize = Config.DefaultPageSize)
        {
            var data = DataService.GetCategories(page, pagesize)
                .Select(c => ModelFactory.Map(c, Url));
            var total = DataService.GetNumberOfCategories();

            var result = new
            {
                total = total,
                prev = GetPrevUrl(Url, page, pagesize),
                netx = GetNextUrl(Url, page, pagesize, total),
                data = data
            };

            return Ok(result);
        }

        


        // GET api/values/5
        [HttpGet("{id}", Name = Config.CategoryRoute)]
        public IActionResult Get(int id)
        {
            var category = DataService.GetCategory(id);
            if (category == null) return NotFound();
            return Ok(ModelFactory.Map(category, Url));
        }

        // POST api/values
        [HttpPost]
        public IActionResult Post([FromBody] CategoryModel model)
        {
            var category = ModelFactory.Map(model);
            DataService.AddCategory(category);
            return Ok(ModelFactory.Map(category, Url));
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] CategoryModel model)
        {
            var category = ModelFactory.Map(model);
            category.Id = id;
            if (!DataService.UpdateCategory(category))
            {
                return NotFound();
            }
            return Ok();
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            if (!DataService.DeleteCategory(id))
            {
                return NotFound();
            }

            return Ok();
        }


        
    }
}
