package sistemamoedas.controller;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import sistemamoedas.models.Advantages;
import sistemamoedas.models.RequestEntity.AdvantagesRequest;
import sistemamoedas.models.RequestEntity.UserRequest;
import sistemamoedas.models.ResponseEntity.AdvantagesResponse;
import sistemamoedas.models.User;
import sistemamoedas.models.dto.UserDto;
import sistemamoedas.service.AdvantageService;
import sistemamoedas.service.UserService;

import javax.validation.Valid;

@RestController
@CrossOrigin
@RequestMapping("/advantages")
public class AdvantagesController {

    @Autowired
    private AdvantageService advantageService;

    @PostMapping(path = "/create")
    @ApiOperation(value = "Criar nova vantagem")
    //@PreAuthorize("@authorityChecker.isAllowed({'ADMIN','DEF'})")
    public ResponseEntity<AdvantagesResponse> createAdvantage(
            @ApiParam(value = "Json da requisição que contem o dado da vantagem a ser salva")
            @Valid @RequestBody AdvantagesRequest request) throws NotFoundException {
        AdvantagesResponse advantagesResponse = this.advantageService.createAdvantage(request);
        return ResponseEntity.ok().body(
                advantagesResponse
        );
    }


    @PostMapping(path = "/edit")
    @ApiOperation(value = "Editar vantagem existente")
    public ResponseEntity<AdvantagesResponse> editAdvantage(
            @ApiParam(value = "Json da requisição que contem o dado da vantagem a ser editado")
            @Valid @RequestBody AdvantagesRequest request) throws NotFoundException {


        AdvantagesResponse advantagesResponse = this.advantageService.editAdvantage(request);
        return ResponseEntity.ok().body(
                advantagesResponse
        );
    }

    @DeleteMapping(path = "/delete/idAdvantage/{idAdvantage}")
    @ApiOperation(value = "Desativa a vantagem existente")
    public ResponseEntity<AdvantagesResponse> deleteAdvantage(@PathVariable(value="idAdvantage") final Long idAdvantage){

        AdvantagesResponse advantagesResponse = this.advantageService.deleteAdvantage(idAdvantage);
        return ResponseEntity.ok().body(
                advantagesResponse
        );
    }


    @GetMapping(path = "/page/{page}/size/{size}")
    @ResponseBody
    @ApiOperation(value = "Lista todas as vantagens por página quantidade")
    //listar todas as vantagens
    public Page<Advantages> listAllAdvantagesByPageWithSize(
            @ApiParam(value = "Página que deseja visualizar iniciando em 0", example = "0")
            @PathVariable(value="page")
            int page,
            @ApiParam(value = "Quantidade de vantagens a serem listados por página", example = "10")
            @PathVariable(value="size")
            int size){

        Pageable pages = PageRequest.of(page, size);
        return this.advantageService.listAdvantagesByPage(pages);

    }

    @GetMapping(path = "page/{page}/size/{size}/idThirdParty/{idThirdParty}")
    @ResponseBody
    @ApiOperation(value = "Lista vantagens por página quantidade, de uma determinada emrpesa")
    //listar vantagens por thirdParty
    public Page<Advantages> listAdvantagesByThirdPartyAndPageWithSize(
            @ApiParam(value = "Página que deseja visualizar iniciando em 0", example = "0")
            @PathVariable(value="page")
            int page,
            @ApiParam(value = "Quantidade de vantagens a serem listados por página", example = "10")
            @PathVariable(value="size")
            int size,
            @PathVariable(value="idThirdParty")
            Long idThirdParty
    ){

        Pageable pages = PageRequest.of(page, size);

        return this.advantageService.listAdvantagesByPageAndThirdPartyId(pages, idThirdParty);

    }

    @GetMapping(path = "page/{page}/size/{size}/category/{category}")
    @ResponseBody
    @ApiOperation(value = "Lista vantagens por página quantidade, de uma determinada categoria")
    //listar vantagens por Categoria
    public Page<Advantages> listAdvantagesByCategoryAndPageWithSize(
            @ApiParam(value = "Página que deseja visualizar iniciando em 0", example = "0")
            @PathVariable(value="page")
            int page,
            @ApiParam(value = "Quantidade de vantagens a serem listados por página", example = "10")
            @PathVariable(value="size")
            int size,
            @PathVariable(value="category")
            String category
    ){

        Pageable pages = PageRequest.of(page, size);

        return this.advantageService.listAdvantagesByPageAndCategory(pages, category);

    }

    @GetMapping(path = "page/{page}/size/{size}/advantagename/{advantagename}")
    @ResponseBody
    @ApiOperation(value = "Lista vantagens por página quantidade, pelo nome de uma vantagem")
    //listar vantagem por keysearch (name)
    public Page<Advantages> listAdvantagesByAdvantageNameAndPageWithSize(
            @ApiParam(value = "Página que deseja visualizar iniciando em 0", example = "0")
            @PathVariable(value="page")
            int page,
            @ApiParam(value = "Quantidade de vantagens a serem listados por página", example = "10")
            @PathVariable(value="size")
            int size,
            @PathVariable(value="advantagename")
            String advantagename
    ){

        Pageable pages = PageRequest.of(page, size);

        return this.advantageService.listAdvantagesByPageAndName(pages, advantagename);

    }


    @GetMapping(path = "getadvantagebyid/idAdvantage/{idAdvantage}")
    @ResponseBody
    @ApiOperation(value = "Lista usuários por página quantidade")
    //retorna uma vantagem por id
    public ResponseEntity<Advantages> getAdvantageById(
            @PathVariable(value="idAdvantage")
            Long idAdvantage)throws NotFoundException{

        return ResponseEntity.ok().body(
                this.advantageService.getAdvantageById(idAdvantage)
        );
    }

}
