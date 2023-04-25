package sistemamoedas.models;

import lombok.Data;
import lombok.ToString;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@ToString
@Table(name = "users_related_entity")
public class UsersRelatedEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "users_relatedEntity_id")
    private Long idUsersRelatedEntity;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User idUser;

    @OneToOne
    @JoinColumn(name = "institution_id")
    private Institution idInstitution;

    @OneToOne
    @JoinColumn(name = "third_party_id")
    private ThirdParty idThirdParty;

    @Column(name = "created_at")
    private Date createdAt;

    @Column(name = "deleted_at")
    private Date deletedAt;

    public UsersRelatedEntity() {
    }

    public UsersRelatedEntity(Long idUsersRelatedEntity, User idUser, Institution idInstitution,
                              ThirdParty idThirdParty, Date createdAt, Date deletedAt) {
        this.idUsersRelatedEntity = idUsersRelatedEntity;
        this.idUser = idUser;
        this.idInstitution = idInstitution;
        this.idThirdParty = idThirdParty;
        this.createdAt = createdAt;
        this.deletedAt = deletedAt;
    }

    public UsersRelatedEntity(User idUser, Institution idInstitution, ThirdParty idThirdParty,
                              Date createdAt, Date deletedAt) {
        this.idUser = idUser;
        this.idInstitution = idInstitution;
        this.idThirdParty = idThirdParty;
        this.createdAt = createdAt;
        this.deletedAt = deletedAt;
    }
}
