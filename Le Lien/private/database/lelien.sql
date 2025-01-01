-- Suppression et création de la base de données "lelien"
-- On fait cela, car c'est plus pratique pour le développement de la BDD
DROP SCHEMA IF EXISTS lelien;
CREATE DATABASE lelien;
USE lelien;

-- Création des tables

-- Table des utilisateurs : contient les informations des utilisateurs et leurs droits d'administration
CREATE TABLE User
(
    idUser         INT AUTO_INCREMENT PRIMARY KEY,
    prenom         VARCHAR(255)                        NOT NULL,
    nom            VARCHAR(255)                        NOT NULL,
    email          VARCHAR(255)                        NOT NULL UNIQUE,
    mdp            VARCHAR(255)                        NOT NULL, -- Mots de passe hachés avec BCRYPT
    estAdmin       BOOLEAN   DEFAULT FALSE             NOT NULL, -- Indique si l'utilisateur est administrateur
    dateDeCreation TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL  -- Date d'inscription automatique
);

-- Table des cotisations : suit les abonnements des utilisateurs avec des montants et des dates
-- Utilisée pour savoir si un utilisateur est adhérent
CREATE TABLE Cotisation
(
    idCotisation INT AUTO_INCREMENT PRIMARY KEY,
    debut        TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL, -- Date de début de la cotisation
    fin          TIMESTAMP,                    -- Date de fin, lorsque la cotisation n'est plus active
    type         VARCHAR(255)   NOT NULL, -- Type de cotisation (mensuelle ou annuelle)
    montant      DECIMAL(15, 2) NOT NULL CHECK (montant > 0), -- Montant en €
    active       BOOLEAN        NOT NULL DEFAULT TRUE, -- Définit si la cotisation est active
    idUser       INT            NOT NULL, -- L'ID de l'utilisateur (de l'adhérent)
    FOREIGN KEY (idUser) REFERENCES User (idUser) ON DELETE CASCADE
);

-- Table des formulaires : collecte des réponses données pour l'enquête
CREATE TABLE Formulaire
(
    idFormulaire    INT AUTO_INCREMENT PRIMARY KEY,
    region          VARCHAR(255) NOT NULL,
    age             INT          NOT NULL CHECK (age >= 0),
    lieuDeVie       VARCHAR(255) NOT NULL,
    lieuDeVieVoulue BOOLEAN      NOT NULL,
    commentaire     TEXT,                  -- Commentaire optionnel
    idUser          INT          NOT NULL UNIQUE,
    dateDeSoumission TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    FOREIGN KEY (idUser) REFERENCES User (idUser) ON DELETE CASCADE
);

-- Table des qualités de vie : liste les différents aspects influençant la vie des utilisateurs
CREATE TABLE QualiteDeVie
(
    idQualiteDeVie INT AUTO_INCREMENT PRIMARY KEY,
    type           VARCHAR(255) NOT NULL -- Type de qualité de vie (par exemple : "Tout va bien", "Conflits familiaux", etc.)
);

-- Table des associations entre formulaires et qualités de vie, car l'utilisateur peut en avoir plusieurs
CREATE TABLE FormulaireQualiteDeVie
(
    idFormulaire   INT NOT NULL,
    idQualiteDeVie INT NOT NULL,
    PRIMARY KEY (idFormulaire, idQualiteDeVie), -- Clé primaire composite
    FOREIGN KEY (idFormulaire) REFERENCES Formulaire (idFormulaire) ON DELETE CASCADE,
    FOREIGN KEY (idQualiteDeVie) REFERENCES QualiteDeVie (idQualiteDeVie) ON DELETE CASCADE
);

-- Création des triggers

-- Trigger pour désactiver les cotisations précédentes d'un utilisateur lorsqu'une nouvelle cotisation "active" est ajoutée
DELIMITER $$
CREATE TRIGGER SetActiveCotisation
    BEFORE INSERT
    ON Cotisation
    FOR EACH ROW
BEGIN
    IF NEW.active = TRUE THEN
        UPDATE Cotisation
        SET active = FALSE, fin = CURDATE()
        WHERE idUser = NEW.idUser AND active = TRUE;
    END IF;
END$$
DELIMITER ;

-- Création des comptes administrateurs
INSERT INTO User (prenom, nom, email, mdp, estAdmin) VALUES
        ("Amsan", "Sutharsan", "amsan.sutharsan@lelien.fr", "$2y$10$tmwQh8D9BD/qrtWK9.fUnO7ZszfpT1GHDSJtV9nNB4glhcR5w6vtu", TRUE),
        ("Lucas", "Barbier", "lucas.barbier@lelien.fr", "$2y$10$/hiW5EZVjnG0i9CEBb.2S.CzIjPG/Je9wiLvA7t.tPgkYpWCmqDT2", TRUE),
        ("Abdelhilah", "Tabti", "abdelhilah.tabti@lelien.fr", "$2y$10$wkpQTnmDfm.kY6iJLhylOu1tuqORgnWC4PnGy7vImLvUitVVYNIC.", TRUE),
        ("Rayan", "Meri", "rayan.meri@lelien.fr", "$2y$10$5O1Ol0JJWUoV5MRkoyRlxOu8Nw8tZaD0FyF7imh2ZrVf/E8llowVq", TRUE);
