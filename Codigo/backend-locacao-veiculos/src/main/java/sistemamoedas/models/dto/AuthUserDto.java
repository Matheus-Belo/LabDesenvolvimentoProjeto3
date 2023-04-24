package sistemamoedas.models.dto;

import sistemamoedas.enums.RolesEnum;
import sistemamoedas.models.User;
import lombok.Data;

import java.util.List;

@Data
public class AuthUserDto {
    User user;
    List<RolesEnum> roles;

    public AuthUserDto(User user, List<RolesEnum> roles) {
        this.user = user;
        this.roles = roles;
    }
}
