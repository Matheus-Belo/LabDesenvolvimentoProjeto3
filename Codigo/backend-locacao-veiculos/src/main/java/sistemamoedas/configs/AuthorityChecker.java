package sistemamoedas.configs;

import sistemamoedas.enums.RolesEnum;
import sistemamoedas.models.Role;
import sistemamoedas.models.User;
import sistemamoedas.models.dto.AuthUserDto;
import sistemamoedas.service.AuthService;
import sistemamoedas.service.UserRoleService;
import sistemamoedas.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Component("authorityChecker")
public class AuthorityChecker {

    private static UserService userService;
    private static AuthService authService;
    private static UserRoleService roleService;

    private static AuthUserDto authUserDto;


    @Autowired
    public AuthorityChecker(UserService userService, AuthService authService, UserRoleService roleService) {
        AuthorityChecker.userService = userService;
        AuthorityChecker.authService = authService;
        AuthorityChecker.roleService = roleService;

    }

    public static boolean isAllowed(List<RolesEnum> roles) {
        System.out.println("roles");

        List<String> allowedRoles = roles.stream().map(RolesEnum::getCode)
                .collect(Collectors.toList());

        Authentication authentication = authService.getAuthenticatedUser();

        User user = userService.findByEmail(authentication.getName())
                .orElseThrow(() -> new BadCredentialsException("Erro ao identificar permissão! Usuario não encontrado"));


        List<String> userRoles = user.getRoles().stream()
                .map(Role::getName)
                .collect(Collectors.toList());

        return !Collections.disjoint(allowedRoles, userRoles);
    }

}
