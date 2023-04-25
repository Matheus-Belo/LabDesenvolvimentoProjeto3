package sistemamoedas.models;

import lombok.Data;
import lombok.ToString;

import javax.persistence.*;
import java.util.Date;


@Entity
@Data
@ToString
@Table(name = "advantages_thirdParty")
public class AdvantagesThirdParty {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "advantages_thirdParty_id")
    private Long idAdvantagesThirdParty;

    @OneToOne
    @JoinColumn(name = "advantages_id")
    private Advantages idAdvantages;

    @OneToOne
    @JoinColumn(name = "third_party_id")
    private ThirdParty idThirdParty;


    @Column(name = "created_at")
    private Date createdAt;

    @Column(name = "deleted_at")
    private Date deletedAt;

    public AdvantagesThirdParty() {
    }

    public AdvantagesThirdParty(Long idAdvantagesThirdParty, Advantages idAdvantages,
                                ThirdParty idThirdParty, Date createdAt, Date deletedAt) {
        this.idAdvantagesThirdParty = idAdvantagesThirdParty;
        this.idAdvantages = idAdvantages;
        this.idThirdParty = idThirdParty;
        this.createdAt = createdAt;
        this.deletedAt = deletedAt;
    }

    public AdvantagesThirdParty(Advantages idAdvantages, ThirdParty idThirdParty,
                                Date createdAt, Date deletedAt) {
        this.idAdvantages = idAdvantages;
        this.idThirdParty = idThirdParty;
        this.createdAt = createdAt;
        this.deletedAt = deletedAt;
    }
}
