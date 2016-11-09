using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DomainModel
{
    public class User
    {
        public User()
        {
            this.Posts = new HashSet<Post>();
            this.Comments = new HashSet<Comment>();
        }
        //[Key]
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string UserLocation { get; set; }
        public int UserAge { get; set; }
        public DateTime UserCreationDate { get; set; }

        public virtual ICollection<Post> Posts { get; set; }
       public virtual ICollection<Comment> Comments { get; set; }
    }
}
