package sistemamoedas.service.impl;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import sistemamoedas.models.RequestEntity.ThirdPartyRequest;
import sistemamoedas.models.RequestEntity.UserRequest;
import sistemamoedas.models.ResponseEntity.ThirdPartyResponse;
import sistemamoedas.models.ThirdParty;
import sistemamoedas.models.User;
import sistemamoedas.repository.ThirdPartyRepository;
import sistemamoedas.service.ThirdPartyService;

import javax.persistence.NonUniqueResultException;
import java.util.Date;
import java.util.Optional;

@Service
public class ThirdPartyServiceImpl implements ThirdPartyService {


    @Autowired
    private ThirdPartyRepository thirdPartyRepository;


    @Override
    public ThirdPartyResponse create(ThirdPartyRequest request) {

        Optional<ThirdParty> verifyThirdParty = Optional.ofNullable(
                this.thirdPartyRepository.findOneByEmailAndDeletedAtIsNull(request.getEmail())
        );

        if(!verifyThirdParty.isPresent()) {

            ThirdParty thirdParty = this.thirdPartyRepository.save(ThirdPartyRequest.toThirdPart(request));

            return ThirdPartyResponse.fromThirdParty(thirdParty);
        }else{
            throw new NonUniqueResultException("Empresa Parceira Existentee - Falha ao cadastrar");
        }
    }

    @Override
    public ThirdPartyResponse edit(ThirdPartyRequest request) {
        Optional<ThirdParty> verifyThirdParty = Optional.ofNullable(
                this.thirdPartyRepository.findOneByIdThirdPartyAndDeletedAtIsNull(request.getIdThirdParty())
        );

        if(!verifyThirdParty.isPresent()) {


            ThirdParty thirdParty = this.thirdPartyRepository.save(ThirdPartyRequest.toThirdPart(request));
            return ThirdPartyResponse.fromThirdParty(thirdParty);
        }else{
            throw new NonUniqueResultException("Empresa Parceira Inexistentee - Falha ao editar");
        }
    }

    @Override
    public ThirdPartyResponse delete(Long idThirdParty) {

        Optional<ThirdParty> thirdParty = Optional.ofNullable(
                this.thirdPartyRepository.findOneByIdThirdPartyAndDeletedAtIsNull(idThirdParty)
        );
        if(thirdParty.isPresent()){
            thirdParty.get().setDeletedAt(new Date());
            return ThirdPartyResponse.fromThirdParty(
                    this.thirdPartyRepository.save(thirdParty.get())
            );
        }else{
            throw new NonUniqueResultException("Empresa Parceira Inexistente - Falha ao deletar");
        }
    }

    @Override
    public Page<ThirdParty> listThirdPartiesByPage(Pageable pages) {
        return this.thirdPartyRepository.findAllByDeletedAtIsNullOrderByIdThirdParty(pages);
    }

    @Override
    public Page<ThirdParty> listThirdPartiesByPageAndId(Pageable pages, String areaOfOperation) {
        return this.thirdPartyRepository.findAllByAreaOfOperationIgnoreCaseAndDeletedAtIsNull(pages,areaOfOperation);
    }

    @Override
    public ThirdPartyResponse getThirdPartyById(Long idThirdParty) {
        return ThirdPartyResponse.fromThirdParty(
                this.thirdPartyRepository.findOneByIdThirdPartyAndDeletedAtIsNull(idThirdParty)
        );
    }
}
