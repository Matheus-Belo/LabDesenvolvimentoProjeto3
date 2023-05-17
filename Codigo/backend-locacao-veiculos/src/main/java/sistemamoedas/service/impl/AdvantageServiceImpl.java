package sistemamoedas.service.impl;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import sistemamoedas.models.*;
import sistemamoedas.models.RequestEntity.AdvantagesRequest;
import sistemamoedas.models.RequestEntity.UserRequest;
import sistemamoedas.models.ResponseEntity.AdvantagesResponse;
import sistemamoedas.models.dto.AddressDto;
import sistemamoedas.models.dto.UserDto;
import sistemamoedas.repository.AdvantagesImagesRepository;
import sistemamoedas.repository.AdvantagesRepository;
import sistemamoedas.service.AddressService;
import sistemamoedas.service.AdvantageService;
import sistemamoedas.service.ThirdPartyService;
import sistemamoedas.service.UserService;

import javax.persistence.NonUniqueResultException;
import java.io.File;
import java.io.IOException;
import java.util.*;

@Service
public class AdvantageServiceImpl implements AdvantageService {

    @Autowired
    AdvantagesRepository advantagesRepository;

    @Autowired
    UserService userService;

    @Autowired
    ThirdPartyService thirdPartyService;

    @Autowired
    AdvantagesImagesRepository advantagesImagesRepository;

    @Value("${systemRootImages}")
    private String systemPath;
    @Override
    public AdvantagesResponse createAdvantage(AdvantagesRequest request) {
        Optional<Advantages> advantageCheck = Optional.ofNullable(this.advantagesRepository.findOneByIdAdvantagesAndDeletedAtIsNull(request.getIdAdvantages()));

        if(!advantageCheck.isPresent()){

            ThirdParty thirdParty = thirdPartyService.getThirdPartyByIdThirdParty(request.getThirdPartyId());

            Advantages savedAdvantage = this.advantagesRepository.save(AdvantagesRequest.toAdvantages(request, thirdParty));

            AdvantagesResponse advantagesResponse = AdvantagesResponse.fromAdvantages(
                    savedAdvantage
            );

            LinkedList<String> paths = new LinkedList<String>();

            if(request.getAdvantagesImages()!= null) {

                int contLista = 0;
                for (MultipartFile actualImage :
                        request.getAdvantagesImages()) {

                    String actualPath = uploadImage(actualImage);

                    this.advantagesImagesRepository.save(new AdvantagesImages(
                            savedAdvantage,
                            request.getImagesNames().get(contLista),
                            request.getImagesDescription().get(contLista),
                            actualPath,
                            new Date(),
                            null
                    ));
                    contLista++;
                    paths.add(actualPath);
                }
            }



            advantagesResponse.getImagePaths().addAll(paths);

            return advantagesResponse;
        }else{
            throw new NonUniqueResultException("Vantagem ja cadastrado!");
        }
    }

    @Override
    public AdvantagesResponse editAdvantage(AdvantagesRequest request) {

        Advantages advantages = this.advantagesRepository.findOneByIdAdvantagesAndDeletedAtIsNull(request.getIdAdvantages());

        if (advantages == null){
            advantages = this.advantagesRepository.findOneByIdAdvantagesAndDeletedAtIsNull(request.getIdAdvantages());
        }

        if(advantages != null){

            ThirdParty thirdParty = thirdPartyService.getThirdPartyByIdThirdParty(request.getThirdPartyId());

            Advantages savedAdvantage = this.advantagesRepository.save(AdvantagesRequest.toAdvantages(request, thirdParty));

            return AdvantagesResponse.fromAdvantages(savedAdvantage);

        }else{
            throw new NonUniqueResultException("Vantagem nao encontrada");
        }
    }

    @Override
    public AdvantagesResponse deleteAdvantage(Long idAdvantage) {
        return null;
    }

    @Override
    public Page<Advantages> listAdvantagesByPage(Pageable pages) {
        return null;
    }

    @Override
    public Page<Advantages> listAdvantagesByPageAndThirdPartyId(Pageable pages, Long idThirdParty) {
        return null;
    }

    @Override
    public Advantages getAdvantageById(Long idAdvantage) {
        return null;
    }

    @Override
    public Page<Advantages> listAdvantagesByPageAndCategory(Pageable pages, String category) {
        return null;
    }

    @Override
    public Page<Advantages> listAdvantagesByPageAndName(Pageable pages, String advantagename) {
        return null;
    }

    @Override
    public String uploadImage(MultipartFile riskAreaImage) {
        try {
            Date saveDate = new Date();

            User loggedUser = userService.getUserByPrincipal();

            String path = systemPath+saveDate.getTime()+"_"+loggedUser.getIdUser()+"_.jpg"; // lugar pra salvar a imagem data atual+iddo user


            File dest = new File(path);
            riskAreaImage.transferTo(dest);
            return path;
        }catch (Exception e){e.printStackTrace();return "fail";}

    }

    @Override
    public LinkedList<String> getImagesPaths(Long idRiskArea) throws IOException {

      /*  RiskArea riskArea = this.riskAreaRepository.findOneByIdRiskAreaAndDeletedAtIsNull(idRiskArea);

        RiskAreaResponse riskAreaResponse= RiskAreaResponse.fromRiskArea(riskArea);

        LinkedList<RiskAreaImages> riskAreaImages = Optional.of(this.riskAreaImagesRepository.findAllByIdRiskAreaAndDeletedAtIsNull(riskArea))
                .orElseThrow(()-> new NonUniqueResultException("Imagem Inexistente"));

        LinkedList<String> paths = new LinkedList<String>();


        for (RiskAreaImages actualImage :
                riskAreaImages) {


            paths.add(actualImage.getImagePath());
        }

        riskAreaResponse.getImagePaths().addAll(paths);


        return paths;*/
        return null;
    }
}
