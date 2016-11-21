using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using DomainModel;
using Microsoft.EntityFrameworkCore;

namespace DatabaseService
{
    public class SovaContext : DbContext
    {
        //DbSet properties that represent collections of the specified entities in the context. It is used for create, read, update, and delete operations. This DBSet is included in DBContext, We create each Dbset properties for each table that we want to access to the database.

        public DbSet<Post> post { get; set; }
        public DbSet<User> user { get; set; }
        public DbSet<Comment> comment { get; set; }
        public DbSet<Answer> answer { get; set; }
        public DbSet<Question> question { get; set; }
        public DbSet<Linkpost> linkpost { get; set; }
        public DbSet<Marking> marking { get; set; }
        public DbSet<Tag> tag { get; set; }
        public DbSet<History> history { get; set; }
        public DbSet<search_Result> search_Results { get; set; }
        public DbSet<WeightedSearch> WeightedSearchs { get; set; }

        //Map each entity into tables of the database
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Post>().ToTable("posts");
            modelBuilder.Entity<User>().ToTable("user");
            modelBuilder.Entity<Question>().ToTable("question");
            modelBuilder.Entity<Answer>().ToTable("answers");
            modelBuilder.Entity<Comment>().ToTable("comments");
            modelBuilder.Entity<Linkpost>().ToTable("linkposts");
            modelBuilder.Entity<Marking>().ToTable("marking");
            modelBuilder.Entity<History>().ToTable("search_history");
            modelBuilder.Entity<search_Result>().HasKey(t => t.postID);
            modelBuilder.Entity<WeightedSearch>().HasKey(p => p.Id);
           
            //modelBuilder.Entity<search_Result>().HasKey(t => new { t.Id, t.Rank, t.PostBody });

            base.OnModelCreating(modelBuilder);
        }
        //connect with MySQL database

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseMySql("server=localhost;database=sova;uid=root;pwd=copenhagen");
            base.OnConfiguring(optionsBuilder);
        }
    }
}
