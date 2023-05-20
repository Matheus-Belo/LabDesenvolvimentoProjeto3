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

    Page<Advantages> findAllByDeletedAtIsNullAndStatusOrderByIdAdvantages(Pageable page, String status);

    Page<Advantages> findAllByThirdPartyAndDeletedAtIsNullAndStatusOrderByIdAdvantages(Pageable page, ThirdParty thirdParty, String status);

    Page<Advantages> findAllByAdvantageCategoryAndDeletedAtIsNullAndStatusOrderByIdAdvantages(Pageable page, String advantageCategory, String status);
    Page<Advantages> findAllByAdvantageNameAndDeletedAtIsNullAndStatusOrderByIdAdvantages(Pageable page, String advantageName,String status );


}
