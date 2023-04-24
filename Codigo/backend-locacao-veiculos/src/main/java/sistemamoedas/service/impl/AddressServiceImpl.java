package sistemamoedas.service.impl;

import sistemamoedas.repository.CitiesRepository;
import sistemamoedas.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AddressServiceImpl implements AddressService {

    @Autowired
    private CitiesRepository citiesRepository;

}
