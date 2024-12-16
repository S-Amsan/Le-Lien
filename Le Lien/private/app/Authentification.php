<?php

namespace LeLien\Management;

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

        // Vérifie si l'email existe déjà
        $userByEmail = $this->userRepository->findUserByEmail($email);
        if ($userByEmail) {
            throw new AuthentificationException('Un compte a déjà été créé avec cet email', "warning");
        }

        // Crée un nouvel utilisateur et l'enregistre
        $user = new User($prenom, $nom, $email, $motDePasse);
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

        // Retourne une indication d'authentification réussie
        return "Authentification réussie";
    }
}
