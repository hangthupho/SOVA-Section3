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

    [Route("api/comments")]
    public class CommentController : Controller
    {
        public IDataService _iDataService;

        public CommentController(IDataService iDataservice)
        {
            _iDataService = iDataservice;
        }


        [HttpGet(Name = "CommentRoute")]
        public IActionResult Get(int page = 0, int pageSize = 5)
        {
            int limit = pageSize;
            int offset = page * pageSize;
            var commentList = _iDataService.GetComments(limit, offset).Select(c => ModelFactory.MapComment(c, Url));

            var totalMovieNumber = _iDataService.GetNumberOfComments();
            var lastpage = totalMovieNumber / pageSize;

            //var prev = page <= 0 ? null : Url.Action("Get", "Post", new { page = page - 1, pageSize }, Url.ActionContext.HttpContext.Request.Scheme);
            //var next = page >= lastpage ? null : Url.Action("Get", "Post", new { page = page + 1, pageSize }, Url.ActionContext.HttpContext.Request.Scheme);

            var result = new
            {
                Total = totalMovieNumber,
                Data = commentList
            };

            return Ok(result);
        }

        /*
                        [HttpGet]
                        [Route("{id}")]
                        public IActionResult Get(int id)
                        {
                            var data = _iDataService.GetPostById(id);
                            if (data == null) return NotFound();

                            var url = Url.Action("Get", "Post", new { data.postID }, Url.ActionContext.HttpContext.Request.Scheme);

                            var model = ModelFactory.Map(data, url);

                            return Ok(model);
                        }*/



        [HttpPost("{postId}")]
        public IActionResult Post(int postId, [FromBody] CommentViewModel model)
        {
            var comment = new Comment { CommentBody = model.CommentBody, PostId = postId };
            _iDataService.AddNewComment(comment);

            //return Ok(ModelFactory.Map(comment, Url));
            return Ok(comment);
        }
    }
    }

