package sistemamoedas.controller;

import com.itextpdf.text.DocumentException;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import javassist.NotFoundException;
import org.hibernate.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import sistemamoedas.models.Advantages;
import sistemamoedas.models.RequestEntity.TransactionRequest;
import sistemamoedas.models.RequestEntity.UserRequest;
import sistemamoedas.models.ResponseEntity.TransactionResponse;
import sistemamoedas.models.Transactions;
import sistemamoedas.models.User;
import sistemamoedas.models.dto.UserDto;
import sistemamoedas.service.TransactionService;
import sistemamoedas.service.UserService;

import javax.validation.Valid;
import java.io.IOException;
import java.util.LinkedList;
import java.util.List;

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
    @ApiOperation(value = "retorna lista completa do extrato deste usuario")
    //@PreAuthorize("@authorityChecker.isAllowed({'ADMIN','DEF'})")
    public List<Transactions> viewExtract(
            @PathVariable(value="idConta")
            Long idConta) throws NotFoundException {
        List<Transactions> list = this.transactionService.getExtractAsList(idConta);
        return list;
    }


    @GetMapping(path = "viewExtractPaged/{page}/size/{size}/idConta/{idConta}")
    @ResponseBody
    @ApiOperation(value = "lista o extrato bancario do Usuario, paginado")
    public Page<Transactions> viewExtractPaged(
            @ApiParam(value = "Página que deseja visualizar iniciando em 0", example = "0")
            @PathVariable(value="page")
                    int page,
            @ApiParam(value = "Quantidade de registros a serem listados por página", example = "10")
            @PathVariable(value="size")
                    int size,
            @PathVariable(value="idConta")
                    Long idConta
    ) throws NotFoundException {

        Pageable pages = PageRequest.of(page, size);

        return this.transactionService.getExtractAsPaged(pages, idConta);

    }
    @GetMapping(
            value = "/getExtractAsPDF/idConta/{idConta}",
            produces = MediaType.APPLICATION_PDF_VALUE
    )
    @ApiOperation(value = "get image")
    @PreAuthorize("@authorityChecker.isAllowed({'ADMIN'})")
    public @ResponseBody byte[] getExtractAsPDF(
            @ApiParam("id monthly payment")
            @PathVariable (value="idConta") Long idConta) throws IOException, NotFoundException, DocumentException {

        return this.transactionService.getExtractAsPDF(idConta);

    }

    @GetMapping(path = "gettransactionbyid/idTransaction/{idTransaction}")
    @ResponseBody
    @ApiOperation(value = "retorna uma transaçao por id")
    public ResponseEntity<Transactions> getTransactionById(
            @PathVariable(value="idTransaction")
            Long idTransaction)throws NotFoundException{

        return ResponseEntity.ok().body(
                this.transactionService.getTransactionById(idTransaction)
        );
    }

}
