using System;
using Pet_Finder_Application;
using Pet_Finder_Application.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Pet_Finder_Application.Repositories
{
    public class PetRepository : IPetRepository
    {
        private readonly PetDbContext _context;

        public PetRepository(PetDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Pet>> GetAllPets()
        {
            return await _context.Pets.Where(p => p.IsLost).ToListAsync();
        }

        public async Task<IEnumerable<Pet>> GetMyPets(string userEmail)
        {
            if (string.IsNullOrEmpty(userEmail))
                return new List<Pet>();

            return await _context.Pets
                .Where(p => p.CreatedBy == userEmail && p.IsLost)
                .ToListAsync();
        }

        public async Task<Pet> AddPet(Pet pet, string userEmail)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == userEmail);
            if (user == null)
                throw new Exception("User not found.");

            pet.CreatedBy = user.Email;
            _context.Pets.Add(pet);
            await _context.SaveChangesAsync();
            return pet;
        }

        public async Task<bool> MarkAsFound(int id, string userEmail)
        {
            var pet = await _context.Pets.FirstOrDefaultAsync(p => p.Id == id && p.CreatedBy == userEmail);

            if (pet == null) return false;

            pet.IsLost = false;
            await _context.SaveChangesAsync();
            return true;
        }
    }
}