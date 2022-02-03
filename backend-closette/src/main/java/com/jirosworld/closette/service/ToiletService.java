package com.jirosworld.closette.service;

import com.jirosworld.closette.exception.BadRequestException;
import com.jirosworld.closette.exception.RecordNotFoundException;
import com.jirosworld.closette.dto.ToiletRequestDto;
import com.jirosworld.closette.model.Photo;
import com.jirosworld.closette.model.Rating;
import com.jirosworld.closette.model.Toilet;
import com.jirosworld.closette.repository.PhotoRepository;
import com.jirosworld.closette.repository.RatingRepository;
import com.jirosworld.closette.repository.ToiletRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ToiletService {

    @Autowired
    private ToiletRepository toiletRepository;

    @Autowired
    private PhotoRepository photoRepository;

    @Autowired
    private RatingRepository ratingRepository;

    //    find all
    public List<Toilet> getToilets() {
        return toiletRepository.findAll();
    }

    // find all with queries
    public Iterable<Toilet> findAllToiletsQuery(String title, String city, String country) {
        if (!title.isEmpty() && city.isEmpty() && country.isEmpty()) {
            return toiletRepository.findAllByTitleContainingIgnoreCase(title);
        } else if (title.isEmpty() && !city.isEmpty() && country.isEmpty()) {
            return toiletRepository.findAllByCityContainingIgnoreCase(city);
        } else if (title.isEmpty() && city.isEmpty() && !country.isEmpty()) {
            return toiletRepository.findAllByCountryContainingIgnoreCase(country);
        } else if (!title.isEmpty() && !city.isEmpty() && !country.isEmpty()) {
            return toiletRepository.findAllByTitleAndCityAndCountry(title, city, country);
        } else {
            return toiletRepository.findAll();
        }
    }


    public List<Toilet> getToiletsByTitle(String title) {
        return toiletRepository.findAllByTitleContainingIgnoreCase(title);
    }

    public List<Toilet> getToiletsByCity(String city) {
        return toiletRepository.findAllByCityContainingIgnoreCase(city);
    }

    public List<Toilet> getToiletsByCountry(String country) {
        return toiletRepository.findAllByCountryContainingIgnoreCase(country);
    }

    public List<Toilet> getToiletsByGenderneutral(Boolean genderneutral) {
        return toiletRepository.findAllByGenderneutral(genderneutral);
    }

    public Toilet getToiletByTitle(String title) {
        return toiletRepository.findByTitle(title);
    }

//    schets voor zoek queries in query pad
//    List<Toilet> findAllByFree(Boolean free);
//    List<Toilet> findAllByAccessible(Boolean accessible);
//    List<Toilet> findAllByCleanliness(Boolean cleanliness);
//    List<Toilet> findAllByHasPhoto(Boolean hasPhoto);



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

        // staat uit tijdens testdoeleinden, wél functioneel in real life:
        String title = toiletRequestDto.getTitle();
        List<Toilet> toilets = toiletRepository.findAllByTitle(title);
        if (toilets.size() > 0) {
            throw new BadRequestException("This exact title already exists! Please add a unique detailed name");
        }
        String latitudeDuplicate = toiletRequestDto.getLatitude();
        List<Toilet> latitudes = toiletRepository.findAllByLatitude(latitudeDuplicate);
        if (latitudes.size() > 0) {
            throw new BadRequestException("This location already exists! Please add exact and detailed GPS coordinates, with a dot.");
        }

        Toilet toilet = new Toilet();

        toilet.setTitle(toiletRequestDto.getTitle());
        toilet.setCity(toiletRequestDto.getCity());
        toilet.setCountry(toiletRequestDto.getCountry());
        toilet.setAddress(toiletRequestDto.getAddress());
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
            throw new RecordNotFoundException("ID does not exist!");
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
            if (toilet.getCountry() != null && !toilet.getCountry().isEmpty()) {
                storedToilet.setCountry(toilet.getCountry());
            }
            if (toilet.getLatitude() != null && !toilet.getLatitude().isEmpty()) {
                storedToilet.setLatitude(toilet.getLatitude());
            }
            if (toilet.getLongitude() != null && !toilet.getLongitude().isEmpty()) {
                storedToilet.setLongitude(toilet.getLongitude());
            }
            if (toilet.getAddress() != null && !toilet.getAddress().isEmpty()) {
                storedToilet.setAddress(toilet.getAddress());
            }
            if (toilet.getCleanliness() != null && !toilet.getCleanliness().isEmpty()) {
                storedToilet.setCleanliness(toilet.getCleanliness());
            }
            if (toilet.getInfoText() != null && !toilet.getInfoText().isEmpty()) {
                storedToilet.setInfoText(toilet.getInfoText());
            }
            if (toilet.getOpeningHours() != null && !toilet.getOpeningHours().isEmpty()) {
                storedToilet.setOpeningHours(toilet.getOpeningHours());
            }
            if (toilet.isGenderneutral()) {
                storedToilet.setGenderneutral(toilet.isGenderneutral());
            }
            if (toilet.isAccessible()) {
                storedToilet.setAccessible(toilet.isAccessible());
            }
            if (toilet.isFree()) {
                storedToilet.setFree(toilet.isFree());
            }
            if (toilet.isHasPhoto()) {
                storedToilet.setHasPhoto(toilet.isHasPhoto());
            }
            toiletRepository.save(storedToilet);

        } else {
            throw new RecordNotFoundException("ID does not exist!");
        }
    }


    // (patch via DTO)
    public void partialUpdateToiletDto(int id, ToiletRequestDto toiletRequestDto) {
        Optional<Toilet> optionalToilet = toiletRepository.findById(id);

        if (optionalToilet.isPresent()) {
            Toilet storedToilet = toiletRepository.findById(id).orElse(null);

            if (toiletRequestDto.getTitle() != null && !toiletRequestDto.getTitle().isEmpty()) {
                storedToilet.setTitle(toiletRequestDto.getTitle());
            }
            if (toiletRequestDto.getCity() != null && !toiletRequestDto.getCity().isEmpty()) {
                storedToilet.setCity(toiletRequestDto.getCity());
            }
            if (toiletRequestDto.getCountry() != null && !toiletRequestDto.getCountry().isEmpty()) {
                storedToilet.setCountry(toiletRequestDto.getCountry());
            }
            if (toiletRequestDto.getLatitude() != null && !toiletRequestDto.getLatitude().isEmpty()) {
                storedToilet.setLatitude(toiletRequestDto.getLatitude());
            }
            if (toiletRequestDto.getLongitude() != null && !toiletRequestDto.getLongitude().isEmpty()) {
                storedToilet.setLongitude(toiletRequestDto.getLongitude());
            }
            if (toiletRequestDto.getAddress() != null && !toiletRequestDto.getAddress().isEmpty()) {
                storedToilet.setAddress(toiletRequestDto.getAddress());
            }
            if (toiletRequestDto.getCleanliness() != null && !toiletRequestDto.getCleanliness().isEmpty()) {
                storedToilet.setCleanliness(toiletRequestDto.getCleanliness());
            }
            if (toiletRequestDto.getInfoText() != null && !toiletRequestDto.getInfoText().isEmpty()) {
                storedToilet.setInfoText(toiletRequestDto.getInfoText());
            }
            if (toiletRequestDto.getOpeningHours() != null && !toiletRequestDto.getOpeningHours().isEmpty()) {
                storedToilet.setOpeningHours(toiletRequestDto.getOpeningHours());
            }
            if (toiletRequestDto.isGenderneutral()) {
                storedToilet.setGenderneutral(toiletRequestDto.isGenderneutral());
            }
            if (toiletRequestDto.isAccessible()) {
                storedToilet.setAccessible(toiletRequestDto.isAccessible());
            }
            if (toiletRequestDto.isFree()) {
                storedToilet.setFree(toiletRequestDto.isFree());
            }
            if (toiletRequestDto.isHasPhoto()) {
                storedToilet.setHasPhoto(toiletRequestDto.isHasPhoto());
            }
            toiletRepository.save(storedToilet);

        } else {
            throw new RecordNotFoundException("ID does not exist!");
        }
    }

    // relation tables
    public Photo getToiletPhoto(int id) {
        Optional<Toilet> optionalToilet = toiletRepository.findById(id);

        if (optionalToilet.isPresent()) {
            Toilet toilet = optionalToilet.get();
            return toilet.getPhoto();
        } else {
            throw new RecordNotFoundException("ID does not exist!");
        }
    }

    public void addToiletPhoto(int id, Photo photo) {
        Optional<Toilet> optionalToilet = toiletRepository.findById(id);

        if (optionalToilet.isPresent()) {
            Toilet toilet = optionalToilet.get();
            Photo newphoto = toilet.getPhoto();

            photoRepository.save(photo);

            newphoto.setToilets(newphoto.getToilets());
            toiletRepository.save(toilet);
        } else {
            throw new RecordNotFoundException("ID does not exist!");
        }
    }

    public Rating getToiletRatings(int id) {
        Optional<Toilet> optionalToilet = toiletRepository.findById(id);

        if (optionalToilet.isPresent()) {
            Toilet toilet = optionalToilet.get();
            return (Rating) toilet.getRatings();
        } else {
            throw new RecordNotFoundException("ID does not exist!");
        }
    }

    public void addToiletRating(int id, Rating rating) {
        Optional<Toilet> optionalToilet = toiletRepository.findById(id);

        if (optionalToilet.isPresent()) {
            Toilet toilet = optionalToilet.get();
            Rating newrating = (Rating) toilet.getRatings();

            ratingRepository.save(rating);

            newrating.setRating(newrating.getRating());
            toiletRepository.save(toilet);
        } else {
            throw new RecordNotFoundException("ID does not exist!");
        }
    }

}
