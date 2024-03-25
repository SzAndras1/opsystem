package hu.personal.opsystem.entity;

import hu.personal.opsystem.model.UserDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user_table")
public class User {
    @Id
    @GeneratedValue(generator = "uuid-hibernate-generator")
    @GenericGenerator(name = "uuid-hibernate-generator", strategy = "org.hibernate.id.UUIDGenerator")
    @Type(type = "org.hibernate.type.UUIDCharType")
    private UUID id;

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
