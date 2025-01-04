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

-- Note : Nous ne stockons pas le moyen de paiement, car cela est facultatif pour le développement.
-- Étant donné qu'il s'agit d'une simulation, ce niveau de détail n'est pas nécessaire pour notre contexte.
CREATE TABLE Cotisation
(
    idCotisation INT AUTO_INCREMENT PRIMARY KEY,
    debut        TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,                     -- Date de début de la cotisation
    fin          TIMESTAMP,                                                        -- Date de fin, lorsque la cotisation n'est plus active
    type         ENUM ('mensuelle', 'annuelle')      NOT NULL,                     -- Type de cotisation (mensuelle ou annuelle)
    montant      DECIMAL(15, 2)                      NOT NULL CHECK (montant > 0), -- Montant en €
    idUser       INT                                 NOT NULL,                     -- L'ID de l'utilisateur (de l'adhérent)
    FOREIGN KEY (idUser) REFERENCES User (idUser) ON DELETE CASCADE
);

-- Table des formulaires : collecte des réponses données pour l'enquête
CREATE TABLE Formulaire
(
    idFormulaire     INT AUTO_INCREMENT PRIMARY KEY,
    region           VARCHAR(255)                        NOT NULL,
    age              INT                                 NOT NULL CHECK (age >= 0),
    lieuDeVie        VARCHAR(255)                        NOT NULL,
    lieuDeVieVoulue  BOOLEAN                             NOT NULL,
    commentaire      TEXT, -- Commentaire optionnel
    idUser           INT                                 NOT NULL UNIQUE,
    dateDeSoumission TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    FOREIGN KEY (idUser) REFERENCES User (idUser) ON DELETE CASCADE
);

-- Table des qualités de vie : liste les différents aspects influençant la vie des utilisateurs
CREATE TABLE QualiteDeVie
(
    idQualiteDeVie INT AUTO_INCREMENT PRIMARY KEY,
    type           VARCHAR(255) NOT NULL UNIQUE -- Type de qualité de vie (par exemple : "Tout va bien", "Conflits familiaux", etc.)
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






-- Création des procédures et fonctions

DELIMITER ;
-- renvoie le dernier Id dans la table User
CREATE FUNCTION getDernierIdUser()
    RETURNS INT
    DETERMINISTIC
BEGIN
    DECLARE dernierId INT;
    SELECT IFNULL(MAX(idUser), 0) INTO dernierId FROM User;
    RETURN dernierId;
END;
DELIMITER ;

DELIMITER ;
-- insere dans la table les 11 type de qualite de vie
CREATE PROCEDURE CreerTypeQualiteDeVie()
BEGIN
    INSERT INTO QualiteDeVie (type)
    VALUES ("tout_va_bien"),
           ("restriction_sociale"),
           ("souffrance_psy"),
           ("fatigue"),
           ("reduction_activite"),
           ("couts_financiers"),
           ("impact_fratri"),
           ("conflits_familiaux"),
           ("maladie_difficultes"),
           ("eloignement_personne"),
           ("douleurs_physiques");
END;
DELIMITER ;

DELIMITER ;
-- fait le lien entre le type données et l'id dans QualiteDeVie
CREATE PROCEDURE ajouterReponseQualiteDeVie(
    IN pIdFormulaire INT,
    IN pType VARCHAR(255)
)
BEGIN
    DECLARE pIdQualiteDeVie INT;
    -- Vérifier si le type existe dans la table QualiteDeVie et le récupère si c'est le cas
    SELECT idQualiteDeVie
    INTO pIdQualiteDeVie
    FROM QualiteDeVie
    WHERE type = pType;

    -- Si le type n'existe pas, on le crée
    IF pIdQualiteDeVie IS NULL THEN
        INSERT INTO QualiteDeVie(type)
        VALUES (pType);

        -- Récupérer l'id du nouveau type
        SET pIdQualiteDeVie = LAST_INSERT_ID();
    END IF;

    -- On peut insérer dans FormulaireQualiteDeVie
    INSERT INTO FormulaireQualiteDeVie(idFormulaire, idQualiteDeVie)
    VALUES (pIdFormulaire, pIdQualiteDeVie);
END;
DELIMITER ;

DELIMITER ;
-- On ajoute une nouvelle cotisation et en annule le reste
-- Note : Je voulais crée un Trigger mais on peut pas car MariaDB bloque à cause d'un risque de boucle infini
CREATE PROCEDURE AjouterCotisation(
    IN pIdUser INT,
    IN pType VARCHAR(255),
    IN pMontant DECIMAL(15, 2)
)
BEGIN
    -- Désactiver les cotisations actives existantes pour cet utilisateur
    UPDATE Cotisation
    SET fin = CURRENT_TIMESTAMP
    WHERE idUser = pIdUser
      AND fin IS NULL;

    -- Ajouter la nouvelle cotisation
    INSERT INTO Cotisation (idUser, type, montant)
    VALUES (pIdUser, pType, pMontant);
END;
DELIMITER ;

DELIMITER ;
-- On supprime la cotisation en cours
CREATE PROCEDURE supprimerCotisation(
    IN pIdUser INT
)
BEGIN
    -- Désactiver les cotisations actives existantes pour cet utilisateur
    UPDATE Cotisation
    SET fin = CURRENT_TIMESTAMP
    WHERE idUser = pIdUser
      AND fin IS NULL;
END;
DELIMITER ;

DELIMITER ;
-- crée des faux utilisateurs, adhérent et réponse au formulaire (on insere dans les table)
CREATE PROCEDURE GenererFausseDonnées(
    IN nbUtilisateurs INT,
    IN pourcentageAdherent DOUBLE,
    IN pourcentageReponse DOUBLE
)
BEGIN
    DECLARE idDepart INT DEFAULT getDernierIdUser() + 1;
    CALL GenererUtilisateurs(nbUtilisateurs, idDepart);
    CALL GenererCotisations(FLOOR(nbUtilisateurs * pourcentageAdherent), idDepart);
    CALL GenererReponsesFormulaire(FLOOR(nbUtilisateurs * pourcentageAdherent * pourcentageReponse), idDepart);
END;
DELIMITER ;

DELIMITER ;
CREATE PROCEDURE GenererUtilisateurs
(
    IN nbUtilisateurs INT,
    IN idDepart INT
)
BEGIN
    DECLARE i INT DEFAULT 1;
    WHILE i < nbUtilisateurs + 1
        DO
            INSERT INTO User (prenom, nom, email, mdp)
            VALUES (CONCAT("FaussePersonne", i+idDepart-1),
                    CONCAT("Compte", i+idDepart-1),
                    CONCAT("faux.compte", i+idDepart-1, "@lelien.fr"),
                    "$2y$10$rrQV86gpsRXw9TdwsAqXj.JmDLPyTeGxwXaN1x.5AKW2rldZnUT0G" -- Ils ont tous le même mdp ce sont des faux comptes, le mot de passe est "000" et ne marche que pour le 1er compte
                   );
            SET i = i + 1;
        END WHILE;
END;
DELIMITER ;

DELIMITER ;
CREATE PROCEDURE GenererCotisations(
    IN nbCotisations INT,
    IN idDepart INT
)
BEGIN
    DECLARE idUser INT DEFAULT idDepart;

    WHILE idUser < nbCotisations + idDepart
        DO
            IF RAND() <= 1 / 3 THEN -- 1 chance sur 3 que le montant soit annuelle
            -- Type "annuelle" avec un montant entre 30 et 120 €
                CALL AjouterCotisation(
                        idUser,
                        'annuelle',
                        ROUND(FLOOR(RAND() * (120 - 30 + 1) + 30) + IF(RAND() < 1 / 10, 0, 0.5), 2)
                     );
            ELSE
                -- Type "mensuelle" avec un montant entre 2 et 16 €
                CALL AjouterCotisation(
                        idUser,
                        'mensuelle',
                        ROUND(FLOOR(RAND() * (16 - 2 + 1) + 2) + IF(RAND() < 1 / 3, 0, 0.5), 2)
                     );
            END IF;

            -- On passe au prochain
            SET idUser = idUser + 1;
        END WHILE;
END;
DELIMITER ;

DELIMITER ;
CREATE PROCEDURE GenererReponsesFormulaire(
    IN nbReponses INT,
    IN idDepart INT
)
BEGIN
    -- formulaire
    DECLARE pIdUser INT DEFAULT idDepart;
    DECLARE pRegion VARCHAR(255);
    DECLARE pAge INT;
    DECLARE pLieuDeVie VARCHAR(255);
    DECLARE pLieuDeVieVoulue BOOLEAN;
    DECLARE pCommentaire TEXT;

    -- formulaireQualiteDeVie
    -- y'a pas de tableau :(, donc c'est pour ça que c'est le bordel
    DECLARE nbQualiteDeVie INT;
    DECLARE i INT DEFAULT 0;
    DECLARE pIdFormulaire INT;
    DECLARE const_typesQualiteDeVie VARCHAR(255) DEFAULT 'restriction_sociale,souffrance_psy,fatigue,reduction_activite,couts_financiers,impact_fratri,conflits_familiaux,maladie_difficultes,eloignement_personne,douleurs_physiques';
    DECLARE pType VARCHAR(255);
    DECLARE n INT;
    DECLARE typesQualiteDeVie TEXT DEFAULT const_typesQualiteDeVie;

    WHILE pIdUser < nbReponses + idDepart
        DO
            -- 1) Choix de la région avec une probabilité plus élevée pour certaines regions
            SET pRegion = CASE
                              WHEN RAND() <= 0.03 THEN 'auvergne-rhone-alpes'               -- 3% de chance
                              WHEN RAND() <= 0.06 THEN 'bourgogne-franche-comte'            -- 3% de chance
                              WHEN RAND() <= 0.21 THEN 'bretagne'                           -- 15% de chance
                              WHEN RAND() <= 0.22 THEN 'centre-val-de-loire'                -- 1% de chance
                              WHEN RAND() <= 0.24 THEN 'corse'                              -- 2% de chance
                              WHEN RAND() <= 0.39 THEN 'grand-est'                          -- 15% de chance
                              WHEN RAND() <= 0.47 THEN 'hauts-de-france'                    -- 8% de chance
                              WHEN RAND() <= 0.67 THEN 'ile-de-france'                      -- 20% de chance
                              WHEN RAND() <= 0.79 THEN 'normandie'                          -- 12.5% de chance
                              WHEN RAND() <= 0.83 THEN 'nouvelle-aquitaine'                 -- 4% de chance
                              WHEN RAND() <= 0.86 THEN 'occitanie'                          -- 3% de chance
                              WHEN RAND() <= 0.92 THEN 'pays-de-la-loire'                   -- 6% de chance
                              WHEN RAND() <= 0.94 THEN 'provence-alpes-cote-dazur'          -- 2% de chance
                              WHEN RAND() <= 0.95 THEN 'guadeloupe'                         -- 0.1% de chance
                              WHEN RAND() <= 0.96 THEN 'guyane'                             -- 0.1% de chance
                              WHEN RAND() <= 0.97 THEN 'martinique'                         -- 0.1% de chance
                              WHEN RAND() <= 0.98 THEN 'mayotte'                            -- 0.1% de chance
                              WHEN RAND() <= 0.99 THEN 'reunion'                            -- 0.1% de chance
                              ELSE 'etranger'                                               -- 5% de chance
                END;

            -- 2) âge entre 19 et 72
            SET pAge = FLOOR(RAND() * (72 - 19 + 1)) + 19;

            -- 3) Choix aléatoire du lieu de vie (10% ou 5%)
            SET pLieuDeVie = CASE
                                 WHEN RAND() <= 0.1 THEN 'dans-la-famille-en-permanence'
                                 WHEN RAND() <= 0.2 THEN 'avec-une-solution-d-accueil'
                                 WHEN RAND() <= 0.3 THEN 'dans-la-famille-principalement'
                                 WHEN RAND() <= 0.4 THEN 'dans-un-logement-indépendant'
                                 WHEN RAND() <= 0.5 THEN 'dans-un-habitat-inclusif'
                                 WHEN RAND() <= 0.6 THEN 'dans-un-foyer-d-accueil-médicalisé'
                                 WHEN RAND() <= 0.7 THEN 'dans-une-maison-d-accueil-médicalisée'
                                 WHEN RAND() <= 0.8 THEN 'dans-un-foyer-de-vie-ou-foyer-d-hébergement'
                                 WHEN RAND() <= 0.85 THEN 'en-IME-avec-internat'            -- 5% de chance
                                 WHEN RAND() <= 0.9 THEN 'hospitalisation-en-psychiatrie'   -- 5% de chance
                                 ELSE 'autre'
                END;

            -- 4) 1 chance sur 6 que le lieu de vie ne corresponde pas
            SET pLieuDeVieVoulue = IF(RAND() <= 1 / 6, FALSE, TRUE);

            -- 5) On pourrait laisser vide, mais je met ça en commentaire pour différentier les vrais des faux
            SET pCommentaire = CONCAT('fausse personne n°', pIdUser);

            -- 6) Insertion dans le formulaire
            INSERT INTO formulaire (idUser, region, age, lieuDeVie, lieuDeVieVoulue, commentaire)
            VALUES (pIdUser,pRegion,pAge,pLieuDeVie,pLieuDeVieVoulue,pCommentaire);


            -- 7) On met des données dans formulaireQualiteDeVie
            SET pIdFormulaire = LAST_INSERT_ID();                           -- On récupère l'id du formulaire
            SET nbQualiteDeVie = FLOOR(RAND() * (FLOOR(RAND() * 12))) + 1;  -- Nombre aléatoire entre 1 et 11, plus le chiffre est grand et moins y'a de proba
            SET typesQualiteDeVie = const_typesQualiteDeVie;                -- On réinitialise les variables
            SET i = 0;                                                      -- On réinitialise les variables

            IF nbQualiteDeVie = 1 AND RAND() > 3 / 4 THEN -- 75% chance que tout va bien si y'a que 1 qualite de vie
                CALL ajouterReponseQualiteDeVie(pIdFormulaire, 'tout_va_bien');
            ELSE
                WHILE i < nbQualiteDeVie
                    DO
                        -- trouve l'index d'une qualité de vie dans la variable
                        SET n = FLOOR(1 + (RAND() *(LENGTH(typesQualiteDeVie) - LENGTH(REPLACE(typesQualiteDeVie, ',', '')) +1)));
                        -- On le selectionne
                        SET pType = SUBSTRING_INDEX(SUBSTRING_INDEX(typesQualiteDeVie, ',', n), ',', -1);
                        IF pType != '' THEN
                            CALL ajouterReponseQualiteDeVie(pIdFormulaire, pType);
                            -- On le supprime
                            SET typesQualiteDeVie = REPLACE(CONCAT(',', typesQualiteDeVie, ','), CONCAT(',', pType, ','), ',');
                            SET typesQualiteDeVie = TRIM(BOTH ',' FROM typesQualiteDeVie);
                        END IF;
                        SET i = i + 1;
                    END WHILE;
            END IF;
            SET pIdUser = pIdUser + 1;
        END WHILE;
END;
DELIMITER ;







-- Création des différents types de qualité de vie
CALL CreerTypeQualiteDeVie();

-- Création des comptes utilisateurs

-- 1) comptes administrateurs (mdp top secret)
INSERT INTO User (prenom, nom, email, mdp, estAdmin)
VALUES ("Amsan", "Sutharsan", "amsan.sutharsan@lelien.fr","$2y$10$tmwQh8D9BD/qrtWK9.fUnO7ZszfpT1GHDSJtV9nNB4glhcR5w6vtu", TRUE),
       ("Lucas", "Barbier", "lucas.barbier@lelien.fr", "$2y$10$/hiW5EZVjnG0i9CEBb.2S.CzIjPG/Je9wiLvA7t.tPgkYpWCmqDT2",TRUE),
       ("Abdelhilah", "Tabti", "abdelhilah.tabti@lelien.fr","$2y$10$wkpQTnmDfm.kY6iJLhylOu1tuqORgnWC4PnGy7vImLvUitVVYNIC.", TRUE),
       ("Rayan", "Meri", "rayan.meri@lelien.fr", "$2y$10$5O1Ol0JJWUoV5MRkoyRlxOu8Nw8tZaD0FyF7imh2ZrVf/E8llowVq", TRUE);
CALL AjouterCotisation(1, "annuelle", 1.00);  -- 1€ symbolique
CALL AjouterCotisation(2, "annuelle", 1.00);
CALL AjouterCotisation(3, "annuelle", 1.00);
CALL AjouterCotisation(4, "annuelle", 1.00);


-- 2) autres comptes (Pas Adhérent et pas Admin avec mdp="2025"):
INSERT INTO User (prenom, nom, email, mdp)
VALUES ("Phuong", "Nguyen", "phuong.nguyen@lelien.fr","$2y$10$/CM59zupeFgw2OIOL/kmrOtNSeFhrFd/IF8he5NnhUxz0S4cZrJwu"),
       ("Mohamed Amine", "Abdeljebbar", "mohamedamine.abdeljebbar@lelien.fr","$2y$10$goUKnCHyYTnVT5UeB3vIUOKpcdunHSt7oSBN2imdH1Bvdbk03dFRi"),
       ("Oskar", "Jakubczyk", "oskar.jakubczyk@lelien.fr","$2y$10$.m/Vo2xTuol81v5mx1y97.bHCtvlSBMINH.p7EeUtg67nzzaU8q02"),
       ("Sayeed", "Mohamed Abu", "sayeed.mohamedabu@lelien.fr","$2y$10$C4E2GdAbp4uchABMhaYwxuMmZZNQrnoYV8li.uJxHoEwetvpGXceq"),
       ("Jean Baptiste", "Ramette", "jeanbaptiste.ramette@lelien.fr","$2y$10$I/RinsGEJrUcjkxOp/bHeumWDcW73l1jILCfWo0.z.rdS4MYGjtO6");

-- Géneration aléatoire de fausses données






