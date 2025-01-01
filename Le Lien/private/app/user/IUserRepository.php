<?php

namespace LeLien\Management\user;

interface IUserRepository {
  public function saveUser(User $user): bool;
  public function saveUserCotisation(Cotisation $cotisation): bool;
  public function findUserByEmail(string $email): ?User;
  public function findUserFormById(int $id): bool;
  public function findUserCotisationById(int $id): ?Cotisation;
}