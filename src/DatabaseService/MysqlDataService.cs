using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using DomainModel;
using Microsoft.EntityFrameworkCore;

namespace DatabaseService
{
    public class MysqlDataService : IDataService
    {
        
        public IList<Category> GetCategories(int page, int pagesize)
        {
            using (var db = new StFlwContext())
            {
                return db.Categories
                    .OrderBy(c => c.Id)
                    .Skip(page * pagesize)
                    .Take(pagesize)
                    .ToList();
            }
        }

        public Category GetCategory(int id)
        {
            using (var db = new StFlwContext())
            {
                return db.Categories.FirstOrDefault(c => c.Id == id);
            }
        }

        public void AddCategory(Category category)
        {
            using (var db = new StFlwContext())
            {
                category.Id = db.Categories.Max(c => c.Id) + 1;
                db.Add(category);
                db.SaveChanges();
            }
        }

        public bool UpdateCategory(Category category)
        {
            using (var db = new StFlwContext())

                try
                {
                    db.Attach(category);
                    db.Entry(category).State = EntityState.Modified;
                    return db.SaveChanges() > 0;
                }
                catch (DbUpdateConcurrencyException)
                {
                    return false;
                }

        }

        public bool DeleteCategory(int id)
        {
            using (var db = new StFlwContext())
            {
                var category = db.Categories.FirstOrDefault(c => c.Id == id);
                if (category == null)
                {
                    return false;
                }
                db.Remove(category);
                return db.SaveChanges() > 0;
            }
        }

        public int GetNumberOfCategories()
        {
            using (var db = new StFlwContext())
            {
                return db.Categories.Count();
            }
        }
    }
}
