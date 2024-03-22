package hu.personal.opsystem.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "application")
public class Application {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_APPLICATION_TABLE")
    @SequenceGenerator(name = "SEQ_APPLICATION_TABLE", sequenceName = "SEQ_APPLICATION_TABLE", allocationSize = 1, initialValue = 5)
    private Long id;

    private String username;

    @ManyToMany(mappedBy = "applications")
    List<User> users;
}
