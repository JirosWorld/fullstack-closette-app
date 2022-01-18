package nl.novi.closette.service;

import nl.novi.closette.dto.ToiletRequestDto;
import nl.novi.closette.exception.BadRequestException;
import nl.novi.closette.exception.RecordNotFoundException;
import nl.novi.closette.model.Toilet;
import nl.novi.closette.repository.ToiletRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ToiletService {

    @Autowired
    private ToiletRepository toiletRepository;

    //    find all
    public List<Toilet> getToilets() {
        return toiletRepository.findAll();
    }

    public List<Toilet> getToiletsByTitle(String title) {
        return toiletRepository.findAllByTitleContainingIgnoreCase(title);
    }

    public List<Toilet> getToiletsByCity(String city) {
        return toiletRepository.findAllByCityContainingIgnoreCase(city);
    }

    public List<Toilet> getToiletsByCountry(String country){
        return toiletRepository.findAllByCountryContainingIgnoreCase(country);
    }

//    schets voor zoek queries in query pad
//    List<Toilet> findAllByGenderneutral(Boolean genderneutral);
//    List<Toilet> findAllByFree(Boolean free);
//    List<Toilet> findAllByAccessible(Boolean accessible);
//    List<Toilet> findAllByCleanliness(Boolean cleanliness);
//    List<Toilet> findAllByHasPhoto(Boolean hasPhoto);
    public List<Toilet> getToiletsByGenderneutral(Boolean genderneutral){
        return toiletRepository.findAllByGenderneutral(genderneutral);
    }

    public Toilet getToilet(int id) {
        Optional<Toilet> optionalToilet = toiletRepository.findById(id);

        if (optionalToilet.isPresent()) {
            return optionalToilet.get();
        } else {
            throw new RecordNotFoundException("ID does not exist!");
        }
    }

    public void deleteToilet(int id) {
        if (toiletRepository.existsById(id)) {
            toiletRepository.deleteById(id);
        } else {
            throw new RecordNotFoundException("ID does not exist!");
        }
    }

    public int addToilet(ToiletRequestDto toiletRequestDto) {

        // uitgezet voor testdoeleinden, wél functioneel in real life:
//        String title = toiletRequestDto.getTitle();
//        List<Toilet> toilets = toiletRepository.findAllByTitle(title);
//        if (toilets.size() > 0) {
//            throw new BadRequestException("this exact title already exists! Please add detailed name");
//        }
//        String latitudeDuplicate = toiletRequestDto.getLatitude();
//        List<Toilet> latitudes = toiletRepository.findAllByLatitude(latitudeDuplicate);
//        if (latitudes.size() > 0) {
//            throw new BadRequestException("this exact location already exists! Please add detailed GPS coordinates, with a dot.");
//        }

        Toilet toilet = new Toilet();
        toilet.setTitle(toiletRequestDto.getTitle());
        toilet.setLatitude(toiletRequestDto.getLatitude());
        toilet.setLongitude(toiletRequestDto.getLongitude());
        toilet.setPostTime(toiletRequestDto.getPostTime());
        toilet.setGenderneutral(toiletRequestDto.isGenderneutral());
        toilet.setFree(toiletRequestDto.isFree());
        toilet.setAccessible(toiletRequestDto.isAccessible());
        toilet.setCleanliness(toiletRequestDto.getCleanliness());
        toilet.setHasPhoto(toiletRequestDto.isHasPhoto());
        toilet.setOpeningHours(toiletRequestDto.getOpeningHours());
        toilet.setInfoText(toiletRequestDto.getInfoText());
        toilet.setRatingAverage(toiletRequestDto.getRatingAverage());
        toilet.setCity(toiletRequestDto.getCity());
        toilet.setCountry(toiletRequestDto.getCountry());
        toilet.setAddress(toiletRequestDto.getAddress());

        Toilet newToilet = toiletRepository.save(toilet);
        return newToilet.getId();
    }

    public void updateToilet(int id, Toilet toilet) {
        Optional<Toilet> optionalToilet = toiletRepository.findById(id);

        if (optionalToilet.isPresent()) {
            Toilet storedToilet = optionalToilet.get();

            toilet.setId(storedToilet.getId());
            toiletRepository.save(toilet);
        } else {
            throw new RecordNotFoundException("ID does not exist!!!");
        }
    }

    public void partialUpdateToilet(int id, Toilet toilet) {
        Optional<Toilet> optionalToilet = toiletRepository.findById(id);

        if (optionalToilet.isPresent()) {
            Toilet storedToilet = toiletRepository.findById(id).orElse(null);

            if (toilet.getTitle() != null && !toilet.getTitle().isEmpty()) {
                storedToilet.setTitle(toilet.getTitle());
            }
            if (toilet.getCity() != null && !toilet.getCity().isEmpty()) {
                storedToilet.setCity(toilet.getCity());
            }
            if (toilet.getLatitude() != null && !toilet.getLatitude().isEmpty()) {
                storedToilet.setLatitude(toilet.getLatitude());
            }
            if (toilet.getLongitude() != null && !toilet.getLongitude().isEmpty()) {
                storedToilet.setLongitude(toilet.getLongitude());
            }
            toiletRepository.save(storedToilet);

        } else {
            throw new RecordNotFoundException("ID does not exist!!!");
        }
    }

}
