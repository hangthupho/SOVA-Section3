using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.JsonModels
{
    public class CommentViewModel
    {

        public string Url { get; set; }
        public int PostId { get; set; }
        public int UserId { get; set; }
        public string CommentBody { get; set; }
        public string CommentCreationDate { get; set; }
    }
}
