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
            static ModelFactory()
            {
                //create a map
                var movieConfig = new MapperConfiguration(acfg => acfg.CreateMap<Post, PostViewModel>());

                PostMapper = movieConfig.CreateMapper();
            }


            public static PostViewModel Map(Post post, string url)
            {
                if (post == null) return null;
                //use created map
                var annotationModel = PostMapper.Map<PostViewModel>(post);
                annotationModel.Url = url;

                return annotationModel;
            }
        }
    }

