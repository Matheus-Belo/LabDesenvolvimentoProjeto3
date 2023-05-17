package sistemamoedas.service.impl;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import sistemamoedas.models.Advantages;
import sistemamoedas.models.RequestEntity.AdvantagesRequest;
import sistemamoedas.models.ResponseEntity.AdvantagesResponse;
import sistemamoedas.service.AddressService;
import sistemamoedas.service.AdvantageService;

@Service
public class AdvantageServiceImpl implements AdvantageService {
    @Override
    public AdvantagesResponse createAdvantage(AdvantagesRequest request) {
        return null;
    }

    @Override
    public AdvantagesResponse editAdvantage(AdvantagesRequest request) {
        return null;
    }

    @Override
    public AdvantagesResponse deleteAdvantage(Long idAdvantage) {
        return null;
    }

    @Override
    public Page<Advantages> listAdvantagesByPage(Pageable pages) {
        return null;
    }

    @Override
    public Page<Advantages> listAdvantagesByPageAndThirdPartyId(Pageable pages, Long idThirdParty) {
        return null;
    }

    @Override
    public Advantages getAdvantageById(Long idAdvantage) {
        return null;
    }

    @Override
    public Page<Advantages> listAdvantagesByPageAndCategory(Pageable pages, String category) {
        return null;
    }

    @Override
    public Page<Advantages> listAdvantagesByPageAndName(Pageable pages, String advantagename) {
        return null;
    }
}
