package sistemamoedas.models;

import lombok.Data;
import lombok.ToString;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;


@Entity
@Data
@ToString
@Table(name = "transactions")
public class Transactions {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "transaction_id")
    private Long idTransaction;

    @OneToOne
    @JoinColumn(name = "origin_account_id")
    private User idOriginAccount;

    @OneToOne
    @JoinColumn(name = "destination_account_id")
    private User idDestinationAccount;

    @Column(name = "transaction_type")
    private String transactionType;

    @Column(name = "description")
    private String description;

    @Column(name = "transaction_date")
    private Date transactionDate;

    @Column(name = "amount")
    private BigDecimal amount;

    @OneToOne
    @JoinColumn(name = "advantages_id")
    Advantages desiredItem;

    @Column(name = "created_at")
    private Date createdAt;

    @Column(name = "deleted_at")
    private Date deletedAt;


    public Transactions() {
    }

    public Transactions(Long idTransaction, User idOriginAccount,
                        User idDestinationAccount, String transactionType, String description,Date transactionDate,
                        BigDecimal amount, Advantages desiredItem, Date createdAt, Date deletedAt) {
        this.idTransaction = idTransaction;
        this.idOriginAccount = idOriginAccount;
        this.idDestinationAccount = idDestinationAccount;
        this.transactionType = transactionType;
        this.description = description;
        this.transactionDate = transactionDate;
        this.amount = amount;
        this.desiredItem = desiredItem;
        this.createdAt = createdAt;
        this.deletedAt = deletedAt;
    }

    public Transactions(User idOriginAccount, User idDestinationAccount, String transactionType,
                        String description, Date transactionDate, BigDecimal amount, Advantages desiredItem,
                        Date createdAt, Date deletedAt){

        this.idOriginAccount = idOriginAccount;
        this.idDestinationAccount = idDestinationAccount;
        this.transactionType = transactionType;
        this.description = description;
        this.transactionDate = transactionDate;
        this.amount = amount;
        this.desiredItem = desiredItem;
        this.createdAt = createdAt;
        this.deletedAt = deletedAt;
    }
}
