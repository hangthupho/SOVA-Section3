using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace DomainModel
{
    public class Comment
    {
        public Comment()
        {
            // this.Posts = new HashSet<Post>();
            // this.Users = new HashSet<User>();
        }
        [Key]
        public int CommentId { get; set; }
        public int? PostId { get; set; }
        public int? CommentUserId { get; set; }
        public string CommentBody { get; set; }
        public string CommentCreationDate { get; set; }

       [ForeignKey("PostId")]
        public virtual Post Posts { get; set; }
        [ForeignKey("UserId")]
        public virtual User Users { get; set; }

        //public virtual ICollection<User> Users { get; set; }
        // public virtual Comment Comments { get; set; }
    }
}
