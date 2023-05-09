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
import sistemamoedas.models.RequestEntity.UserRequest;
import sistemamoedas.models.User;
import sistemamoedas.models.dto.UserDto;
import sistemamoedas.service.UserService;

import javax.validation.Valid;

@RestController
@CrossOrigin
@RequestMapping("/transaction")
public class TransactionController {

    @Autowired
    private UserService userService;

    @PostMapping(path = "/createDeposit")
    @ApiOperation(value = "Criar novo usuário")
    //@PreAuthorize("@authorityChecker.isAllowed({'ADMIN','DEF'})")
    public ResponseEntity<UserDto> createDeposit(
            @ApiParam(value = "Json da requisição que contem o dado do usuario a ser salvo")
            @Valid @RequestBody UserRequest request) throws NotFoundException {
        UserDto userDto = this.userService.create(request);
        return ResponseEntity.ok().body(
                userDto
        );
    }

    @PostMapping(path = "/createSale")
    @ApiOperation(value = "Criar novo usuário")
    //@PreAuthorize("@authorityChecker.isAllowed({'ADMIN','DEF'})")
    public ResponseEntity<UserDto> createSale(
            @ApiParam(value = "Json da requisição que contem o dado do usuario a ser salvo")
            @Valid @RequestBody UserRequest request) throws NotFoundException {
        UserDto userDto = this.userService.create(request);
        return ResponseEntity.ok().body(
                userDto
        );
    }

    @PostMapping(path = "/viewExtract")
    @ApiOperation(value = "Criar novo usuário")
    //@PreAuthorize("@authorityChecker.isAllowed({'ADMIN','DEF'})")
    public ResponseEntity<UserDto> viewExtract(
            @ApiParam(value = "Json da requisição que contem o dado do usuario a ser salvo")
            @Valid @RequestBody UserRequest request) throws NotFoundException {
        UserDto userDto = this.userService.create(request);
        return ResponseEntity.ok().body(
                userDto
        );
    }




    @GetMapping(path = "/page/{page}/size/{size}")
    @ResponseBody
    @ApiOperation(value = "Lista usuários por página quantidade")
    public Page<User> listTransactionsByPageWithSize(
            @ApiParam(value = "Página que deseja visualizar iniciando em 0", example = "0")
            @PathVariable(value="page")
            int page,
            @ApiParam(value = "Quantidade de usuários a serem listados por página", example = "10")
            @PathVariable(value="size")
            int size){

        Pageable pages = PageRequest.of(page, size);
        return this.userService.listUsersByPage(pages);

    }

    @PreAuthorize("@authorityChecker.isAllowed({'ADMIN'})")
    @GetMapping(path = "page/{page}/size/{size}/name/{name}")
    @ResponseBody
    @ApiOperation(value = "Lista usuários por página quantidade")
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
