package sistemamoedas.service;

import sistemamoedas.models.RequestEntity.TransactionRequest;
import sistemamoedas.models.ResponseEntity.TransactionResponse;

public interface TransactionService {

    TransactionResponse createDeposit(TransactionRequest request);

    TransactionResponse createSale(TransactionRequest request);
}
