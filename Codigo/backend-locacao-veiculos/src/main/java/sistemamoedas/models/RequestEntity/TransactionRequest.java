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

    public static Transactions toTransactions(TransactionRequest request, User originAccount, User destinationAccount) {

        return new Transactions(



        );

    }

}
