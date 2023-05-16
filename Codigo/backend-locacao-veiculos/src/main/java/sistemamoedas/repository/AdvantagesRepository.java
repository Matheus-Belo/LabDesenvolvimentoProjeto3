package sistemamoedas.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sistemamoedas.models.Advantages;
import sistemamoedas.models.Cities;

@Repository
public interface AdvantagesRepository extends JpaRepository<Advantages,Long> {
    
}
