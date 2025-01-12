<?php

namespace LeLien\Management\user;

interface IUserRepository {
  public function saveUser(User $user): bool;
  public function saveUserCotisation(Cotisation $cotisation): bool;
  public function deleteUserCotisation(int $idUser): bool;
  public function deleteUser(int $idUser): bool;
  public function findUserByEmail(string $email): ?User;
  public function didUserRespondToTheForm(int $id): bool;
  public function userIsAdherent(string $id): bool;
  public function getUserId(string $email): int;
  public function getUserCotisation(int $id): ?Cotisation;

}