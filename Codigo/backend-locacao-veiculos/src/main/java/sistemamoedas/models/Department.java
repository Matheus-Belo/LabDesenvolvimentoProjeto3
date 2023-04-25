package sistemamoedas.models;

import lombok.Data;
import lombok.ToString;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@ToString
@Table(name = "department")
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "department_id")
    private Long idDepartment;

    @OneToOne
    @JoinColumn(name = "institution_id")
    private Institution idInstitution;

    @Column(name = "department_name")
    private String departmentName;

    @Column(name = "created_at")
    private Date createdAt;

    @Column(name = "deleted_at")
    private Date deletedAt;


    public Department() {
    }

    public Department(Long idDepartment, Institution idInstitution, String departmentName,
                      Date createdAt, Date deletedAt) {
        this.idDepartment = idDepartment;
        this.idInstitution = idInstitution;
        this.departmentName = departmentName;
        this.createdAt = createdAt;
        this.deletedAt = deletedAt;
    }

    public Department(Institution idInstitution, String departmentName, Date createdAt,
                      Date deletedAt) {
        this.idInstitution = idInstitution;
        this.departmentName = departmentName;
        this.createdAt = createdAt;
        this.deletedAt = deletedAt;
    }
}
