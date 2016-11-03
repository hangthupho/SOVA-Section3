using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DomainModel
{
    public class User
    {
        public User()
        {
            this.Posts = new HashSet<Post>();
        }
        public int userID { get; set; }
        public string userName { get; set; }
        public string userLocation { get; set; }
        public int userAge { get; set; }
        public DateTime userCreationDate { get; set; }

        public virtual ICollection<Post> Posts { get; set; }
    }
}
