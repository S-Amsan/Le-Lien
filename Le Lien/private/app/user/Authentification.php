<?php

namespace LeLien\Management\user;

use LeLien\Management\Exceptions\AuthentificationException;

class Authentification
{
    private IUserRepository $userRepository;

    public function __construct(IUserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    /**
     * Enregistre un utilisateur.
     * @throws AuthentificationException
     */
    public function register(string $prenom, string $nom, string $email, string $motDePasse, string $repeat): bool
    {
        // Vérifie si les mots de passe correspondent
        if ($motDePasse !== $repeat) {
            throw new AuthentificationException('Les mots de passe doivent être identiques', "warning");
        }
        if($this->invalideEmail($email)) {
            throw new AuthentificationException("Email invalide","warning");
        }
        // Vérifie si l'email existe déjà
        $userByEmail = $this->userRepository->findUserByEmail($email);
        if ($userByEmail) {
            throw new AuthentificationException('Un compte a déjà été créé avec cet email', "warning");
        }

        // On met le prenom et le nom en proper case : (" exemple  " -> "Exemple")
        $prenom = ucfirst(strtolower(trim($prenom)));
        $nom = ucfirst(strtolower(trim($nom)));
        // Crée un nouvel utilisateur et l'enregistre
        $user = new User($prenom, $nom, $email, $motDePasse, true);
        return $this->userRepository->saveUser($user);
    }

    /**
     * Authentifie un utilisateur.
     * @throws AuthentificationException
     */
    public function authenticate(string $email, string $motDePasse): string
    {
        // Recherche l'utilisateur par email
        $user = $this->userRepository->findUserByEmail($email);
        if (!$user) {
            throw new AuthentificationException("Aucun compte n'est associé à l'email", "warning");
        }

        // Vérifie le mot de passe avec password_verify()
        if (!password_verify($motDePasse, $user->getMotDePasse())) {
            throw new AuthentificationException("Mot de passe incorrect", "warning");
        }
        $prenom = $user->getPrenom();
        $nom = $user->getNom();
        // Retourne une indication d'authentification réussie
        return "Content de vous revoir $prenom $nom &#128522!";
    }

    private function invalideEmail(string $email) : bool {
        $email = filter_var(trim($email), FILTER_SANITIZE_EMAIL);
        return !filter_var($email, FILTER_VALIDATE_EMAIL);
    }
}
