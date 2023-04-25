package sistemamoedas.models.RequestEntity;

import lombok.Data;
import sistemamoedas.models.Address;
import sistemamoedas.models.ThirdParty;

import javax.persistence.*;
import java.util.Date;
@Data
public class ThirdPartyRequest {


    private Long idThirdParty;

    private String thirdPartyName;

    private String phone1;

    private String phone2;

    private String email;

    private String legalDocument;

    private String areaOfOperation;

    private Address address;

    private Date createdAt;

    private Date deletedAt;

    public ThirdPartyRequest() {
    }


    public static ThirdParty toThirdPart ( ThirdPartyRequest request){
        return new ThirdParty(
                request.getIdThirdParty()!=null? request.getIdThirdParty() : 0,
                request.getThirdPartyName(),
                request.getPhone1(),
                request.getPhone2(),
                request.getEmail(),
                request.getLegalDocument(),
                request.getAreaOfOperation(),
                request.getAddress(),
                new Date(),
                null

        );
    }


}
