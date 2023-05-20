package sistemamoedas.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sistemamoedas.models.Advantages;
import sistemamoedas.models.Cities;
import sistemamoedas.models.ThirdParty;
import sistemamoedas.models.User;

import java.util.List;

@Repository
public interface AdvantagesRepository extends JpaRepository<Advantages,Long> {

    Advantages findOneByIdAdvantagesAndDeletedAtIsNull(Long idAdvantages);

    List<Advantages> findAllByDeletedAtIsNullOrderByIdAdvantagesAsc();

    Page<Advantages> findAllByDeletedAtIsNullOrderByIdAdvantages(Pageable page);

    Page<Advantages> findAllByThirdPartyAndDeletedAtIsNullOrderByIdAdvantages(Pageable page, ThirdParty thirdParty);

    Page<Advantages> findAllByAdvantageCategoryAndDeletedAtIsNullOrderByIdAdvantages(Pageable page, String advantageCategory);
    Page<Advantages> findAllByAdvantageNameAndDeletedAtIsNullOrderByIdAdvantages(Pageable page, String advantageName);


}
