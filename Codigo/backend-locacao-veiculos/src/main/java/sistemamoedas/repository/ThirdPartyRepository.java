package sistemamoedas.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import sistemamoedas.models.ThirdParty;
import sistemamoedas.models.User;

import java.util.List;

@Repository
public interface ThirdPartyRepository extends JpaRepository<ThirdParty,Long > {


    ThirdParty findOneByIdThirdPartyAndDeletedAtIsNull(Long idThirdParty);
    Page<ThirdParty> findAllByDeletedAtIsNullOrderByIdThirdParty(Pageable page);
    Page<ThirdParty> findAllByAreaOfOperationIgnoreCaseAndDeletedAtIsNull(Pageable page, String areaOfOperation);

    ThirdParty findOneByEmailAndDeletedAtIsNull(String email);
}
