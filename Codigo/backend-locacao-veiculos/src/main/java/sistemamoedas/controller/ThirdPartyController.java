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
import sistemamoedas.models.RequestEntity.ThirdPartyRequest;
import sistemamoedas.models.RequestEntity.UserRequest;
import sistemamoedas.models.ResponseEntity.ThirdPartyResponse;
import sistemamoedas.models.ThirdParty;
import sistemamoedas.models.User;
import sistemamoedas.models.dto.UserDto;
import sistemamoedas.service.ThirdPartyService;
import sistemamoedas.service.UserService;

import javax.validation.Valid;

@RestController
@CrossOrigin
@RequestMapping("/thirdParty")

public class ThirdPartyController {


    @Autowired
    private UserService userService;

    @Autowired
    private ThirdPartyService thirdPartyService;

    @PostMapping(path = "/create")
    @ApiOperation(value = "Criar novo registro de empresas parceiras")
    //@PreAuthorize("@authorityChecker.isAllowed({'ADMIN','DEF'})")
    public ResponseEntity<ThirdPartyResponse> createThirdParty(
            @ApiParam(value = "Json da requisição que contem os dados da empresa a ser salvo")
            @Valid @RequestBody ThirdPartyRequest request) throws NotFoundException {
        ThirdPartyResponse thirdPartyResponse = this.thirdPartyService.create(request);
        return ResponseEntity.ok().body(
                thirdPartyResponse
        );
    }


    @PostMapping(path = "/edit")
    @ApiOperation(value = "Editar cadastro de empresa parceira existente")
    @PreAuthorize("@authorityChecker.isAllowed({'ADMIN'})")
    public ResponseEntity<ThirdPartyResponse> editThirdParty(
            @ApiParam(value = "Json da requisição que contem o dado a ser editado")
            @Valid @RequestBody ThirdPartyRequest request) throws NotFoundException {

        return ResponseEntity.ok().body(
                this.thirdPartyService.edit(request)
        );
    }


    @DeleteMapping(path = "/delete/idThirdParty/{idThirdParty}")
    @PreAuthorize("@authorityChecker.isAllowed({'ADMIN'})")
    @ApiOperation(value = "Desativa cadastro de empresa parceira existente")
    public ResponseEntity<ThirdPartyResponse> deleteThirdParty(
            @PathVariable(value="idThirdParty") final Long idThirdParty){
        return ResponseEntity.ok().body(
                this.thirdPartyService.delete(idThirdParty)
        );
    }


    @GetMapping(path = "/page/{page}/size/{size}")
    @ResponseBody
    @ApiOperation(value = "Lista empresas cadastradas por página quantidade")
    public Page<ThirdParty> listThirdPartyByPageWithSize(
            @ApiParam(value = "Página que deseja visualizar iniciando em 0", example = "0")
            @PathVariable(value="page")
            int page,
            @ApiParam(value = "Quantidade de empresas a serem listados por página", example = "10")
            @PathVariable(value="size")
            int size){

        Pageable pages = PageRequest.of(page, size);
        return this.thirdPartyService.listThirdPartiesByPage(pages);

    }

    @PreAuthorize("@authorityChecker.isAllowed({'ADMIN'})")
    @GetMapping(path = "page/{page}/size/{size}/areaOfOperation/{areaOfOperation}")
    @ResponseBody
    @ApiOperation(value = "Lista empresas cadastradas por página quantidade")
    public Page<ThirdParty> listThirdPartyByIdAndPageWithSize(
            @ApiParam(value = "Página que deseja visualizar iniciando em 0", example = "0")
            @PathVariable(value="page")
            int page,
            @ApiParam(value = "Quantidade de empresas a serem  listados por página", example = "10")
            @PathVariable(value="size")
            int size,
            @PathVariable(value="areaOfOperation")
            String areaOfOperation
    ){

        Pageable pages = PageRequest.of(page, size);

        return this.thirdPartyService.listThirdPartiesByPageAndId(pages, areaOfOperation);

    }

    @PreAuthorize("@authorityChecker.isAllowed({'ADMIN'})")
    @GetMapping(path = "getThirdPartyById/idThirdParty/{idThirdParty}")
    @ResponseBody
    @ApiOperation(value = "retorna uma empresa por id")
    public ResponseEntity<ThirdPartyResponse> getThirdPartyById(
            @PathVariable(value="idThirdParty")
            Long idThirdParty)throws NotFoundException{

        return ResponseEntity.ok().body(
                this.thirdPartyService.getThirdPartyById(idThirdParty)
        );

    }






}
