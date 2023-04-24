package sistemamoedas.service;

import sistemamoedas.models.States;
import javassist.NotFoundException;

public interface StateService {

    States findByUf(String uf) throws NotFoundException;
}
