package sistemamoedas.service;

import javassist.NotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import sistemamoedas.models.RequestEntity.ThirdPartyRequest;
import sistemamoedas.models.ResponseEntity.ThirdPartyResponse;
import sistemamoedas.models.ThirdParty;

import java.util.List;

public interface ThirdPartyService {
    ThirdPartyResponse create(ThirdPartyRequest request) throws NotFoundException;

    ThirdPartyResponse edit(ThirdPartyRequest request) throws NotFoundException;

    ThirdPartyResponse delete(Long idThirdParty);


    Page<ThirdParty> listThirdPartiesByPage(Pageable pages);

    Page<ThirdParty> listThirdPartiesByPageAndId(Pageable pages, String areaOfOperation);

    ThirdPartyResponse getThirdPartyById(Long idThirdParty);

    ThirdParty getThirdPartyByIdThirdParty(Long idThirdParty);

    List<ThirdParty> getAllThirdParties()throws NotFoundException;

}
