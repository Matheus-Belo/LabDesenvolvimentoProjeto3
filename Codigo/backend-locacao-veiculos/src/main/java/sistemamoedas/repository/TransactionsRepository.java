package sistemamoedas.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sistemamoedas.models.ThirdParty;
import sistemamoedas.models.Transactions;
import sistemamoedas.models.User;

import java.util.LinkedList;
import java.util.List;

@Repository
public interface TransactionsRepository extends JpaRepository <Transactions,Long> {

    Transactions findOneByIdTransactionAndDeletedAtIsNull(Long idTransaction);

    Page<Transactions> findAllByDeletedAtIsNullOrderByIdTransaction(Pageable page);

    Page<Transactions> findAllByIdOriginAccountAndDeletedAtIsNullOrderByIdTransaction(Pageable page, User idOriginAccount);
    Page<Transactions> findAllByIdOriginAccountOrIdDestinationAccountAndDeletedAtIsNullOrderByIdOriginAccount(Pageable page, User idOriginAccount, User idDestinationAccount);
    List<Transactions> findAllByIdOriginAccountAndDeletedAtIsNullOrderByIdOriginAccount(User idOriginAccount);
}
