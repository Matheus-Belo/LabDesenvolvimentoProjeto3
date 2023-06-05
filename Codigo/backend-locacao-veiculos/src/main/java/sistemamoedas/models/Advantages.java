package sistemamoedas.models;

import lombok.Data;
import lombok.ToString;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Entity
@Data
@ToString
@Table(name = "advantages")
public class Advantages {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "advantages_id")
    private Long idAdvantages;

    @Column(name = "advantage_name")
    private String advantageName;

    @OneToOne
    @JoinColumn(name = "third_party_id")
    private ThirdParty thirdParty;

    @OneToMany(cascade=CascadeType.PERSIST, mappedBy = "idAdvantagesImages")
    //@JoinColumn(name = "advantages_images_id")
    private List<AdvantagesImages> advantagesImages;

    @Column(name = "advantage_description")
    private String advantageDescription;
    @Column(name = "price")
    private BigDecimal price;
    @Column(name = "validation_date")
    private Date validationDate;

    @Column(name = "advantage_category")
    private String advantageCategory;

    @Column(name = "coupon_code")
    private String couponCode;

    @Column(name = "status")
    private String status;

    @Column(name = "amount")
    private String amount;
    @Column(name = "created_at")
    private Date createdAt;

    @Column(name = "deleted_at")
    private Date deletedAt;


    public Advantages() {
    }

    public Advantages(Long idAdvantages, String advantageName, ThirdParty thirdParty, List<AdvantagesImages> advantagesImages,
                      String advantageDescription, BigDecimal price, Date validationDate, String advantageCategory,
                      String couponCode, String status, String amount, Date createdAt, Date deletedAt) {
        this.idAdvantages = idAdvantages;
        this.advantageName = advantageName;
        this.thirdParty = thirdParty;
        this.advantagesImages = advantagesImages;
        this.advantageDescription = advantageDescription;
        this.price = price;
        this.validationDate = validationDate;
        this.advantageCategory = advantageCategory;
        this.couponCode = couponCode;
        this.status = status;
        this.amount = amount;
        this.createdAt = createdAt;
        this.deletedAt = deletedAt;
    }

    public Advantages(String advantageName, ThirdParty thirdParty, List<AdvantagesImages> advantagesImages, String advantageDescription,
                      BigDecimal price, Date validationDate, String advantageCategory, String couponCode, String status, String amount,
                      Date createdAt, Date deletedAt) {
        this.advantageName = advantageName;
        this.thirdParty = thirdParty;
        this.advantagesImages = advantagesImages;
        this.advantageDescription = advantageDescription;
        this.price = price;
        this.validationDate = validationDate;
        this.advantageCategory = advantageCategory;
        this.couponCode = couponCode;
        this.status = status;
        this.amount = amount;
        this.createdAt = createdAt;
        this.deletedAt = deletedAt;
    }

}
