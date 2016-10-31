using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DomainModel;
using StackoverflowApplication.Models;

namespace DatabaseService
{
    public interface IDataService
    {
        IList<posts> GetPost(int page, int pagesize);
        posts GetPost(int id);
        void AddPost(posts post);
        bool UpdatePost(posts post);
        bool DeletePost(int id);
        int GetNumberOfPosts();
    }
}
