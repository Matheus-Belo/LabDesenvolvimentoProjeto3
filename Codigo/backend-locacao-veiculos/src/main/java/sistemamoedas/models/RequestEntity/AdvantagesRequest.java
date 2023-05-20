package sistemamoedas.models.RequestEntity;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;
import sistemamoedas.enums.AdvantageStatusEnum;
import sistemamoedas.models.*;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Calendar;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;

@Data
public class AdvantagesRequest {


    private Long idAdvantages;

    private String advantageName;

    private Long thirdPartyId;

    private String advantageDescription;

    private BigDecimal price;

    private int validationDate;

    private String advantageCategory;

    private String couponCode;

    private String status;

    private String amount;

    private Date createdAt;

    private Date deletedAt;

    private LinkedList<MultipartFile> advantagesImages;

    private LinkedList<String> imagesNames;

    private LinkedList<String> imagesDescription;



    public static Advantages toAdvantages(AdvantagesRequest request, ThirdParty thirdParty,
                                          List<AdvantagesImages> receivedImages,
                                          String couponCode) {

        Date dueDate =  new Date();
        Calendar c = Calendar.getInstance();

        c.setTime(dueDate);
        c.set(Calendar.HOUR_OF_DAY, 0);
        c.set(Calendar.MINUTE, 0);
        c.set(Calendar.SECOND, 0);
        c.set(Calendar.MILLISECOND, 0);
        c.add(Calendar.DAY_OF_MONTH,request.getValidationDate());
        dueDate = c.getTime();

        return new Advantages(

                request.getIdAdvantages() != null ? request.getIdAdvantages() : 0L,
                request.getAdvantageName(),
                thirdParty,
                receivedImages,
                request.getAdvantageDescription(),
                request.getPrice(),
                dueDate,
                request.getAdvantageCategory(),
                couponCode,
                AdvantageStatusEnum.AVAILABLE.getCode(),
                request.getAmount() != null ? request.getAmount() : "1",
                new Date(),
                null

        );

    }

}
