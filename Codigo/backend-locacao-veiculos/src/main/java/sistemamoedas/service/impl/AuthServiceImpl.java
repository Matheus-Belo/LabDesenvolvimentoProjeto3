package sistemamoedas.service.impl;

import sistemamoedas.configs.jwt.JwtTokenUtil;
import sistemamoedas.models.RequestEntity.LoginRequest;
import sistemamoedas.models.ResponseEntity.LoginResponse;
import sistemamoedas.models.User;
import sistemamoedas.models.dto.UserDto;
import sistemamoedas.service.AuthService;
import sistemamoedas.service.UserRoleService;
import sistemamoedas.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private UserRoleService roleService;

    @Override
    public LoginResponse login(LoginRequest authenticationRequest) throws Exception {
        final User userDetails = this.userService.findByEmail(authenticationRequest.getEmail())
                .orElseThrow(()->new BadCredentialsException("Email ou senha incorreto!"));

        Set<String> roles = roleService.findAllByUser(userDetails)
                .stream().map(m -> m.getRole().getName()).collect(Collectors.toSet());

        this.authenticate(authenticationRequest.getEmail(), authenticationRequest.getPassword());

        final String token = this.jwtTokenUtil.generateToken(userDetails);

        return new LoginResponse(token, UserDto.fromUser(userDetails), roles);
    }



    private ResponseEntity<String> authenticate(String username, String password) throws Exception {
        try {
            Optional<User> user = this.userService.findByEmail(username);
            if (user.isPresent()) {
                if (null != user.get().getDeletedAt()) {
                    return new ResponseEntity<>("Usuário desativado!", HttpStatus.UNAUTHORIZED);
                }
            }
            this.authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        }catch (BadCredentialsException e){
            throw new BadCredentialsException("Email ou senha incorreto!");
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Override
    public Authentication getAuthenticatedUser() {
        return SecurityContextHolder.getContext().getAuthentication();
    }
}
