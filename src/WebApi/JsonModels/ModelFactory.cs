using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DomainModel;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.JsonModels
{
    public class ModelFactory
    {
        public static CategoryModel Map(Category category, IUrlHelper url)
        {
            // hint: use AutoMapper
            return new CategoryModel
            {
                Url = url.Link(Config.CategoryRoute, new { id = category.Id}),
                Name = category.Name,
                Description = category.Description
            };
        }

        public static Category Map(CategoryModel model)
        {
            // hint: use AutoMapper
            return new Category
            {
                Name = model.Name,
                Description = model.Description
            };
        }
    }
}
