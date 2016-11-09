using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DomainModel;


namespace DatabaseService
{
    public interface IDataService
    {
        IList<PostExtended> GetPosts(int page, int pagesize);
        PostExtended GetPostById(int id);
        int GetNumberOfPosts();
        //comment
        void AddNewComment(Comment comment);
        IList<Comment> GetComments(int limit, int offset);
        int GetNumberOfComments();
      
    }
}
