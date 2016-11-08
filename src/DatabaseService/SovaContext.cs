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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Post>().ToTable("posts");
            modelBuilder.Entity<Post>().HasKey(x => x.PostId);

            modelBuilder.Entity<User>().ToTable("user");
            modelBuilder.Entity<User>().HasKey(y => y.UserId);
            modelBuilder.Entity<Tag>().ToTable("tags");
            modelBuilder.Entity<Tag>().HasKey(u => new {u.PostId, u.tag});
            modelBuilder.Entity<Comment>().ToTable("comments");

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
