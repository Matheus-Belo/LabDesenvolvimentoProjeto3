package sistemamoedas.service;

import javassist.NotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import sistemamoedas.models.RequestEntity.TransactionRequest;
import sistemamoedas.models.RequestEntity.UserRequest;
import sistemamoedas.models.ResponseEntity.TransactionResponse;
import sistemamoedas.models.Transactions;

import java.util.LinkedList;
import java.util.List;

public interface TransactionService {

    TransactionResponse createDeposit(TransactionRequest request) throws NotFoundException;

    TransactionResponse createSale(TransactionRequest request) throws NotFoundException;

    List<Transactions> getExtractAsList(Long idConta);

    Page<Transactions> getExtractAsPaged(Pageable pages, Long idConta);

    LinkedList<TransactionResponse> enviaMoedasProfessores() throws NotFoundException ;

    Transactions getTransactionById(Long idTransaction);
}
