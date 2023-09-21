package com.raymondNg.homieComb.model.user;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

/**
 * ClassName: User
 * Package: com.raymondNg.homieComb.model
 * Description:
 *
 * @Author Wai Yan(Raymond) Ng
 * @Create 2023-09-19 14:52
 * @Version 1.0
 */

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "User")
@Table(
        name = "_user",
        uniqueConstraints = @UniqueConstraint(name = "email_unique", columnNames = "email")
)
public class User implements UserDetails {
    @Id
    @GeneratedValue
    private long id;

    @Column(
            name = "first_name",
            nullable = false
    )
    private String firstname;

    @Column(
            name = "last_name",
            nullable = false
    )
    private String lastname;

    @Column(
            name = "email",
            nullable = false
    )
    private String email;

    @Column(
            name = "password",
            nullable = false
    )
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
