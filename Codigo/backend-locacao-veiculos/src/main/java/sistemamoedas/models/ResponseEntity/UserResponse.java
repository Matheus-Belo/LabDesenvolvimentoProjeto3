package sistemamoedas.models.ResponseEntity;

import sistemamoedas.models.dto.AddressDto;
import lombok.Data;

import java.util.List;

@Data
public class UserResponse {

    private String name;
    private String email;
    private List<String> roles;
    private String legalDocument;
    private AddressDto address;
    private String sex;

    public UserResponse() {
    }

    public UserResponse(String name, String email, List<String> roles) {
        this.name = name;
        this.email = email;
        this.roles = roles;
    }
}
