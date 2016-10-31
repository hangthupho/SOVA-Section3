using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DomainModel;

namespace DatabaseService
{
    public interface IDataService
    {
        IList<Post> GetCategories(int page, int pagesize);
      Post GetPost(int id);
        void AddPost(Post post);
        bool UpdatePost(Category category);
        bool DeletePost(int id);
        int GetNumberOfPosts();
    }
}
