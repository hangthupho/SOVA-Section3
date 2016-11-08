using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DomainModel
{
    public class SearchHistory
    {
        [Key]
        public int SId { get; set; }
        public string SearchString { get; set; }
        public DateTime SearchTime { get; set; }
    }
}
