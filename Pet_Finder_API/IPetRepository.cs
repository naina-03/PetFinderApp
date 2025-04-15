using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Pet_Finder_Application.Repositories
{
    public interface IPetRepository
    {
        Task<IEnumerable<Pet>> GetAllPets();
        Task<IEnumerable<Pet>> GetMyPets(string userMail);
        Task<Pet> AddPet(Pet pet, string userMail);
        Task<bool> MarkAsFound(int id,string userEmail);
    }
}
