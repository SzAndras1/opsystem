package hu.personal.opsystem.entity;

import hu.personal.opsystem.model.UserDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user_table")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_USER_TABLE")
    @SequenceGenerator(name = "SEQ_USER_TABLE", sequenceName = "SEQ_USER_TABLE", allocationSize = 1, initialValue = 6)
    private Long id;

    private String username;

    @Enumerated(EnumType.STRING)
    private UserDto.RoleEnum role;

    private int currentWallpaperIndex;

    @ElementCollection
    @CollectionTable(name = "user_wallpaper", joinColumns = @JoinColumn(name = "id"))
    @Column(name = "wallpaper")
    private List<String> wallpapers;

    @ManyToMany
    @JoinTable(
            name = "user_application",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "app_id"))
    List<Application> applications;
}
