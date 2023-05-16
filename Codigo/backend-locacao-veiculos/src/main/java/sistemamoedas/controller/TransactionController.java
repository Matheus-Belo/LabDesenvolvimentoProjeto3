package sistemamoedas.controller;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import javassist.NotFoundException;
import org.hibernate.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import sistemamoedas.models.RequestEntity.TransactionRequest;
import sistemamoedas.models.RequestEntity.UserRequest;
import sistemamoedas.models.ResponseEntity.TransactionResponse;
import sistemamoedas.models.User;
import sistemamoedas.models.dto.UserDto;
import sistemamoedas.service.TransactionService;
import sistemamoedas.service.UserService;

import javax.validation.Valid;

@RestController
@CrossOrigin
@RequestMapping("/transaction")
public class TransactionController {

    @Autowired
    private UserService userService;

    @Autowired
    private TransactionService transactionService;

    @PostMapping(path = "/createDeposit")
    @ApiOperation(value = "Criar nova transação de deposito")
    //@PreAuthorize("@authorityChecker.isAllowed({'ADMIN','DEF'})")
    public ResponseEntity<TransactionResponse> createDeposit(
            @ApiParam(value = "Json da requisição que contem os dados da transação")
            @Valid @RequestBody TransactionRequest request) throws NotFoundException {
        TransactionResponse transactionResponse = this.transactionService.createDeposit(request);
        return ResponseEntity.ok().body(
                transactionResponse
        );
    }

    @PostMapping(path = "/createSale")
    @ApiOperation(value = "Criar nova transação de venda")
    //@PreAuthorize("@authorityChecker.isAllowed({'ADMIN','DEF'})")
    public ResponseEntity<TransactionResponse> createSale(
            @ApiParam(value = "Json da requisição que contem os dados da transação")
            @Valid @RequestBody TransactionRequest request) throws NotFoundException {
        TransactionResponse transactionResponse = this.transactionService.createSale(request);
        return ResponseEntity.ok().body(
                transactionResponse
        );
    }

    @GetMapping(path = "viewExtract/idConta/{idConta}")
    @ResponseBody
    @ApiOperation(value = "retorna lista completa do extrato deste usuario")
    //@PreAuthorize("@authorityChecker.isAllowed({'ADMIN','DEF'})")
    public ResponseEntity<UserDto> viewExtract(
            @ApiParam(value = "Json da requisição que contem o dado do usuario a ser salvo")
            @Valid @RequestBody UserRequest request) throws NotFoundException {
        UserDto userDto = this.userService.create(request);
        return ResponseEntity.ok().body(
                userDto
        );
    }


    @GetMapping(path = "viewExtractPaged/{page}/size/{size}/idConta/{idConta}")
    @ResponseBody
    @ApiOperation(value = "lista o extrato bancario do Usuario paginado")
    public Page<User> listUserByNameAndPageWithSize(
            @ApiParam(value = "Página que deseja visualizar iniciando em 0", example = "0")
            @PathVariable(value="page")
                    int page,
            @ApiParam(value = "Quantidade de usuários a serem listados por página", example = "10")
            @PathVariable(value="size")
                    int size,
            @PathVariable(value="name")
                    String name
    ){

        Pageable pages = PageRequest.of(page, size);

        return this.userService.listUsersByPageAndName(pages, name);

    }


}
