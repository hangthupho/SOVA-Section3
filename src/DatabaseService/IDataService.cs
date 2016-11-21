using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DomainModel;

namespace DatabaseService
{
    public interface IDataService
    {
        //View posts
        //IList<PostExtended> GetPost(int page, int pagesize);
        //PostExtended GetPost(int id);
        IList<PostExtended> GetListOfPosts(int page, int pagesize);
        PostExtended GetPostDetail(int id);
        int GetNumberOfPosts();

        //View, add, update, delete comments
        IList<CommentExtended> GetComment(int page, int pagesize);
        CommentExtended GetComment(int id);
        int GetNumberOfComments();
        CommentExtended AddComment(Comment comment);
        bool UpdateComment(Comment comment);
        bool DeleteComment(int id);

        IList<search_Result> GetAllMatchPostsWithKeyword(string keyword);
        IList<WeightedSearch> GetSearchedPost(string keyword1);

    }
}
