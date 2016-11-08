using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DomainModel;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using DatabaseService;

namespace WebApi.JsonModels
{
    public class ModelFactory
    {

        private static readonly IMapper PostMapper;
        private static readonly IMapper CommentMapper;
        private static readonly IMapper MapPostExtended;
        static ModelFactory()
        {
            var PostExtendConfig = new MapperConfiguration(acfg => acfg.CreateMap<PostExtended, PostViewModel>());
            MapPostExtended = PostExtendConfig.CreateMapper();
             //create a map
             var postConfig = new MapperConfiguration(acfg => acfg.CreateMap<Post, PostViewModel>());

            PostMapper = postConfig.CreateMapper();


            var commentConfig = new MapperConfiguration(fg => fg.CreateMap<Comment, CommentViewModel>());
            CommentMapper = commentConfig.CreateMapper();

        }






        public static PostViewModel Map(PostExtended post, IUrlHelper url)
        {
            if (post == null) return null;
            //use created map

            var Model = PostMapper.Map<Post, PostViewModel>(post);
            Model.Url = url.Link("PostRoute", new { id = post.PostId });
            Model.Title = post.Title;
            return Model;
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

