package ch.motocare.repo;
import ch.motocare.domain.Subscription;import org.springframework.data.jpa.repository.JpaRepository;import java.util.List;
public interface SubscriptionRepository extends JpaRepository<Subscription,Long>{List<Subscription>findByEmailIgnoreCaseOrderByCreatedAtDesc(String email);}
