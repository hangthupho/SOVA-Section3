using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.JsonModels
{
    public class WordCloudModel
    {
        public string Url { get; set; }
        public string Text { get; set; }
        public double? Weight { get; set; }     
    }
}
