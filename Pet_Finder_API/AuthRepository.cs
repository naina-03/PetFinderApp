using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Pet_Finder_Application;
using Pet_Finder_Application.Repositories;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

public class AuthRepository : IAuthRepository
{
    private readonly PetDbContext _context;
    private readonly IConfiguration _config;

    public AuthRepository(PetDbContext context, IConfiguration config)
    {
        _context = context;
        _config = config;
    }

    public async Task<bool> Register(RegisterDTO dto)
    {
        if (await _context.Users.AnyAsync(u => u.Email == dto.Email))
            return false;

        var user = new User
        {
            Email = dto.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password)
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<string?> Login(LoginDto dto)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);

        if (user == null || user.PasswordHash != dto.Password)
        {
            return null;
        }

        var claims = new[]
        {
        new Claim(ClaimTypes.Email, user.Email),
        new Claim(ClaimTypes.Role, user.Role)
    };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _config["Jwt:Issuer"],
            audience: _config["Jwt:Audience"],
            claims: claims,
            expires: DateTime.Now.AddHours(1),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}