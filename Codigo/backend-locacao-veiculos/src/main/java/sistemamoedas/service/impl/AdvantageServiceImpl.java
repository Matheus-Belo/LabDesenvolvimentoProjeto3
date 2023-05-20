package sistemamoedas.service.impl;


import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import sistemamoedas.enums.RolesEnum;
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

            return getAdvantagesResponse(request,false);
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

            return getAdvantagesResponse(request,true);

        }else{
            throw new NonUniqueResultException("Vantagem nao encontrada");
        }
    }



    private String generateCoupon(Long id) {


        ThirdParty thirdParty = getThirdParty(id);

        List<Advantages> advantages = this.advantagesRepository.findAllByDeletedAtIsNullOrderByIdAdvantagesAsc();

        String couponForCheck = thirdParty.getThirdPartyName()+nextRandom(id)+nextRandomString();

        boolean checkCode = advantages.stream().anyMatch(code -> code.getCouponCode().equals(couponForCheck));

        String coupon = couponForCheck;

        while (checkCode){
            String newCouponForCheck = thirdParty.getThirdPartyName()+nextRandom(id)+nextRandomString();
            checkCode = advantages.stream().anyMatch(code -> code.getCouponCode().equals(newCouponForCheck));
            coupon = newCouponForCheck;
        }
        return coupon;
    }
    private int nextRandom(Long id){
        Random random = new Random();
        int range = Integer.MAX_VALUE-1000000;
        return Math.abs(random.nextInt(range)+id.intValue());
    }
    private String nextRandomString(){
        int length = 10;
        boolean useLetters = true;
        boolean useNumbers = false;
        return RandomStringUtils.random(length, useLetters, useNumbers);
    }
    private AdvantagesResponse getAdvantagesResponse(AdvantagesRequest request, boolean edit) {
        ThirdParty thirdParty = getThirdParty(request.getThirdPartyId());

        Optional<Advantages> advantageCheck = Optional.ofNullable(
                this.advantagesRepository.findOneByIdAdvantagesAndDeletedAtIsNull(request.getIdAdvantages())
        );

        List<AdvantagesImages> receivedImages = new LinkedList<AdvantagesImages>();
        LinkedList<String> paths = new LinkedList<String>();

        if(request.getAdvantagesImages()!= null) {

            int contLista = 0;
            for (MultipartFile actualImage :
                    request.getAdvantagesImages()) {

                String actualPath = uploadImage(actualImage);

                receivedImages.add(new AdvantagesImages(
                        0L,
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

        Advantages savedAdvantage = this.advantagesRepository.save(
                AdvantagesRequest.toAdvantages(
                        request,
                        thirdParty,
                        receivedImages,
                        edit ? this.generateCoupon(request.getThirdPartyId()) : advantageCheck.get().getCouponCode()
                )
        );


        return AdvantagesResponse.fromAdvantages(savedAdvantage, paths);
    }

    private ThirdParty getThirdParty(Long idThirdParty) {
        return thirdPartyService.getThirdPartyByIdThirdParty(idThirdParty);
    }

    @Override
    public AdvantagesResponse deleteAdvantage(Long idAdvantage) {
        Advantages advantages = this.advantagesRepository.findOneByIdAdvantagesAndDeletedAtIsNull(idAdvantage);

        advantages.setDeletedAt(new Date());
        return AdvantagesResponse.fromAdvantages(this.advantagesRepository.save(advantages),new LinkedList<String>());
    }

    @Override
    public Page<Advantages> listAdvantagesByPage(Pageable pages) {
        return this.advantagesRepository.findAllByDeletedAtIsNullOrderByIdAdvantages(pages);
    }

    @Override
    public Page<Advantages> listAdvantagesByPageAndThirdPartyId(Pageable pages, Long idThirdParty) {
        return this.advantagesRepository.findAllByThirdPartyAndDeletedAtIsNullOrderByIdAdvantages(pages,getThirdParty(idThirdParty));
    }
    @Override
    public Advantages getAdvantageById(Long idAdvantage) {
        return this.advantagesRepository.findOneByIdAdvantagesAndDeletedAtIsNull(idAdvantage);
    }

    @Override
    public Page<Advantages> listAdvantagesByPageAndCategory(Pageable pages, String category) {
        return this.advantagesRepository.findAllByAdvantageCategoryAndDeletedAtIsNullOrderByIdAdvantages(pages,category);
    }

    @Override
    public Page<Advantages> listAdvantagesByPageAndName(Pageable pages, String advantageName) {
        return this.advantagesRepository.findAllByAdvantageNameAndDeletedAtIsNullOrderByIdAdvantages(pages,advantageName);
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

    @Override
    public List<String> getAllCategories() {

        List<Advantages> allAdvantages = this.advantagesRepository.findAllByDeletedAtIsNullOrderByIdAdvantagesAsc();
        List<String> categories = new LinkedList<String>();

        allAdvantages.stream().forEach(category -> categories.add(category.getAdvantageCategory()));

        return categories;
    }
}
