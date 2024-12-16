<?php

namespace LeLien\Management;

use LeLien\Management\User;

interface IUserRepository {
  public function saveUser(User $user): bool;
  public function findUserByEmail(string $email): ?User;
}