using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.JsonModels
{
    public class WeightedSearchViewModel
    {
        public string Url { get; set; }
        public double? Rank { get; set; }
        public string PostBody { get; set; }
        public string Title { get; set; }
        public string Tag { get; set; }
        public int Status { get; set; }
    }
}
