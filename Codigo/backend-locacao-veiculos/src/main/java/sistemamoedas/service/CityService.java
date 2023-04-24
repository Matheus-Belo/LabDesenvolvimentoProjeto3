package sistemamoedas.service;

import sistemamoedas.models.Cities;

public interface CityService {

    Cities findByCity(String city);
}
