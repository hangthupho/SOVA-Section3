using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DomainModel;


namespace DatabaseService
{
    public interface IDataService
    {
        IList<Post> GetPosts(int limit, int offset);
        Post GetPostById(int id);
        int GetNumberOfPosts();
        void AddNewPost(Post post);
    }
}
