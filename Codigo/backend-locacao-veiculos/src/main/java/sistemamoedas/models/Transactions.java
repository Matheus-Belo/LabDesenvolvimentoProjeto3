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
    private String transactionDate;

    @Column(name = "amount")
    private BigDecimal amount;


    //quantidade original da conta de destino
    //quantidade total da conta de destino depois da transaçao
    //quantidade original da conta de origem
    //quantidade total da conta de origem depois da transaçao

    @Column(name = "created_at")
    private Date createdAt;

    @Column(name = "deleted_at")
    private Date deletedAt;


    public Transactions() {
    }

    public Transactions(Long idTransaction, User idOriginAccount,
                        User idDestinationAccount, String transactionType, String description, String transactionDate,
                        BigDecimal amount, Date createdAt, Date deletedAt) {
        this.idTransaction = idTransaction;
        this.idOriginAccount = idOriginAccount;
        this.idDestinationAccount = idDestinationAccount;
        this.transactionType = transactionType;
        this.description = description;
        this.transactionDate = transactionDate;
        this.amount = amount;
        this.createdAt = createdAt;
        this.deletedAt = deletedAt;
    }

    public Transactions(User idOriginAccount, User idDestinationAccount, String transactionType,
                        String description, String transactionDate, BigDecimal amount, Date createdAt, Date deletedAt){

        this.idOriginAccount = idOriginAccount;
        this.idDestinationAccount = idDestinationAccount;
        this.transactionType = transactionType;
        this.description = description;
        this.transactionDate = transactionDate;
        this.amount = amount;
        this.createdAt = createdAt;
        this.deletedAt = deletedAt;
    }
}
