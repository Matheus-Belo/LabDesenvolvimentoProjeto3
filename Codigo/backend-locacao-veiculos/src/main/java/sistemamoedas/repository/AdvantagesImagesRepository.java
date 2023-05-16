package sistemamoedas.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sistemamoedas.models.Advantages;
import sistemamoedas.models.AdvantagesImages;

@Repository
public interface AdvantagesImagesRepository extends JpaRepository<AdvantagesImages,Long> {
    
}
