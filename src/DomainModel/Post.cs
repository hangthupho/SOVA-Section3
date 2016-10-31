namespace DatabaseService
{
    public class Post
    {
        public int PostID { get; set; }
        public int score { get; set; }
        public string createdDate { get; set; }
        public string postBody { get; set; }
        public int userID { get; set; }

    }
}