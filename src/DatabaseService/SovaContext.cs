using System;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
 using DomainModel;
using Pomelo.EntityFrameworkCore;


using Microsoft.EntityFrameworkCore;

namespace DatabaseService
{
    public class SovaContext : DbContext
    {

        public DbSet<Post> Posts { get; set; }
        public DbSet<User> Users { get; set; }

        public DbSet<Tag> Tags { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Answer> Answers { get; set; }
        public DbSet<Question> Questions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Post>().ToTable("posts");
            modelBuilder.Entity<Post>().HasKey(x => x.PostId);

            modelBuilder.Entity<User>().ToTable("user");
            modelBuilder.Entity<User>().HasKey(y => y.UserId);
            modelBuilder.Entity<Tag>().ToTable("tags");
            modelBuilder.Entity<Tag>().HasKey(u => new {u.PostId, u.tag});
            modelBuilder.Entity<Comment>().ToTable("comments");
            modelBuilder.Entity<Comment>().HasKey(k => k.CommentId);
            modelBuilder.Entity<Comment>().Property(t => t.CommentUserId).HasColumnName("userID");
            modelBuilder.Entity<Answer>().ToTable("answers");
            modelBuilder.Entity<Answer>().HasKey(a =>a.PostId);
            modelBuilder.Entity<Question>().ToTable("question");
            modelBuilder.Entity<Question>().HasKey(q => q.PostId);

            // modelBuilder.Entity<>()

            base.OnModelCreating(modelBuilder);
        }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseMySql("server=localhost;database=stackoverflow_sample_universal;uid=root;pwd=copenhagen");
            base.OnConfiguring(optionsBuilder);
        }

        public static String GetTimestamp(DateTime value)
        {
            return value.ToString("yyyy-MM-dd HH:mm:ss");
        }

        public String GetTimestamp()
        {
            return GetTimestamp(DateTime.Now);
        }
    }
}
