using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DomainModel
{
    public class markings
    {
        public markings()
        {
            this.post = new HashSet<Post>();
        }
        public int mID { get; set; }
        public int postID { get; set; }
        public bool status { get; set; }
    public virtual ICollection<Post> post { get; set; }
    
    }
}
