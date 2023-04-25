package sistemamoedas.models;

import lombok.Data;
import lombok.ToString;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

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

    @Column(name = "advantage_description")
    private String advantageDescription;
    @Column(name = "price")
    private BigDecimal price;

    @Column(name = "validation_date")
    private Date validationDate;

    @Column(name = "created_at")
    private Date createdAt;

    @Column(name = "deleted_at")
    private Date deletedAt;


    public Advantages() {
    }

    public Advantages(Long idAdvantages, String advantageName, String advantageDescription, BigDecimal price,
                      Date validationDate, Date createdAt, Date deletedAt) {
        this.idAdvantages = idAdvantages;
        this.advantageName = advantageName;
        this.advantageDescription = advantageDescription;
        this.price = price;
        this.validationDate = validationDate;
        this.createdAt = createdAt;
        this.deletedAt = deletedAt;
    }

    public Advantages(String advantageName, String advantageDescription, BigDecimal price, Date validationDate,
                      Date createdAt, Date deletedAt) {
        this.advantageName = advantageName;
        this.advantageDescription = advantageDescription;
        this.price = price;
        this.validationDate = validationDate;
        this.createdAt = createdAt;
        this.deletedAt = deletedAt;
    }
}
