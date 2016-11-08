using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DomainModel
{
    public class Question
    {
        [Key]
        public int PostId { get; set; }
        public DateTime ClosedDate { get; set; }
        public string Title { get; set; }
        public virtual Post Post { get; set; }
    }
}
