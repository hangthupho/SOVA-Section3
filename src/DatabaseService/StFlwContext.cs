using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using DomainModel;
using Microsoft.EntityFrameworkCore;


namespace DatabaseService
{
    public class StFlwContext : DbContext
    {

        public DbSet<Post> Posts { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Post>().ToTable("posts");
            base.OnModelCreating(modelBuilder);
        }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseMySql("server=localhost;database=stackoverflow_sample_universal;uid=raw7;pwd=raw7");
            base.OnConfiguring(optionsBuilder);
        }
    }
}
