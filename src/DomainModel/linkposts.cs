using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DomainModel
{
    public class Marking
    {

        public Marking()
        {
            this.Posts = new HashSet<Post>();
        }

        public int MId { get; set; }
        public int PostId { get; set; }
        public bool Status { get; set; }
        public virtual ICollection<Post> Posts { get; set; }
    }
}
