package sistemamoedas.service.impl;

import sistemamoedas.enums.RolesEnum;
import sistemamoedas.models.*;
import sistemamoedas.models.RequestEntity.UserRequest;
import sistemamoedas.models.dto.AddressDto;
import sistemamoedas.models.dto.UserDto;
import sistemamoedas.repository.AddressRepository;
import sistemamoedas.repository.UserRepository;
import sistemamoedas.service.*;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.persistence.NonUniqueResultException;
import java.math.BigDecimal;
import java.util.*;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private PasswordEncoder bcryptEncoder;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleService roleService;

    @Autowired
    private CityService cityService;

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private StateService stateService;


    @Override
    public UserDto create(UserRequest user) throws NonUniqueResultException, NotFoundException {

        Optional<User> usr = Optional.ofNullable(this.userRepository.findOneByEmailAndDeletedAtIsNull(user.getEmail()));

        Optional<User> usr2 = Optional.ofNullable(this.userRepository.findOneByEmail(user.getEmail()));


        if(!usr.isPresent()){
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

        }else if (usr2.get().getDeletedAt() != null){

            List<Role> roles = Optional.of(this.roleService.findAllByNameIn(user.getRoles()))
                    .orElseThrow(() -> new NoSuchElementException("Role not Founded"));

            user.setPassword(this.bcryptEncoder.encode(user.getPassword()));


            Cities city = this.cityService.findByCity(user.getAddress().getCity());
            States state = this.stateService.findByUf(user.getAddress().getState());

            AddressDto addressDto = user.getAddress();
            Address address = this.addressRepository.save(Address.fromAddressDTO(addressDto, city, state));

            user.setIdUser(usr.get().getIdUser());

            user.setWallet(new BigDecimal(0));

            User usuarioForSave = UserRequest.toUser(user, roles, address);

            usuarioForSave.setDeletedAt(null);

            User savedUser = this.userRepository.save(usuarioForSave);


            return UserDto.fromUser(savedUser);
        }else{
            throw new NonUniqueResultException("Email ja cadastrado!");
        }

    }

    @Override
    public Optional<User> findByEmail(String email) {
        return Optional.ofNullable(this.userRepository.findOneByEmailAndDeletedAtIsNull(email));
    }

    @Override
    public UserDto save(User user) {
        user.setPassword(this.bcryptEncoder.encode(user.getPassword()));
        return UserDto.fromUser(this.userRepository.save(user));
    }

    @Override
    public UserDto saveUser(User user) {

        return UserDto.fromUser(this.userRepository.save(user));
    }

    @Override
    public UserDto editUser(UserRequest userRequest) throws NotFoundException {

        User user = this.userRepository.findOneByEmailAndDeletedAtIsNull(userRequest.getEmail());

        if (user == null){
            user = this.userRepository.findOneByIdUser(userRequest.getIdUser());
        }


        //usuarios nao administradores nao podem editar Roles
        //usuarios nao administradores nao podem adicionar Roles
        User userByPrincipal = this.getUserByPrincipal();

        if(this.hasRole(userByPrincipal, RolesEnum.ADMIN)) {
            List<Role> newRoles = this.roleService.findAllByNameIn(userRequest.getRoles());

            Cities city = this.cityService.findByCity(userRequest.getAddress().getCity());
            States state = this.stateService.findByUf(userRequest.getAddress().getState());

            //if (userRequest.getAddress().getAddressId() > 0) this.addressRepository.deleteById(userRequest.getAddress().getAddressId());

            AddressDto addressDto = userRequest.getAddress();
            Address newAddress = this.addressRepository.save(Address.fromAddressDTO(addressDto, city, state));


            User userEditado = UserRequest.toUser(userRequest,newRoles,newAddress);

            userEditado.setPassword(this.bcryptEncoder.encode(userRequest.getPassword()));
            userEditado.setIdUser(userRequest.getIdUser());

            user=userEditado;

        }else if(user == userByPrincipal) {
            //Usuarios so podem editar eles mesmos
            user.setName(userRequest.getName());
            user.setPassword(this.bcryptEncoder.encode(user.getPassword()));
        }else {
            throw new BadCredentialsException("Usuários não administradores não podem alterar outros usuários!");
        }

        return UserDto.fromUser(this.userRepository.save(user));
    }

    @Override
    public boolean hasRole(User user, RolesEnum checkRole) {

        return user.getRoles()
                .stream()
                .anyMatch(role -> role.getName().equals(checkRole.getCode()));
    }

    @Override
    public UserDto deleteUser(String email) {
        User user = this.userRepository.findOneByEmailAndDeletedAtIsNull(email);

        user.setDeletedAt(new Date());
        return UserDto.fromUser(this.userRepository.save(user));
    }

    @Override
    public UserDto deleteLoggedUser() {
        User loggedUser = this.getUserByPrincipal();
        loggedUser.setDeletedAt(new Date());
        User savedUser = this.userRepository.save(loggedUser);
        return UserDto.fromUser(savedUser);
    }


    @Override
    public User getUserByPrincipal() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return this.userRepository.findOneByEmailAndDeletedAtIsNull(((UserDetails)principal).getUsername());

    }


    @Override
    public Page<User> listUsersByPage(Pageable page) {
        return this.userRepository.findAllByDeletedAtIsNullOrderByName(page);
    }

    @Override
    public Page<User> listUsersByPageAndName(Pageable page, String name) {
        return this.userRepository.findAllByNameIgnoreCaseAndDeletedAtIsNull(page, name);
    }

    @Override
    public User getUserById(Long userId) throws NotFoundException {
        return this.userRepository.findOneByIdUser(userId);
    }

    @Override
    public List<User> getAllTeachers() throws NotFoundException {
        return this.userRepository.findAllTeachers();
    }

    @Override
    public LinkedList<User> giveMonthlyCoinsForTeachers() throws NotFoundException {
        return null;
    }


}
