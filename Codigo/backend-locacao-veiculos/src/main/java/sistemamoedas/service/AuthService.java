package sistemamoedas.service;

import sistemamoedas.models.RequestEntity.LoginRequest;
import sistemamoedas.models.ResponseEntity.LoginResponse;
import org.springframework.security.core.Authentication;

public interface AuthService {

    LoginResponse login(LoginRequest authenticationRequest) throws Exception;

    Authentication getAuthenticatedUser();
}
