using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DomainModel;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;

namespace WebApi.JsonModels
{
    public class ModelFactory
    {

        private static readonly IMapper PostMapper;
        private static readonly IMapper CommentMapper;
        static ModelFactory()
        {
            //create a map
            var postConfig = new MapperConfiguration(acfg => acfg.CreateMap<Post, PostViewModel>());

            PostMapper = postConfig.CreateMapper();


            var commentConfig = new MapperConfiguration(fg => fg.CreateMap<Comment, CommentViewModel>());
            CommentMapper = commentConfig.CreateMapper();

        }






        public static PostViewModel Map(Post post, string url)
        {
            if (post == null) return null;
            //use created map

            var annotationModel = PostMapper.Map<PostViewModel>(post);
            annotationModel.Url = url;
            return annotationModel;
        }
        public static CommentViewModel Map(Comment comment, IUrlHelper url)
        {
            if (comment == null) return null;
            //use created map
            var annotationModel1 = CommentMapper.Map<CommentViewModel>(comment);
            annotationModel1.Url = url.Link("CommentRoute", new { id = comment.PostId });

            return annotationModel1;
        }

        //public static 
    }
}

