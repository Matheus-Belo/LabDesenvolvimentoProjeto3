package sistemamoedas.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sistemamoedas.models.ThirdParty;

import javax.transaction.Transaction;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction,Long > {
    
}
