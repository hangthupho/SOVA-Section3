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
                    return db_posts.Post
                        .OrderBy(m => m.postID)
                        .Skip(offset)
                        .Take(limit)
                        .ToList();
                }
            }

            public Post GetPostById(int id)
            {
                using (var db = new SovaContext())
                {
                    return db.Post.FirstOrDefault(c => c.postID == id);
                }
            }

            public int GetNumberOfPosts()
            {
                using (var db = new SovaContext())
                {
                    return db.Post.Count();
                }

            }

            public void AddNewPost(Post post)
            {
                using (var db = new SovaContext())
                {
                    post.postID = db.Post.Max(m => m.postID) + 1;
                    db.Add(post);
                    db.SaveChanges();
                }
            }
        }
    }

