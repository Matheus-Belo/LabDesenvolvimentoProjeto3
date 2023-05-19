package sistemamoedas.models.RequestEntity;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;
import sistemamoedas.models.*;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.math.BigDecimal;
import java.util.Date;
import java.util.LinkedList;
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

    private LinkedList<MultipartFile> advantagesImages;

    private LinkedList<String> imagesNames;

    private LinkedList<String> imagesDescription;



    public static Advantages toAdvantages(AdvantagesRequest request, ThirdParty thirdParty, List<AdvantagesImages> receivedImages) {

        return new Advantages(



        );

    }

}
