using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace DomainModel
{
    public class BestMatchSearch
    {
        [Key]
        public int Id { get; set; }
        [Column("rank")]
        public decimal? Rank { get; set; }
        [Column("postBody")]
        public string PostBody { get; set; }
        [Column("title")]
        public string Title { get; set; }

        public string Tag { get; set; }
        public int Status { get; set; }
    }
}