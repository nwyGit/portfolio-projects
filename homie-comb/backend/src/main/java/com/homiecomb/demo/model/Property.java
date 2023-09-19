package com.homiecomb.demo.model;

import jakarta.persistence.*;
import lombok.Getter;

/**
 * ClassName: Task
 * Package: com.example.demo.model
 * Description:
 *
 * @Author Wai Yan(Raymond) Ng
 * @Create 2023-09-15 19:07
 * @Version 1.0
 */

@Getter
@Entity(name = "Property")
@Table(
        name = "Properties",
        uniqueConstraints = {
                @UniqueConstraint(name = "title_unique", columnNames = "title")
        }
)
public class Property {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(
            name = "title",
            nullable = false,
            columnDefinition = "varchar(255) default ''"
    )
    private String title;
    @Column(
            name = "completed",
            nullable = false,
            columnDefinition = "boolean default false"
    )
    private boolean completed;

    public void setTitle(String title) {
        this.title = title;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    public void setId(Long id) {
    }
}
