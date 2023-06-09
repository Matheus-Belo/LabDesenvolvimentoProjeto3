package sistemamoedas;

import sistemamoedas.enums.RolesEnum;
import sistemamoedas.enums.SexEnum;
import sistemamoedas.models.*;
import sistemamoedas.repository.AddressRepository;
import sistemamoedas.repository.RoleRepository;
import sistemamoedas.repository.UserRepository;
import sistemamoedas.service.CityService;
import sistemamoedas.service.StateService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import java.math.BigDecimal;
import java.util.Collections;
import java.util.Date;

@SpringBootApplication
public class SistemaMoedaJavaApplication {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder bcryptEncoder;

	@Autowired
	private RoleRepository roleRepository;

	@Autowired
	private CityService cityService;

	@Autowired
	private StateService stateService;

	@Autowired
	private AddressRepository addressRepository;

	public static void main(String[] args) {
		SpringApplication.run(SistemaMoedaJavaApplication.class, args);
	}

	@PostConstruct
	@Transactional
	public void createFirstAdminUser() throws NotFoundException {
		User admin = this.userRepository.findOneByEmailAndDeletedAtIsNull("admin@admin.com");

		Role admRole = this.roleRepository.findByName(RolesEnum.ADMIN.getCode());

		if(admin == null){
			System.out.println("Creating first admin default account...");

			Cities city = this.cityService.findByCity("BH");
			States states = this.stateService.findByUf("MG");
			Address address = this.addressRepository.save(new Address(
					"Rua",
					123,
					"bairro",
					city,
					states,
					"30690740"
			));

			admin = new User("Admin",
					"admin@admin.com",
					this.bcryptEncoder.encode("12345678"),
					new Date(),
					"33853056",
					"33853056",
					"123456789",
					address,
					SexEnum.MALE,
					Collections.singletonList(admRole),
					new BigDecimal(9000)
				);
		}else if(admin.getRoles().stream().noneMatch(role -> role.equals(admRole))){
			System.out.println("Adding role to existing Admin account...");
			admin.setRoles(Collections.singletonList(admRole));
		}else{
			return;
		}

		this.userRepository.save(admin);
	}
}
