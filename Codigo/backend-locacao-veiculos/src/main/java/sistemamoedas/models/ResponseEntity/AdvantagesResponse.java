package sistemamoedas.models.ResponseEntity;

import lombok.Data;
import sistemamoedas.models.Advantages;
import sistemamoedas.models.ThirdParty;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.math.BigDecimal;
import java.util.Date;
import java.util.LinkedList;

@Data
public class AdvantagesResponse {


    private Long idAdvantages;

    private String advantageName;

    private String advantageDescription;

    private BigDecimal price;

    private Date validationDate;

    private String advantageCategory;

    private Long idThirdParty;

    private LinkedList<String> imagePaths;

    private Date createdAt;

    private Date deletedAt;


    public static AdvantagesResponse fromAdvantages (Advantages advantages){

        return new AdvantagesResponse(

        );

    }
}
