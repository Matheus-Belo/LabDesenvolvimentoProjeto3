package sistemamoedas.service;

import sistemamoedas.models.Role;
import sistemamoedas.models.User;
import sistemamoedas.models.UserRole;

import java.util.List;

public interface UserRoleService {


    List<Role> findAllByUserId(Long id);
    List<UserRole> findAllByUser(User id);
}
