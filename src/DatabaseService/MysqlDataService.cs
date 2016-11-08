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

        public IList<Comment> GetComments(int limit, int offset)
        {
            using (var db_comments = new SovaContext())
            {
                return db_comments.Comments
                    .OrderBy(m => m.CommentId)
                    .Skip(offset)
                    .Take(limit)
                    .ToList();
            }
        }
        public IList<Post> GetPosts(int limit, int offset)
        {
            using (var db_posts = new SovaContext())
            {
                var p = db_posts.Posts
                    .Include(m => m.Users)
                    // .Include(m => m.Tags)
                    .OrderBy(m => m.PostId)
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
                return db.Posts.FirstOrDefault(c => c.PostId == id);
            }
        }

        public int GetNumberOfPosts()
        {
            using (var db = new SovaContext())
            {
                return db.Posts.Count();
            }

        }

        public void AddNewComment(Comment comment)
        {
            using (var db = new SovaContext())
            {
                comment.CommentId = db.Comments.Max(m => m.CommentId) + 1;
                comment.CommentCreationDate = db.GetTimestamp();   //)ToString(GetTimestamp(DateTime.Now))//;
                db.Add(comment);
                db.SaveChanges();
            }
        }
        public int GetNumberOfComments()
        {
            using (var db = new SovaContext())
            {
                return db.Comments.Count();
            }

        }
    }
    }

