package sistemamoedas.service.impl;


import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import sistemamoedas.models.*;
import sistemamoedas.models.RequestEntity.ThirdPartyRequest;
import sistemamoedas.models.RequestEntity.UserRequest;
import sistemamoedas.models.ResponseEntity.ThirdPartyResponse;
import sistemamoedas.models.dto.AddressDto;
import sistemamoedas.repository.AddressRepository;
import sistemamoedas.repository.ThirdPartyRepository;
import sistemamoedas.service.CityService;
import sistemamoedas.service.StateService;
import sistemamoedas.service.ThirdPartyService;

import javax.persistence.NonUniqueResultException;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ThirdPartyServiceImpl implements ThirdPartyService {


    @Autowired
    private ThirdPartyRepository thirdPartyRepository;

    @Autowired
    private CityService cityService;

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private StateService stateService;


    @Override
    public ThirdPartyResponse create(ThirdPartyRequest request) throws NotFoundException {

        Optional<ThirdParty> verifyThirdParty = Optional.ofNullable(
                this.thirdPartyRepository.findOneByEmailAndDeletedAtIsNull(request.getEmail())
        );

        if(!verifyThirdParty.isPresent()) {

            Cities city = this.cityService.findByCity(request.getAddress().getCity());
            States state = this.stateService.findByUf(request.getAddress().getState());

            AddressDto addressDto = request.getAddress();
            Address address = this.addressRepository.save(Address.fromAddressDTO(addressDto, city, state));


            ThirdParty thirdParty = this.thirdPartyRepository.save(ThirdPartyRequest.toThirdPart(request,address));

            return ThirdPartyResponse.fromThirdParty(thirdParty);
        }else{
            throw new NonUniqueResultException("Empresa Parceira Existentee - Falha ao cadastrar");
        }
    }

    @Override
    public ThirdPartyResponse edit(ThirdPartyRequest request) throws NotFoundException {
        Optional<ThirdParty> verifyThirdParty = Optional.ofNullable(
                this.thirdPartyRepository.findOneByIdThirdPartyAndDeletedAtIsNull(request.getIdThirdParty())
        );

        if(verifyThirdParty.isPresent()) {
            Cities city = this.cityService.findByCity(request.getAddress().getCity());
            States state = this.stateService.findByUf(request.getAddress().getState());

            AddressDto addressDto = request.getAddress();
            Address address = this.addressRepository.save(Address.fromAddressDTO(addressDto, city, state));

            ThirdParty thirdParty = this.thirdPartyRepository.save(ThirdPartyRequest.toThirdPart(request,address));
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

    @Override
    public ThirdParty getThirdPartyByIdThirdParty(Long idThirdParty) {
        return this.thirdPartyRepository.findOneByIdThirdPartyAndDeletedAtIsNull(idThirdParty);
    }

    @Override
    public List<ThirdParty> getAllThirdParties() throws NotFoundException {
        return thirdPartyRepository.findAllByDeletedAtIsNullOrderByIdThirdPartyAsc();
    }



}
