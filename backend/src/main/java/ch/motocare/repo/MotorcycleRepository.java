package ch.motocare.repo;
import ch.motocare.domain.Motorcycle;import org.springframework.data.jpa.repository.JpaRepository;
public interface MotorcycleRepository extends JpaRepository<Motorcycle,Long>{}
