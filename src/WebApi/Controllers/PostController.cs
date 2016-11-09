using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatabaseService;
using DomainModel;
using Microsoft.AspNetCore.Mvc;
using WebApi.JsonModels;

namespace WebApi.Controllers
{
    [Route("api/posts")]
    public class PostController : BaseController
    {
        public PostController(IDataService dataService) : base(dataService)
        {
        }

        [HttpGet(Name = Config.PostsRoute)]
      
        public IActionResult Get(int page = 0, int pagesize = 5)
        {
          
            // int limit = pageSize;
            // int offset = page * pageSize;
            var postList = DataService.GetPosts(page, pagesize).Select(p => ModelFactory.MapPost(p, Url));
           
            var total = DataService.GetNumberOfPosts();
           // var lastpage = totalMo / pageSize;

            //var prev = page <= 0 ? null : Url.Action("Get", "Post", new { page = page - 1, pageSize }, Url.ActionContext.HttpContext.Request.Scheme);
            //var next = page >= lastpage ? null : Url.Action("Get", "Post", new { page = page + 1, pageSize }, Url.ActionContext.HttpContext.Request.Scheme);

            var result = new
            {
                Total = total,
                Previous = GetPrevUrl(Url, page, pagesize),
                Next = GetNextUrl(Url, page, pagesize, total),
                Data = postList
            };

            return Ok(result);
        }

        [HttpGet("{id}", Name = Config.PostRoute)]
        public IActionResult Get(int id)
        {
            PostExtended post = DataService.GetPostById(id);
            if (post == null) return NotFound();
            return Ok(ModelFactory.MapPost(post, Url));
        }





        //[HttpPost("{postid}/comments")]
        //public IActionResult Comment([FromBody] CommentCreateModel model)
        //{
        //    var category = ModelFactory.Map(model);
        //    DataService.AddCategory(category);
        //    return Ok(ModelFactory.Map(category, Url));
        //}
    }
}
