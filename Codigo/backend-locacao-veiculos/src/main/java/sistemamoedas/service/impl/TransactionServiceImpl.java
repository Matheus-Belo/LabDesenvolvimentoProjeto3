package sistemamoedas.service.impl;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import sistemamoedas.models.RequestEntity.TransactionRequest;
import sistemamoedas.models.RequestEntity.UserRequest;
import sistemamoedas.models.ResponseEntity.TransactionResponse;
import sistemamoedas.models.Transactions;
import sistemamoedas.repository.TransactionRepository;
import sistemamoedas.service.EmailService;
import sistemamoedas.service.TransactionService;
import sistemamoedas.service.UserService;

import java.util.LinkedList;

@Service
public class TransactionServiceImpl implements TransactionService {

    @Autowired
    TransactionRepository transactionRepository;
    @Autowired
    UserService userService;
    @Autowired
    EmailService emailService;

    @Override
    //Ao receber uma moeda, o aluno deve ser notificado por email.
    //notificar o professor por email com novo saldo.
    public TransactionResponse createDeposit(TransactionRequest request) {
        return null;
    }

    @Override
    public TransactionResponse createSale(TransactionRequest request) {
        return null;
    }

    @Override
    //Professores e alunos devem ser capazes de consultar o extrato de sua conta, visualizando o total de moedas que ainda possui, bem como as transações que realizou
    public LinkedList<Transactions> getExtractAsList(UserRequest request) {
        return null;
    }

    @Override
    //Professores e alunos devem ser capazes de consultar o extrato de sua conta, visualizando o total de moedas que ainda possui, bem como as transações que realizou
    public Page<Transactions> getExtractAsPaged(Pageable pages, Long idConta) {
        return null;
    }

    @Override
    public LinkedList<TransactionResponse> enviaMoedasProfessores() {
        return null;
    }

    @Override
    public Transactions getTransactionById(Long idTransaction) {
        return null;
    }
}
