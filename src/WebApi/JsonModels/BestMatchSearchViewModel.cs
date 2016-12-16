using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.JsonModels
{
    public class BestMatchSearchViewModel
    {
        public string Url { get; set; }
        public decimal? Rank { get; set; }
        public string PostBody { get; set; }
    }
}
