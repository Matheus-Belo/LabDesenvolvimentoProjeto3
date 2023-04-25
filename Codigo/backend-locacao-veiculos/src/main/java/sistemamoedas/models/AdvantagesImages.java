package sistemamoedas.models;


import lombok.Data;
import lombok.ToString;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@ToString
@Table(name = "advantages_images")
public class AdvantagesImages {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "advantages_images_id")
    private Long idAdvantagesImages;

    @OneToOne
    @JoinColumn(name = "advantages_id")
    private Advantages idAdvantages;

    @Column(name = "advantage_image_name")
    private String advantageImageName;

    @Column(name = "advantage_image_description")
    private String advantageImageDescription;

    @Column(name = "advantage_image_path")
    private String advantageImagePath;

    @Column(name = "created_at")
    private Date createdAt;

    @Column(name = "deleted_at")
    private Date deletedAt;


    public AdvantagesImages() {
    }

    public AdvantagesImages(Long idAdvantagesImages, Advantages idAdvantages, String advantageImageName,
                            String advantageImageDescription, String advantageImagePath, Date createdAt,
                            Date deletedAt) {
        this.idAdvantagesImages = idAdvantagesImages;
        this.idAdvantages = idAdvantages;
        this.advantageImageName = advantageImageName;
        this.advantageImageDescription = advantageImageDescription;
        this.advantageImagePath = advantageImagePath;
        this.createdAt = createdAt;
        this.deletedAt = deletedAt;
    }

    public AdvantagesImages(Advantages idAdvantages, String advantageImageName, String advantageImageDescription,
                            String advantageImagePath, Date createdAt, Date deletedAt) {
        this.idAdvantages = idAdvantages;
        this.advantageImageName = advantageImageName;
        this.advantageImageDescription = advantageImageDescription;
        this.advantageImagePath = advantageImagePath;
        this.createdAt = createdAt;
        this.deletedAt = deletedAt;
    }
}

