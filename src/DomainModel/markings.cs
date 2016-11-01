using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StackoverflowApplication.Models
{
    public class markings
    {
        public markings()
        {
            this.post = new HashSet<posts>();
        }
        public int mID { get; set; }
        public int postID { get; set; }
        public bool status { get; set; }
    public virtual ICollection<posts> post { get; set; }
    
    }
}
