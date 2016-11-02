using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DomainModel
{
    public class comments
    {
        public comments()
        {
            this.post = new HashSet<Post>();
            this.user = new HashSet<users>();
        }
        public int commentID { get; set; }
        public Nullable<int> postID { get; set; }
        public Nullable<int> userID { get; set; }
        public string commentBody { get; set; }
        public DateTime commentCreationDate { get; set; }

        public virtual ICollection<users> user { get; set; }
        public virtual ICollection<Post> post { get; set; }
    }
}
