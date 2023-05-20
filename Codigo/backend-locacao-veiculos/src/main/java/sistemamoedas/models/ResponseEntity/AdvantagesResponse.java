package sistemamoedas.models.ResponseEntity;

import lombok.Data;
import sistemamoedas.models.Advantages;
import sistemamoedas.models.AdvantagesImages;
import sistemamoedas.models.ThirdParty;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;

@Data
public class AdvantagesResponse {


    private Long idAdvantages;

    private String advantageName;

    private ThirdParty thirdParty;

    private List<AdvantagesImages> advantagesImages;

    private String advantageDescription;

    private BigDecimal price;

    private Date validationDate;

    private String advantageCategory;

    private String couponCode;

    private String status;

    private String amount;

    private LinkedList<String> imagePaths;

    private Date createdAt;

    private Date deletedAt;

    public AdvantagesResponse(Long idAdvantages, String advantageName, ThirdParty thirdParty, List<AdvantagesImages> advantagesImages,
                              String advantageDescription, BigDecimal price, Date validationDate, String advantageCategory,
                              String couponCode, String status, String amount, LinkedList<String> imagePaths, Date createdAt, Date deletedAt) {
        this.idAdvantages = idAdvantages;
        this.advantageName = advantageName;
        this.thirdParty = thirdParty;
        this.advantagesImages = advantagesImages;
        this.advantageDescription = advantageDescription;
        this.price = price;
        this.validationDate = validationDate;
        this.advantageCategory = advantageCategory;
        this.couponCode = couponCode;
        this.status = status;
        this.amount = amount;
        this.imagePaths = imagePaths;
        this.createdAt = createdAt;
        this.deletedAt = deletedAt;
    }

    public static AdvantagesResponse fromAdvantages (Advantages advantages, LinkedList<String> paths){

        return new AdvantagesResponse(

                advantages.getIdAdvantages(),
                advantages.getAdvantageName(),
                advantages.getThirdParty(),
                advantages.getAdvantagesImages(),
                advantages.getAdvantageDescription(),
                advantages.getPrice(),
                advantages.getValidationDate(),
                advantages.getAdvantageCategory(),
                "OCULTADO PARA RESPOSTA NO FRONT",
                advantages.getStatus(),
                advantages.getAmount(),
                paths,
                advantages.getCreatedAt(),
                advantages.getDeletedAt()
        );

    }
}
