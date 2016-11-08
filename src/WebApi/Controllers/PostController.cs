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
    public class PostController : Controller
    {
        public IDataService _iDataService;
        public PostController(IDataService iDataservice)
        {
            _iDataService = iDataservice;
        }


        [HttpGet]
        [Route("")]
        public IActionResult Get(int page = 0, int pageSize = 5)
        {
            int limit = pageSize;
            int offset = page * pageSize;
            var postList = _iDataService.GetPosts(limit, offset).Select(p => new PostViewModel
            {
                Url = Url.Action("Get", "Post", new { p.PostId }, Url.ActionContext.HttpContext.Request.Scheme),
                PostBody = p.PostBody,
                Score = p.Score,
                UserId = p.UserId,
                CreatedDate = p.CreatedDate,
                UserName = p.Users.UserName
            });

            var totalMovieNumber = _iDataService.GetNumberOfPosts();
            var lastpage = totalMovieNumber / pageSize;

            var prev = page <= 0 ? null : Url.Action("Get", "Post", new { page = page - 1, pageSize }, Url.ActionContext.HttpContext.Request.Scheme);
            var next = page >= lastpage ? null : Url.Action("Get", "Post", new { page = page + 1, pageSize }, Url.ActionContext.HttpContext.Request.Scheme);

            var result = new
            {
                Total = totalMovieNumber,
                Prev = prev,
                Next = next,
                Data = postList
            };

            return Ok(result);
        }

        [HttpGet]
        [Route("{id}")]
        public IActionResult Get(int id)
        {
            var data = _iDataService.GetPostById(id);
            if (data == null) return NotFound();

            var url = Url.Action("Get", "Post", new { data.PostId }, Url.ActionContext.HttpContext.Request.Scheme);

            var model = ModelFactory.Map(data, url);

            return Ok(model);
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
