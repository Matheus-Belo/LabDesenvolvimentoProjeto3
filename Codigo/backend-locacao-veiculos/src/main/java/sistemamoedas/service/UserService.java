package sistemamoedas.service;

import sistemamoedas.enums.RolesEnum;
import sistemamoedas.models.RequestEntity.UserRequest;
import sistemamoedas.models.User;
import sistemamoedas.models.dto.UserDto;
import javassist.NotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

public interface UserService {
    UserDto create(UserRequest user) throws NotFoundException;
    Optional<User> findByEmail(String email);
    UserDto save(User user);

    UserDto saveUser(User user);

    UserDto editUser(UserRequest userRequest) throws NotFoundException;
    UserDto deleteUser(String email);
    UserDto deleteLoggedUser();
    User getUserByPrincipal();
    boolean hasRole(User user, RolesEnum admin);
    Page<User> listUsersByPage(Pageable page);

    Page<User> listUsersByPageAndName(Pageable pages, String name);

    User getUserById(Long userId) throws NotFoundException;
    List<User> getAllTeachers() throws NotFoundException;
    List<User> giveMonthlyCoinsForTeachers() throws NotFoundException;
}
