using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DomainModel;

namespace DatabaseService
{
    public class PostExtended : Post
    {
        public string Title { get; internal set; }
        public string UserName { get; internal set; }
        public int ParentId { get; internal set; }
    }
}
