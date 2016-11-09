using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.JsonModels
{
    public class PostViewModel
    {
        public string Url { get; set; }
        public string Title { get; set; }
        public int Score { get; set; }
        public string PostBody { get; set; }
        public DateTime CreatedDate { get; set; }
        public int UserId { get; set; }
        public string UserName { get; set; }
        public int ParentId { get; set; }

        //public string Answer { get; set; }
        public string Comment { get; }
        public string CommentBody { get; set; }
        public string CommentCreationDate { get; set; }
        public int? CommentUserId { get; set; }
        public string CommentUserName { get; set; }
    }
}
