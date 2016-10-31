using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;
using StackoverflowApplication.Models;

namespace DatabaseService
{
    public class MysqlDataService : IDataService
    {
        
        public IList<posts> GetPost(int page, int pagesize)
        {
            using (var db = new StFlwContext())
            {
                return db.Posts
                    .OrderBy(c => c.postID)
                    .Skip(page * pagesize)
                    .Take(pagesize)
                    .ToList();
            }
        }

        public posts GetPost(int id)
        {
            using (var db = new StFlwContext())
            {
                return db.Posts.FirstOrDefault(c => c.postID == id);
            }
        }

        public void AddPost(posts post)
        {
            using (var db = new StFlwContext())
            {
                post.postID = db.Posts.Max(c => c.postID) + 1;
                db.Add(post);
                db.SaveChanges();
            }
        }

        public bool UpdatePost(posts post)
        {
            using (var db = new StFlwContext())

                try
                {
                    db.Attach(post);
                    db.Entry(post).State = EntityState.Modified;
                    return db.SaveChanges() > 0;
                }
                catch (DbUpdateConcurrencyException)
                {
                    return false;
                }

        }

        public bool DeletePost(int id)
        {
            using (var db = new StFlwContext())
            {
                var category = db.Posts.FirstOrDefault(c => c.postID == id);
                if (category == null)
                {
                    return false;
                }
                db.Remove(category);
                return db.SaveChanges() > 0;
            }
        }

        public int GetNumberOfPosts()
        {
            using (var db = new StFlwContext())
            {
                return db.Posts.Count();
            }
        }
    }
}
