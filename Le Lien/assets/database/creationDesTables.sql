CREATE TABLE Compte (
    Id_Compte INT AUTO_INCREMENT PRIMARY KEY,
    Prenom VARCHAR(50) NOT NULL,
    Nom VARCHAR(50) NOT NULL,
    Email VARCHAR(50) NOT NULL UNIQUE,
    Mot_De_Passe VARCHAR(255) NOT NULL,
    EstAdherant BOOLEAN NOT NULL, -- Pour savoir si le compte est Adherant
    EstAdmin BOOLEAN NOT NULL -- Pour savoir si le compte est Admin
);

CREATE TABLE Formulaire (
    Id_Formulaire INT AUTO_INCREMENT PRIMARY KEY,
    Region VARCHAR(50) NOT NULL,
    Age INT NOT NULL,
    Lieu_De_Vie VARCHAR(50) NOT NULL,
    Lieu_De_Vie_Voulue BOOLEAN NOT NULL,
    Situation VARCHAR(50) NOT NULL,
    Qualite_De_Vie VARCHAR(50) NOT NULL,
    Besoin_Type VARCHAR(50) NOT NULL,
    Commentaire TEXT,
    Id_Compte INT,
    FOREIGN KEY (Id_Compte) REFERENCES Compte(Id_Compte)
);
