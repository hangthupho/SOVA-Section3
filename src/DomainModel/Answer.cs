using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace DomainModel
{
    public class Answer 
    {
        public Answer()
       {
          //this.Posts = new HashSet<Post>();
        }
        //[Key]
        public int PostId { get; set; }
        public int ParentId { get; set; }
        public virtual Post Posts { get; set; }
        
        //[ForeignKey("PostId")]
        //public Post Posts { get; set; }

       // public virtual ICollection<Post> Posts { get; set; }

    }
}
