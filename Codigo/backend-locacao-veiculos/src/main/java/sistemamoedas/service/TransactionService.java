package sistemamoedas.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import sistemamoedas.models.RequestEntity.TransactionRequest;
import sistemamoedas.models.RequestEntity.UserRequest;
import sistemamoedas.models.ResponseEntity.TransactionResponse;
import sistemamoedas.models.Transactions;

import java.util.LinkedList;

public interface TransactionService {

    TransactionResponse createDeposit(TransactionRequest request);

    TransactionResponse createSale(TransactionRequest request);

    LinkedList<Transactions> getExtractAsList(UserRequest request);

    Page<Transactions> getExtractAsPaged(Pageable pages, Long idConta);

    LinkedList<TransactionResponse> enviaMoedasProfessores();

    Transactions getTransactionById(Long idTransaction);
}
