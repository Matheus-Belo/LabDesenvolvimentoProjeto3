package sistemamoedas.service.impl;

import sistemamoedas.models.Role;
import sistemamoedas.models.User;
import sistemamoedas.models.UserRole;
import sistemamoedas.repository.UserRoleRepository;
import sistemamoedas.service.UserRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserRoleServiceImpl implements UserRoleService {

    @Autowired
    private UserRoleRepository roleRepository;

    @Override
    public List<Role> findAllByUserId(Long id) {
        return null;// this.roleRepository.findAllByUserId(id);
    }

    @Override
    public List<UserRole> findAllByUser(User user) {
        return this.roleRepository.findAllByUser(user);
    }


}
