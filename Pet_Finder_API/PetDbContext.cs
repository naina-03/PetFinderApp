using System;
using Microsoft.EntityFrameworkCore;

namespace Pet_Finder_Application
{
    public class PetDbContext : DbContext
    {
        public PetDbContext(DbContextOptions<PetDbContext> options) : base(options) { }

        public DbSet<Pet> Pets { get; set; }
        public DbSet<User> Users { get; set; }
    }
}

