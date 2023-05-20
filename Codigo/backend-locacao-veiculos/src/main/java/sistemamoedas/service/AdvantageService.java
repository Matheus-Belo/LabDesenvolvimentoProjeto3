package sistemamoedas.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;
import sistemamoedas.models.Advantages;
import sistemamoedas.models.RequestEntity.AdvantagesRequest;
import sistemamoedas.models.RequestEntity.TransactionRequest;
import sistemamoedas.models.RequestEntity.UserRequest;
import sistemamoedas.models.ResponseEntity.AdvantagesResponse;
import sistemamoedas.models.ResponseEntity.TransactionResponse;
import sistemamoedas.models.Transactions;

import java.io.IOException;
import java.util.LinkedList;
import java.util.List;

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


    public String uploadImage(MultipartFile riskAreaImage);

    public LinkedList<String> getImagesPaths(Long idRiskArea) throws IOException;

    List<String> getAllCategories();

    Advantages saveAdvantage(Advantages advantage);
}
