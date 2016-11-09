using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace DomainModel
{
    public class Post
    {
        //[Key]
        public int PostId { get; set; }
        public int Score { get; set; }
        public string PostBody { get; set; }
        public DateTime CreatedDate { get; set; }
        public int UserId { get; set; }

       // [ForeignKey("UserId")]
        public virtual User Users { get; set; }
        public virtual Answer Answers { get; set; }
        public virtual Question Question { get; set; }

    }
}
