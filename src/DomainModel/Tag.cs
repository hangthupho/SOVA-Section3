using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DomainModel
{
    public class Tag
    {
        public Tag()
        {
            //this.post = new HashSet<Post>();
        }
        public int PostId { get; set; }
        public string tag { get; set; }
        
        //public virtual ICollection<Post> posts { get; set; }
    }
}
