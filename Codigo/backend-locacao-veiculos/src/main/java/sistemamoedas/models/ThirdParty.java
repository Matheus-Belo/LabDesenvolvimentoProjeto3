package sistemamoedas.models;

import lombok.Data;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Data
@ToString
@Table(name = "third_party")
public class ThirdParty {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "third_party_id")
    private Long idThirdParty;

    @Column(name = "third_party_name")
    private String thirdPartyName;

    @Column(name = "phone1")
    private String phone1;

    @Column(name = "phone2")
    private String phone2;

    @Column(name = "email")
    private String email;

    @Column(name = "legal_document")
    private String legalDocument;

    @Column(name = "area_of_operation")
    private String areaOfOperation;

    @OneToOne
    @JoinColumn(name = "address_id")
    private Address address;


    @Column(name = "created_at")
    private Date createdAt;

    @Column(name = "deleted_at")
    private Date deletedAt;

    public ThirdParty() {
    }

    public ThirdParty(Long idThirdParty, String thirdPartyName,
                      String phone1, String phone2, String email, String legalDocument,
                      String areaOfOperation, Address address, Date createdAt, Date deletedAt) {
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

    public ThirdParty(String thirdPartyName, String phone1, String phone2,
                      String email, String legalDocument, String areaOfOperation, Address address,
                      Date createdAt, Date deletedAt) {
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
}
