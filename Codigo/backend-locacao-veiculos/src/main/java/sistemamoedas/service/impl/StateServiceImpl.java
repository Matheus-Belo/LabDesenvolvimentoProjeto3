package sistemamoedas.service.impl;

import sistemamoedas.models.States;
import sistemamoedas.repository.StatesRepository;
import sistemamoedas.service.StateService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StateServiceImpl implements StateService {

    @Autowired
    private StatesRepository statesRepository;

    @Override
    public States findByUf(String uf) throws NotFoundException {
        return this.statesRepository.findByUf(uf)
                .orElseThrow(() -> new NotFoundException("Estado nao encontrado para a UF "+uf));
    }
}
