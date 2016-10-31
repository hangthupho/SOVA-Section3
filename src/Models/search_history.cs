using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StackoverflowApplication.Models
{
    public class search_history
    {
        public int sID { get; set; }
        public string searchString { get; set; }
        public DateTime searchTime { get; set; }
    }
}
