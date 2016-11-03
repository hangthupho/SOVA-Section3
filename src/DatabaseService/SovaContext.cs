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


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Post>().ToTable("posts");
            modelBuilder.Entity<Post>().HasKey(x => x.postID);
            
            modelBuilder.Entity<User>().ToTable("user");
            modelBuilder.Entity<User>().HasKey(y => y.userID);
            modelBuilder.Entity<Tag>().ToTable("tags");
            modelBuilder.Entity<Tag>().HasKey(u => new {u.postID, u.tag});

           
            base.OnModelCreating(modelBuilder);
        }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseMySql("server=localhost;database=stackoverflow_sample_universal;uid=root;pwd=copenhagen");
            base.OnConfiguring(optionsBuilder);
        }
    }
}
