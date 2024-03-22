package hu.personal.opsystem.repository;

import hu.personal.opsystem.entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ApplicationRepository extends JpaRepository<Application, Long> {
}
