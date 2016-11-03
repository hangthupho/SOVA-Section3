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
        
            public IList<Post> GetPosts(int limit, int offset)
            {
                using (var db_posts = new SovaContext())
                {
                    var p = db_posts.Posts
                        .Include(m => m.Users)
                        .Include(m => m.Tags)
                        .OrderBy(m => m.postID)
                        .Skip(offset)
                        .Take(limit)
                        .ToList();

                    return p;
                }
            }

            public Post GetPostById(int id)
            {
                using (var db = new SovaContext())
                {
                    return db.Posts.FirstOrDefault(c => c.postID == id);
                }
            }

            public int GetNumberOfPosts()
            {
                using (var db = new SovaContext())
                {
                    return db.Posts.Count();
                }

            }

            public void AddNewPost(Post post)
            {
                using (var db = new SovaContext())
                {
                    post.postID = db.Posts.Max(m => m.postID) + 1;
                    db.Add(post);
                    db.SaveChanges();
                }
            }
        }
    }

