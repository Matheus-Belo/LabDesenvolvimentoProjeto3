package sistemamoedas.service.impl;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import sistemamoedas.models.*;
import sistemamoedas.models.RequestEntity.AdvantagesRequest;
import sistemamoedas.models.RequestEntity.UserRequest;
import sistemamoedas.models.ResponseEntity.AdvantagesResponse;
import sistemamoedas.models.dto.AddressDto;
import sistemamoedas.models.dto.UserDto;
import sistemamoedas.repository.AdvantagesRepository;
import sistemamoedas.service.AddressService;
import sistemamoedas.service.AdvantageService;

import javax.persistence.NonUniqueResultException;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class AdvantageServiceImpl implements AdvantageService {

    @Autowired
    AdvantagesRepository advantagesRepository;
    @Override
    public AdvantagesResponse createAdvantage(AdvantagesRequest request) {
        Optional<Advantages> advantageCheck = Optional.ofNullable(this.advantagesRepository.findOneByIdAdvantageAndDeletedAtIsNull(request.getIdAdvantages()));

        if(!advantageCheck.isPresent()){

            List<Role> roles = Optional.of(this.roleService.findAllByNameIn(user.getRoles()))
                    .orElseThrow(() -> new NoSuchElementException("Role not Founded"));

            user.setPassword(this.bcryptEncoder.encode(user.getPassword()));


            Cities city = this.cityService.findByCity(user.getAddress().getCity());
            States state = this.stateService.findByUf(user.getAddress().getState());

            AddressDto addressDto = user.getAddress();
            Address address = this.addressRepository.save(Address.fromAddressDTO(addressDto, city, state));

            User savedUser = this.userRepository.save(UserRequest.toUser(user, roles, address));

            /*if(roles.stream().anyMatch(f -> f.getName().equals(RolesEnum.USER.getCode()))){
                this.monthlyPaymentService.create(savedUser);
            }*/
            return UserDto.fromUser(savedUser);
        }else{
            throw new NonUniqueResultException("Email ja cadastrado!");
        }
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
