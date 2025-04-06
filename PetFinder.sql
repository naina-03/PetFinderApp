CREATE DATABASE PetFinderDb;
USE PetFinderDb;

CREATE TABLE Pets (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Name NVARCHAR(100),
    Description NVARCHAR(500),
    DateLost DATE,
    Location NVARCHAR(100),
    ContactInfo NVARCHAR(50),
    ImageUrl TEXT,
    IsLost BIT DEFAULT 1,
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

Select * from pets;

ALTER TABLE Pets MODIFY COLUMN ImageUrl LONGTEXT;
ALTER TABLE Pets ADD CreatedBy NVARCHAR(100);

INSERT INTO Pets (Name, Description, DateLost, Location, ContactInfo, ImageUrl, IsLost)
VALUES 
('Buddy', 'Small brown dog with a red collar', '2025-04-01', 'Central Park, NYC', '555-1234', 'https://example.com/buddy.jpg', 1);


CREATE TABLE Users (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    FullName NVARCHAR(100),
    Email NVARCHAR(100) NOT NULL UNIQUE,
    PasswordHash NVARCHAR(255) NOT NULL,
    Role NVARCHAR(50) DEFAULT 'User',
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE RefreshTokens (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Token NVARCHAR(255) NOT NULL,
    ExpiresAt DATETIME NOT NULL,
    IsRevoked BIT DEFAULT 0,
    UserId INT NOT NULL,
    CONSTRAINT FK_RefreshTokens_Users FOREIGN KEY (UserId) REFERENCES Users(Id)
);

select * from users;

INSERT INTO Users (FullName, Email, PasswordHash, Role)
VALUES ('Test User2', 'testing@example.com', 'test123', 'User');

update pets
set createdBy = 'testing@example.com'
where id = 3



