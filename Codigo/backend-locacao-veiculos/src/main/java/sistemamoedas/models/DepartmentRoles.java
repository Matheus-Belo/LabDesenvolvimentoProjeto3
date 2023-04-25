package sistemamoedas.models;

import lombok.Data;
import lombok.ToString;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@ToString
@Table(name = "department_roles")
public class DepartmentRoles {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "department_roles_id")
    private Long idDepartmentRoles;

    @Column(name = "name")
    private String name;

    @Column(name = "created_at")
    private Date createdAt;

    @Column(name = "deleted_at")
    private Date deletedAt;

    public DepartmentRoles() {
    }

    public DepartmentRoles(Long idDepartmentRoles, String name,
                           Date createdAt, Date deletedAt) {
        this.idDepartmentRoles = idDepartmentRoles;
        this.name = name;
        this.createdAt = createdAt;
        this.deletedAt = deletedAt;
    }

    public DepartmentRoles(String name, Date createdAt, Date deletedAt) {
        this.name = name;
        this.createdAt = createdAt;
        this.deletedAt = deletedAt;
    }
}
