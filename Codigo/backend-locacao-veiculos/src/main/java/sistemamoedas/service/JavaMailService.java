package sistemamoedas.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.mail.javamail.JavaMailSender;
import sistemamoedas.models.RequestEntity.TransactionRequest;
import sistemamoedas.models.RequestEntity.UserRequest;
import sistemamoedas.models.ResponseEntity.TransactionResponse;
import sistemamoedas.models.Transactions;

import java.util.LinkedList;

public interface JavaMailService {

    public JavaMailSender getJavaMailSender();
}
