package sistemamoedas.models.RequestEntity;

import lombok.Data;
import sistemamoedas.models.Address;
import sistemamoedas.models.Role;
import sistemamoedas.models.Transactions;
import sistemamoedas.models.User;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Data
public class TransactionRequest {


    private Long idTransaction;

    private Long idOriginAccount;

    private Long idDestinationAccount;

    private String transactionType;

    private String description;

    private String transactionDate;

    private BigDecimal amount;

    private Date createdAt;

    private Date deletedAt;


    public TransactionRequest() {
    }

    public TransactionRequest(Long idTransaction, Long idOriginAccount, Long idDestinationAccount,
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

    public static Transactions toTransactions(TransactionRequest request,
                                              User originAccount,
                                              User destinationAccount,
                                              String transactionType) {

        return new Transactions(

                request.getIdTransaction() != null ? request.getIdTransaction(): 0,
                originAccount,
                destinationAccount,
                transactionType,
                request.getDescription(),
                new Date().toString(),
                request.getAmount(),
                new Date(),
                null
        );

    }

    public static Transactions toTransactionsAuto(User originAccount,
                                              User destinationAccount,
                                              String transactionType) {

        return new Transactions(

                0L,
                originAccount,
                destinationAccount,
                transactionType,
                "Automatic monthly deposit for teachers",
                new Date().toString(),
                BigDecimal.valueOf(1000),
                new Date(),
                null
        );

    }

}
