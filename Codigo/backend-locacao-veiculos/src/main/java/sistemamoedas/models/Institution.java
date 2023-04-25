package sistemamoedas.models;


import lombok.Data;
import lombok.ToString;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@ToString
@Table(name = "institution")
public class Institution {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "institution_id")
    private Long idInstitution;

    @Column(name = "institution_name")
    private String institutionName;

    @OneToOne
    @JoinColumn(name = "address_id")
    private Address address;

    @Column(name = "phone1")
    private String phone1;

    @Column(name = "phone2")
    private String phone2;

    @Column(name = "legal_document")
    private String legalDocument;

    @Column(name = "email")
    private String email;

    @Column(name = "created_at")
    private Date createdAt;

    @Column(name = "deleted_at")
    private Date deletedAt;

    public Institution() {
    }

    public Institution(Long idInstitution, String institutionName, Address address, String phone1, String phone2,
                       String legalDocument, String email, Date createdAt, Date deletedAt) {
        this.idInstitution = idInstitution;
        this.institutionName = institutionName;
        this.address = address;
        this.phone1 = phone1;
        this.phone2 = phone2;
        this.legalDocument = legalDocument;
        this.email = email;
        this.createdAt = createdAt;
        this.deletedAt = deletedAt;
    }

    public Institution(String institutionName, Address address, String phone1, String phone2, String legalDocument,
                       String email, Date createdAt, Date deletedAt) {
        this.institutionName = institutionName;
        this.address = address;
        this.phone1 = phone1;
        this.phone2 = phone2;
        this.legalDocument = legalDocument;
        this.email = email;
        this.createdAt = createdAt;
        this.deletedAt = deletedAt;
    }
}
