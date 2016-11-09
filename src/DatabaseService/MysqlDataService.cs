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
        public IList<PostExtended> GetPosts(int page, int pagesize)
        {
            using (var db = new SovaContext())
            {
                var pm =(from p in db.Posts select new PostExtended{
                    PostId = p.PostId,
                    Title = p.Questions.Title,
                    Score = p.Score,
                    PostBody = p.PostBody,
                    CreatedDate = p.CreatedDate,
                    UserId = p.UserId,
                    UserName = p.Users.UserName,
                  // ParentId = p.Answers.ParentId,
                    CommentBody = p.Comments.CommentBody,
                    CommentCreationDate = p.Comments.CommentCreationDate,
                    CommentUserId = p.Comments.CommentUserId,
                   // CommentUserName = p.Users.UserName
                })
                    //.Include(m => m.Users)
                    //.Include(m => m.Answers)
                    .OrderBy(m => m.PostId)
                    //.Where()
                    .Skip(page*pagesize)
                    .Take(pagesize)
                    .ToList();

                return pm;
            }
        }

        public PostExtended GetPostById(int id)
        {
            using (var db = new SovaContext())
            {
                return (from p in db.Posts
                        where p.PostId == id
                        select new PostExtended
                        {
                            PostId = p.PostId,
                            Title = p.Questions.Title,
                            Score = p.Score,
                            PostBody = p.PostBody,
                            CreatedDate = p.CreatedDate,
                            UserId = p.UserId,
                        }).FirstOrDefault();
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

