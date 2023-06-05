package sistemamoedas.service;

import com.itextpdf.text.DocumentException;
import javassist.NotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import sistemamoedas.models.RequestEntity.TransactionRequest;
import sistemamoedas.models.RequestEntity.UserRequest;
import sistemamoedas.models.ResponseEntity.TransactionResponse;
import sistemamoedas.models.Transactions;

import javax.persistence.NonUniqueResultException;
import java.io.IOException;
import java.util.LinkedList;
import java.util.List;

public interface TransactionService {

    TransactionResponse createDeposit(TransactionRequest request) throws NotFoundException;

    TransactionResponse createSale(TransactionRequest request) throws NotFoundException;

    List<Transactions> getExtractAsList(Long idConta) throws NotFoundException;

    Page<Transactions> getExtractAsPaged(Pageable pages, Long idConta) throws NotFoundException;

    LinkedList<TransactionResponse> enviaMoedasProfessores() throws NotFoundException ;

    Transactions getTransactionById(Long idTransaction);

    byte[] getExtractAsPDF(Long idConta) throws NonUniqueResultException, NotFoundException, IOException, DocumentException;
}
