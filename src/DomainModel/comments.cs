using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StackoverflowApplication.Models
{
    public class comments
    {
        public comments()
        {
            this.post = new HashSet<posts>();
            this.user = new HashSet<users>();
        }
        public int commentID { get; set; }
        public Nullable<int> postID { get; set; }
        public Nullable<int> userID { get; set; }
        public string commentBody { get; set; }
        public DateTime commentCreationDate { get; set; }

        public virtual ICollection<users> user { get; set; }
        public virtual ICollection<posts> post { get; set; }
    }
}
