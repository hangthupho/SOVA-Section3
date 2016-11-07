using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.JsonModels
{
    public class CommentCreateModel
    {

        public int postID { get; set; }
        public int userID { get; set; }
        public string commentBody { get; set; }
        public string commentCreationDate { get; set; }
    }
}
