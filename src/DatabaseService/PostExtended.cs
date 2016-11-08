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
       
        public string ParentId { get; internal set; }
    }
}
