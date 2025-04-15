using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Pet_Finder_Application.Repositories;

namespace Pet_Finder_Application
{
    [ApiController]
    [Route("api/[controller]")]
    public class PetsController : ControllerBase
    {
        private readonly IPetRepository _repository;
        private readonly IAuthRepository _auth;

        public PetsController(IPetRepository repository, IAuthRepository auth)
        {
            _repository = repository;
            _auth = auth;
        }

        [HttpGet]
        [Route("GetAllPets")]
        public async Task<ActionResult<IEnumerable<Pet>>> GetAllPets()
        {
            var pets = await _repository.GetAllPets();
            return Ok(pets);
        }

        [HttpGet]
        [Route("GetMyPets")]
        public async Task<ActionResult<IEnumerable<Pet>>> GetMyPets()
        {
            var userEmail = User.FindFirst(ClaimTypes.Email)?.Value;
            if (string.IsNullOrEmpty(userEmail))
                return Unauthorized("User not identified.");

            var pets = await _repository.GetMyPets(userEmail);
            return Ok(pets);
        }

        [HttpPost]
        [Route("AddPet")]
        public async Task<ActionResult> AddPet(Pet pet)
        {
            var userEmail = User.FindFirst(ClaimTypes.Email)?.Value;
            if (string.IsNullOrEmpty(userEmail))
                return Unauthorized("User email not found in token.");

            var addedPet = await _repository.AddPet(pet, userEmail);
            return Ok(addedPet);
        }

        [HttpPatch]
        [Route("MarkAsFound")]
        public async Task<ActionResult> MarkAsFound(int id)
        {
            var userEmail = User.FindFirst(ClaimTypes.Email)?.Value;
            var result = await _repository.MarkAsFound(id, userEmail);

            if (!result) return NotFound();
            return Ok(new { message = "Pet marked as found." });
        }

        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register(RegisterDTO dto)
        {
            var result = await _auth.Register(dto);
            if (!result) return BadRequest("User already exists.");
            return Ok("User registered.");
        }

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login(LoginDto dto)
        {
            var token = await _auth.Login(dto);
            if (token == null) return Unauthorized("Invalid credentials.");
            return Ok(new { token });
        }
    }
}

