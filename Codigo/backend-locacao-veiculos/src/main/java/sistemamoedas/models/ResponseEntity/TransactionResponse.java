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



    public static TransactionResponse fromTransactions (Transactions transaction){

        return  new TransactionResponse(



        );
    }
}
