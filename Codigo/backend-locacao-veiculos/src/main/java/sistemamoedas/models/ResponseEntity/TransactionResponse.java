package sistemamoedas.models.ResponseEntity;

import lombok.Data;
import sistemamoedas.models.Advantages;
import sistemamoedas.models.Transactions;
import sistemamoedas.models.User;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

@Data
public class TransactionResponse {


    private Long idTransaction;


    private User idOriginAccount;


    private User idDestinationAccount;


    private String transactionType;


    private String description;


    private String transactionDate;


    private BigDecimal amount;


    private Date createdAt;


    private Date deletedAt;

    public TransactionResponse(Long idTransaction, User idOriginAccount, User idDestinationAccount,
                               String transactionType, String description, String transactionDate,
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

    public static TransactionResponse fromTransactions (Transactions transaction){

        return  new TransactionResponse(

                transaction.getIdTransaction(),
                transaction.getIdOriginAccount(),
                transaction.getIdDestinationAccount(),
                transaction.getTransactionType(),
                transaction.getDescription(),
                transaction.getTransactionDate(),
                transaction.getAmount(),
                transaction.getCreatedAt(),
                transaction.getDeletedAt()

        );
    }
}
