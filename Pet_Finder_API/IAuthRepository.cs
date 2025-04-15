using Pet_Finder_Application;

namespace Pet_Finder_Application.Repositories
{
    public interface IAuthRepository
    {
        Task<bool> Register(RegisterDTO dto);
        Task<string?> Login(LoginDto dto);
    }
}