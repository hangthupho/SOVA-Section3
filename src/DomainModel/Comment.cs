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
        public Nullable<int> PostId { get; set; }
        public Nullable<int> UserId { get; set; }
        public string CommentBody { get; set; }
        public string CommentCreationDate { get; set; }

        [ForeignKey("PostId")]
        public Post Posts { get; set; }
        [ForeignKey("UserId")]
        public User Users { get; set; }

        //public virtual ICollection<User> Users { get; set; }
        // public virtual Comment Comments { get; set; }
    }
}
