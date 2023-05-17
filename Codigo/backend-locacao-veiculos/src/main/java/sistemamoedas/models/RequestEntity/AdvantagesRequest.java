package sistemamoedas.models.RequestEntity;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;
import sistemamoedas.models.Advantages;
import sistemamoedas.models.ThirdParty;
import sistemamoedas.models.Transactions;
import sistemamoedas.models.User;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Data
public class AdvantagesRequest {


    private Long idAdvantages;

    private String advantageName;

    private String advantageDescription;

    private BigDecimal price;

    private Date validationDate;

    private Long thirdPartyId;

    private String advantageCategory;

    private String couponCode;

    private String status;

    private String amount;

    private Date createdAt;

    private Date deletedAt;

    private MultipartFile[] advantagesImages;



    public static Advantages toAdvantages(AdvantagesRequest request, ThirdParty thirdParty) {

        return new Advantages(



        );

    }

}
