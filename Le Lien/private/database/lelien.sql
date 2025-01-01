DROP SCHEMA lelien;
CREATE DATABASE lelien;

USE lelien;

CREATE TABLE User
(
    idUser         INT AUTO_INCREMENT PRIMARY KEY,
    prenom         VARCHAR(255)                        NOT NULL,
    nom            VARCHAR(255)                        NOT NULL,
    email          VARCHAR(255)                        NOT NULL UNIQUE,
    mdp            VARCHAR(255)                        NOT NULL,
    estAdmin       BOOLEAN                             NOT NULL,
    dateDeCreation TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE Cotisation
(
    idCotisation INT AUTO_INCREMENT PRIMARY KEY,
    debut        DATE           NOT NULL,
    fin          DATE,
    type         VARCHAR(255)   NOT NULL,
    montant      DECIMAL(15, 2) NOT NULL CHECK (montant > 0),
    active       BOOLEAN        NOT NULL DEFAULT TRUE,
    idUser       INT            NOT NULL,
    FOREIGN KEY (idUser) REFERENCES User (idUser) ON DELETE CASCADE
);

CREATE TRIGGER SetActiveCotisation
    BEFORE INSERT
    ON Cotisation
    FOR EACH ROW
BEGIN
    IF NEW.active = TRUE THEN
        UPDATE Cotisation
        SET active = FALSE
        WHERE idUser = NEW.idUser;
    END IF;
END;

CREATE TABLE Formulaire
(
    idFormulaire    INT AUTO_INCREMENT PRIMARY KEY,
    region          VARCHAR(255) NOT NULL,
    age             INT          NOT NULL CHECK (age >= 0),
    lieuDeVie       VARCHAR(255) NOT NULL,
    lieuDeVieVoulue BOOLEAN      NOT NULL,
    commentaire     TEXT,
    idUser          INT          NOT NULL UNIQUE,
    dateDeSoumission TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    FOREIGN KEY (idUser) REFERENCES User (idUser) ON DELETE CASCADE
);

CREATE TABLE QualiteDeVie
(
    idQualiteDeVie INT AUTO_INCREMENT PRIMARY KEY,
    type           VARCHAR(255) NOT NULL
);

CREATE TABLE FormulaireQualiteDeVie
(
    idFormulaire   INT NOT NULL,
    idQualiteDeVie INT NOT NULL,
    PRIMARY KEY (idFormulaire, idQualiteDeVie),
    FOREIGN KEY (idFormulaire) REFERENCES Formulaire (idFormulaire) ON DELETE CASCADE,
    FOREIGN KEY (idQualiteDeVie) REFERENCES QualiteDeVie (idQualiteDeVie) ON DELETE CASCADE
);

