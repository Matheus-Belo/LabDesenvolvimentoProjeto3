package sistemamoedas.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import sistemamoedas.models.Advantages;
import sistemamoedas.models.RequestEntity.AdvantagesRequest;
import sistemamoedas.models.RequestEntity.TransactionRequest;
import sistemamoedas.models.RequestEntity.UserRequest;
import sistemamoedas.models.ResponseEntity.AdvantagesResponse;
import sistemamoedas.models.ResponseEntity.TransactionResponse;
import sistemamoedas.models.Transactions;

import java.util.LinkedList;

public interface AdvantageService {

    AdvantagesResponse createAdvantage(AdvantagesRequest request);

    AdvantagesResponse editAdvantage(AdvantagesRequest request);

    AdvantagesResponse deleteAdvantage(Long idAdvantage);


    //listar todas as vantagens
    Page<Advantages> listAdvantagesByPage(Pageable pages);

    //listar vantagens por thirdParty
    Page<Advantages> listAdvantagesByPageAndThirdPartyId(Pageable pages, Long idThirdParty);

    //retorna uma vantagem por id
    Advantages getAdvantageById(Long idAdvantage);

    //lista todas as vantagens por categoria
    Page<Advantages> listAdvantagesByPageAndCategory(Pageable pages, String category);

    //lista todas as vantagens por nome da vantagem
    Page<Advantages> listAdvantagesByPageAndName(Pageable pages, String advantagename);
}
