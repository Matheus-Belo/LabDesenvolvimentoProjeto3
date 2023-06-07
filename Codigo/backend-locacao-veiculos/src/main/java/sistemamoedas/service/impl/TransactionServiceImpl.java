package sistemamoedas.service.impl;


import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfWriter;
import com.lowagie.text.pdf.draw.DottedLineSeparator;
import javassist.NotFoundException;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import sistemamoedas.enums.AdvantageStatusEnum;
import sistemamoedas.enums.TransactionTypeEnum;
import sistemamoedas.models.*;
import sistemamoedas.models.RequestEntity.ThirdPartyRequest;
import sistemamoedas.models.RequestEntity.TransactionRequest;
import sistemamoedas.models.RequestEntity.UserRequest;
import sistemamoedas.models.ResponseEntity.ThirdPartyResponse;
import sistemamoedas.models.ResponseEntity.TransactionResponse;
import sistemamoedas.models.dto.AddressDto;
import sistemamoedas.repository.TransactionsRepository;
import sistemamoedas.service.AdvantageService;
import sistemamoedas.service.EmailService;
import sistemamoedas.service.TransactionService;
import sistemamoedas.service.UserService;


import javax.persistence.NonUniqueResultException;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

@Service
public class TransactionServiceImpl implements TransactionService {

    @Autowired
    TransactionsRepository transactionsRepository;
    @Autowired
    UserService userService;

    @Autowired
    AdvantageService advantageService;

    @Value("${systemRootPhysical}")
    private String systemPathPDF;

    @Autowired
    EmailService emailService;

    @Override
    //Ao receber uma moeda, o aluno deve ser notificado por email.
    //notificar o professor por email com novo saldo.
    public TransactionResponse createDeposit(TransactionRequest request) throws NotFoundException {

        Optional<Transactions> verifyTransaction = Optional.ofNullable(
                this.transactionsRepository.findOneByIdTransactionAndDeletedAtIsNull(request.getIdTransaction())
        );

        if(!verifyTransaction.isPresent()) {

            return getTransactionResponse(request,false);

        }else{
            throw new NonUniqueResultException(" Transação não instanciada, falha ao gerar ");
        }

    }

    @Override
    public TransactionResponse createSale(TransactionRequest request) throws NotFoundException {

        Optional<Transactions> verifyTransaction = Optional.ofNullable(
                this.transactionsRepository.findOneByIdTransactionAndDeletedAtIsNull(request.getIdTransaction())
        );

        if(!verifyTransaction.isPresent()) {

            return getTransactionResponse(request,true);
        }else{
            throw new NonUniqueResultException(" Transação não instanciada, falha ao gerar ");
        }
    }

    private TransactionResponse getTransactionResponse(TransactionRequest request, boolean sale) throws NotFoundException {
        Advantages advantage = null;

        User originAccount = Optional.of(this.userService.getUserById(request.getIdOriginAccount()))
                .orElseThrow(() -> new NonUniqueResultException("Usuario da conta de origem não encontrado"));

        User destinationAccount = Optional.of(this.userService.getUserById(request.getIdDestinationAccount()))
                .orElseThrow(() -> new NonUniqueResultException("Usuario da conta de destino não encontrado"));

        if(request.getItemCode()!=null && sale){
           advantage = Optional.of(this.advantageService.getAdvantageById(request.getItemCode()))
                    .orElseThrow(() -> new NonUniqueResultException("Vantagem não encontrada"));

            request.setAmount(advantage.getPrice());

        }



        if (originAccount.getWallet().compareTo(request.getAmount()) >= 0) {

            originAccount.setWallet(originAccount.getWallet().subtract(request.getAmount()));
            destinationAccount.setWallet(destinationAccount.getWallet().add(request.getAmount()));

            this.userService.saveUser(originAccount);
            this.userService.saveUser(destinationAccount);

            if(sale){
                advantage.setStatus(AdvantageStatusEnum.SOLD.getCode());
                this.advantageService.saveAdvantage(advantage);
            }

            Transactions transactionResponse = this.transactionsRepository.save(
                    TransactionRequest.toTransactions(
                            request,
                            originAccount,
                            destinationAccount,
                            sale ? TransactionTypeEnum.SALE.getCode() : TransactionTypeEnum.DEPOSIT.getCode(),
                            sale? advantage :null
                    )
            );


            if(sale) {

                String messageToBuyer = "Compra do item: "+advantage.getAdvantageName()+" Efetuada com sucesso. Cupom: "+advantage.getCouponCode()+" .";
                String messageToOwner = "Venda do item: "+advantage.getAdvantageName()+" Efetuada com sucesso. Cupom: "+advantage.getCouponCode()+" .";
                emailService.sendEmail(originAccount.getEmail(),"Compra Sistema Moedas", messageToBuyer);
                emailService.sendEmail(destinationAccount.getEmail(),"Venda Sistema Moedas", messageToOwner);
            }else{
                String messageToDestination = "Transferencia no valor de: "+transactionResponse.getAmount()+" Recebida com sucesso.";
                String messageToOrigin = "Transferencia no valor de: "+transactionResponse.getAmount()+" Efetuada com sucesso.";

                emailService.sendEmail(originAccount.getEmail(),"Transferencia Efetuada Sistema Moedas", messageToOrigin);
                emailService.sendEmail(destinationAccount.getEmail(),"Transferencia Recebida Sistema Moedas", messageToDestination);
            }
            return TransactionResponse.fromTransactions(transactionResponse);

        } else {
            throw new NonUniqueResultException(" Transação não concluida, Conta de origem não possui saldo ");
        }
    }

    @Override
    //Professores e alunos devem ser capazes de consultar o extrato de sua conta, visualizando o total de moedas que ainda possui, bem como as transações que realizou
    public List<Transactions> getExtractAsList(Long idConta) throws NotFoundException {

        User conta = this.userService.getUserById(idConta);

        return this.transactionsRepository.findAllByIdOriginAccountAndDeletedAtIsNullOrderByIdOriginAccount(conta);
    }

    @Override
    //Professores e alunos devem ser capazes de consultar o extrato de sua conta, visualizando o total de moedas que ainda possui, bem como as transações que realizou
    public Page<Transactions> getExtractAsPaged(Pageable pages, Long idConta) throws NotFoundException {


        User originAccount = Optional.of(this.userService.getUserById(idConta))
                .orElseThrow(() -> new NonUniqueResultException("Usuario da conta de origem não encontrado"));

        User destination = Optional.of(this.userService.getUserById(idConta))
                .orElseThrow(() -> new NonUniqueResultException("Usuario da conta de destino não encontrado"));

        return this.transactionsRepository.findAllByIdOriginAccountOrIdDestinationAccountAndDeletedAtIsNullOrderByIdTransaction(pages,originAccount,destination);

    }

    @Override
    public LinkedList<TransactionResponse> enviaMoedasProfessores () throws NotFoundException {


        //LinkedList<User> professores = this.userService.giveMonthlyCoinsForTeachers();

        LinkedList<TransactionResponse> responses = new LinkedList<TransactionResponse>();

        List<User> professores = this.userService.getAllTeachers();

        for (User professor:
               professores) {

                User originAccount = Optional.of(this.userService.getUserById(1L))
                        .orElseThrow(() -> new NonUniqueResultException("Usuario da conta de origem não encontrado"));

                User destinationAccount = Optional.of(this.userService.getUserById(professor.getIdUser()))
                        .orElseThrow(() -> new NonUniqueResultException("Usuario da conta de destino não encontrado"));

                professor.setWallet(professor.getWallet().add(BigDecimal.valueOf(1000)));
                this.userService.saveUser(professor);

                Transactions transactionResponse = this.transactionsRepository.save(
                        TransactionRequest.toTransactionsAuto(originAccount, destinationAccount, TransactionTypeEnum.DEPOSIT.getCode())
                );

                String messageToDestination = "Transferencia Automatica mensal no valor de: "+transactionResponse.getAmount()+" Recebida com sucesso.";
                emailService.sendEmail(destinationAccount.getEmail(),"Transferencia Recebida Sistema Moedas", messageToDestination);

                responses.add(TransactionResponse.fromTransactions(transactionResponse));
        }

        return responses;
    }


    @Override
    public Transactions getTransactionById(Long idTransaction) {
        return this.transactionsRepository.findOneByIdTransactionAndDeletedAtIsNull(idTransaction);
    }

    @Override
    public byte[] getExtractAsPDF(Long idConta) throws NonUniqueResultException, NotFoundException, IOException, DocumentException {
    //public File getExtractAsPDF(Long idConta) throws NonUniqueResultException, NotFoundException, IOException, DocumentException {

        User originAccount = Optional.of(this.userService.getUserById(idConta))
                .orElseThrow(() -> new NonUniqueResultException("Usuario da conta de origem não encontrado"));

        User destination = Optional.of(this.userService.getUserById(idConta))
                .orElseThrow(() -> new NonUniqueResultException("Usuario da conta de destino não encontrado"));

        Pageable pages = PageRequest.of(0, 300);


        Page<Transactions> transactions = Optional.of(
                    this.transactionsRepository.findAllByIdOriginAccountOrIdDestinationAccountAndDeletedAtIsNullOrderByIdTransaction(pages,originAccount,destination)
                )
                .orElseThrow(()-> new NonUniqueResultException("sem transaçoes para esta conta"));

        Document document = new Document();

        Date actualDate = new Date();
        String fileName = "extract_"+originAccount.getName()+"_id_"+originAccount.getIdUser()+"_"+actualDate.getTime()+".pdf";
        PdfWriter.getInstance(document, new FileOutputStream(this.systemPathPDF+fileName));

        String content = "Extratos do Cliente "+originAccount.getName()+" \n\n\n";

        document.open();
        Font font = FontFactory.getFont(FontFactory.COURIER, 24,Font.BOLD,BaseColor.BLACK);
        Chunk chunk = new Chunk(content, font);
        //document.add(chunk);
        Paragraph first = new Paragraph();
        first.add(chunk);
        document.add(first);

        font = FontFactory.getFont(FontFactory.COURIER, 12,BaseColor.BLACK);

        for (Transactions actualTransaction:
             transactions.getContent()) {
            content = "Tipo Transação: " + actualTransaction.getTransactionType() +
                    ", Quantidade : " + actualTransaction.getAmount() +
                    ", Conta Origem: " + actualTransaction.getIdOriginAccount().getName() +
                    ", Conta Destino: " + actualTransaction.getIdDestinationAccount().getName() +
                    ", Data: " + actualTransaction.getTransactionDate().toString() + "; \n\n";



            chunk = new Chunk(content, font);
            //document.add(chunk);
            first = new Paragraph();
            first.add(chunk);
            document.add(first);

        }
        document.close();
        System.out.print(content);


        Path PDFPath = Paths.get(this.systemPathPDF+fileName);

        return Files.readAllBytes(PDFPath);

        /*File pdfFile = new File(this.systemPathPDF+fileName);
        return pdfFile;*/

    }




}
