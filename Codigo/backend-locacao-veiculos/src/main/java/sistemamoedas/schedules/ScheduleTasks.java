package sistemamoedas.schedules;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import sistemamoedas.models.ResponseEntity.TransactionResponse;
import sistemamoedas.models.Transactions;
import sistemamoedas.service.TransactionService;

import java.util.LinkedList;

@Component
public class ScheduleTasks {

    @Autowired
    TransactionService transactionService;

    @Scheduled(cron = "0 1 1 * * *")
    private void create(){
        LinkedList<TransactionResponse> sendCoinsList = transactionService.enviaMoedasProfessores();
    }
}
