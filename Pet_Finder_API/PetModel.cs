using System;
namespace Pet_Finder_Application
{
    public class Pet
    {
        public int Id { get; set; }
        public string? Name { get; set; } = string.Empty;
        public string? Description { get; set; } = string.Empty;
        public DateTime DateLost { get; set; } = DateTime.Now;
        public string? Location { get; set; } = string.Empty;
        public string? ContactInfo { get; set; } = string.Empty;
        public string? ImageUrl { get; set; } = string.Empty;
        public bool IsLost { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public string? CreatedBy { get; set; } = string.Empty;
    }
}

