package com.homiecomb.demo.repository;

import com.homiecomb.demo.model.Property;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * ClassName: TaskRepository
 * Package: com.example.demo.repository
 * Description:
 *
 * @Author Wai Yan(Raymond) Ng
 * @Create 2023-09-15 19:07
 * @Version 1.0
 */

public interface PropertyRepository extends JpaRepository<Property, Long> {
}
