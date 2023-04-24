package sistemamoedas.configs;

import sistemamoedas.enums.RolesEnum;
import sistemamoedas.models.Role;
import sistemamoedas.models.User;
import sistemamoedas.service.AuthService;
import sistemamoedas.service.UserService;
import sistemamoedas.util.Secure;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Aspect
@Component
public class AllowedRolesAspect {
    @Autowired
    private AuthService authService;
    @Autowired
    private UserService userService;

    @Around("@annotation(sistemamoedas.util.Secure)")
    public Object doSomething(ProceedingJoinPoint jp) throws Throwable {

        List<String> allowedRoles = Arrays.stream(((MethodSignature) jp.getSignature()).getMethod()
                        .getAnnotation(Secure.class).value())
                .collect(Collectors.toSet())
                .stream().map(RolesEnum::getCode)
                .collect(Collectors.toList());

        Authentication authentication = this.authService.getAuthenticatedUser();

        User user = this.userService.findByEmail(authentication.getName())
                .orElseThrow(() -> new BadCredentialsException("Erro ao identificar permissão! Usuario não encontrado"));


        List<String> userRoles = user.getRoles().stream()
                .map(Role::getName)
                .collect(Collectors.toList());

        Object[] args = jp.getArgs();
        args[0] = !Collections.disjoint(allowedRoles, userRoles);
        return jp.proceed(args);
    }

}
