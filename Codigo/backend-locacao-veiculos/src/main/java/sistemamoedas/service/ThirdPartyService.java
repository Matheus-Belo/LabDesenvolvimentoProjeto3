package sistemamoedas.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import sistemamoedas.models.RequestEntity.ThirdPartyRequest;
import sistemamoedas.models.ResponseEntity.ThirdPartyResponse;
import sistemamoedas.models.ThirdParty;

public interface ThirdPartyService {
    ThirdPartyResponse create(ThirdPartyRequest request);

    ThirdPartyResponse edit(ThirdPartyRequest request);

    ThirdPartyResponse delete(Long idThirdParty);


    Page<ThirdParty> listThirdPartiesByPage(Pageable pages);

    Page<ThirdParty> listThirdPartiesByPageAndId(Pageable pages, String areaOfOperation);

    ThirdPartyResponse getThirdPartyById(Long idThirdParty);
}
