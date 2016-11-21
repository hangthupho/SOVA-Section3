using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace DomainModel
{
    public class Personal_Comment
    {
        public int CommentId;
        public string CommentBody;
        public int PostId;
        public virtual Post Post { get; set; }
        public string CreatedDate;

    }
}
