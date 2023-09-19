package com.homiecomb.demo.repository;

import com.homiecomb.demo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * ClassName: UserRepository
 * Package: com.example.demo.repository
 * Description:
 *
 * @Author Wai Yan(Raymond) Ng
 * @Create 2023-09-16 17:24
 * @Version 1.0
 */

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
