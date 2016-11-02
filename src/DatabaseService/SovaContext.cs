using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
 using DomainModel;

using Microsoft.EntityFrameworkCore;

namespace DatabaseService
{
    public class SovaContext : DbContext
    {

        public DbSet<Post> Post { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Post>().ToTable("posts");
            modelBuilder.Entity<Post>().HasKey(x => x.postID);
            base.OnModelCreating(modelBuilder);
        }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseMySql("server=localhost;database=stackoverflow_sample_universal;uid=root;pwd=copenhagen");
            base.OnConfiguring(optionsBuilder);
        }
    }
}
