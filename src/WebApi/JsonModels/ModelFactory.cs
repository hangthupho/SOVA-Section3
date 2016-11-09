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

        private static IMapper PostMapper;
        private static readonly IMapper CommentMapper;
        private static readonly IMapper MapPostExtended;
        static ModelFactory()
        {
            //var PostExtendConfig = new MapperConfiguration(acfg => acfg.CreateMap<PostExtended, PostViewModel>());
            //MapPostExtended = PostExtendConfig.CreateMapper();
            //create a map
            //var postConfig = new MapperConfiguration(acfg => acfg.CreateMap<Post, PostViewModel>());

            //PostMapper = postConfig.CreateMapper();
        
            var commentConfig = new MapperConfiguration(fg => fg.CreateMap<Comment, CommentViewModel>());
            CommentMapper = commentConfig.CreateMapper();

        }

        public static PostViewModel MapPost(PostExtended post, IUrlHelper urlHelper)
        {
            if (post == null) return null;
            //use created map
            Mapper.Initialize(config => config.CreateMap<Post, PostViewModel>());
            var model = Mapper.Map<Post, PostViewModel>(post);
            model.Url = urlHelper.Link(Config.PostRoute, new { id = post.PostId });
            model.Title = post.Title;
            model.UserName = post.UserName;
            model.ParentId = post.ParentId;
            model.CommentBody = post.CommentBody;
            model.CommentCreationDate = post.CommentCreationDate;
            model.CommentUserId = post.CommentUserId;
            //model.CommentUserName = post.UserName;
            return model;
        }
        public static CommentViewModel MapComment(Comment comment, IUrlHelper url)
        {
            if (comment == null) return null;
            //use created map
            var annotationModel1 = CommentMapper.Map<CommentViewModel>(comment);
            annotationModel1.Url = url.Link("CommentRoute", new { id = comment.CommentId });

            return annotationModel1;
        }

        //public static 
    }
}

