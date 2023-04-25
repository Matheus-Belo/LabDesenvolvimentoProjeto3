package sistemamoedas.models;


import lombok.Data;
import lombok.ToString;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@ToString
@Table(name = "user_department")
public class UserDepartment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_department_id")
    private Long iduserDepartment;

    @OneToOne
    @JoinColumn(name = "department_roles_id")
    private DepartmentRoles idDepartmentRoles;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User idUser;

    @OneToOne
    @JoinColumn(name = "department_id")
    private Department idDepartment;

    @Column(name = "created_at")
    private Date createdAt;

    @Column(name = "deleted_at")
    private Date deletedAt;

    public UserDepartment() {
    }

    public UserDepartment(Long iduserDepartment, DepartmentRoles idDepartmentRoles, User idUser,
                          Department idDepartment, Date createdAt, Date deletedAt) {
        this.iduserDepartment = iduserDepartment;
        this.idDepartmentRoles = idDepartmentRoles;
        this.idUser = idUser;
        this.idDepartment = idDepartment;
        this.createdAt = createdAt;
        this.deletedAt = deletedAt;
    }

    public UserDepartment(DepartmentRoles idDepartmentRoles, User idUser, Department idDepartment,
                          Date createdAt, Date deletedAt) {
        this.idDepartmentRoles = idDepartmentRoles;
        this.idUser = idUser;
        this.idDepartment = idDepartment;
        this.createdAt = createdAt;
        this.deletedAt = deletedAt;
    }
}
