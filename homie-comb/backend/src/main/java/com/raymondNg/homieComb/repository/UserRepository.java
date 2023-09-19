package com.raymondNg.homieComb.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * ClassName: User
 * Package: com.raymondNg.homieComb.repository
 * Description:
 *
 * @Author Wai Yan(Raymond) Ng
 * @Create 2023-09-19 14:47
 * @Version 1.0
 */
public interface User extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
