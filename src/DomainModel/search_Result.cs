using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DomainModel
{
    public class search_Result
    {
        //public int Id { get; set; }
        ////public int Rank { get; set; }
        //public string PostBody { get; set; }

        public int postID { get; set; }
        public string postBody { get; set; }
        public int score { get; set; }
        public int userId { get; set; }
    }
}
