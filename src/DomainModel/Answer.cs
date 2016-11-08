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
        [Key]
        public int PostId { get; set; }
        public int ParentId { get; set; }


        [ForeignKey("PostId")]
        public Post Posts { get; set; }

    }
}
