package sistemamoedas.models.ResponseEntity;

import lombok.Data;
import sistemamoedas.models.Address;
import sistemamoedas.models.ThirdParty;

import java.util.Date;

@Data
public class ThirdPartyResponse {

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

    public ThirdPartyResponse() {
    }

    public ThirdPartyResponse(Long idThirdParty, String thirdPartyName, String phone1,
                              String phone2, String email, String legalDocument, String areaOfOperation,
                              Address address, Date createdAt, Date deletedAt) {
        this.idThirdParty = idThirdParty;
        this.thirdPartyName = thirdPartyName;
        this.phone1 = phone1;
        this.phone2 = phone2;
        this.email = email;
        this.legalDocument = legalDocument;
        this.areaOfOperation = areaOfOperation;
        this.address = address;
        this.createdAt = createdAt;
        this.deletedAt = deletedAt;
    }

    public static ThirdPartyResponse fromThirdParty ( ThirdParty thirdParty){


        return new ThirdPartyResponse(
                thirdParty.getIdThirdParty(),
                thirdParty.getThirdPartyName(),
                thirdParty.getPhone1(),
                thirdParty.getPhone2(),
                thirdParty.getEmail(),
                thirdParty.getLegalDocument(),
                thirdParty.getAreaOfOperation(),
                thirdParty.getAddress(),
                thirdParty.getCreatedAt(),
                thirdParty.getDeletedAt()

        );

    }
}
