package ch.motocare.api;
import ch.motocare.repo.*;import ch.motocare.domain.*;import java.util.List;
import org.springframework.web.bind.annotation.*;
@RestController @RequestMapping("/api") public class CatalogController {
 private final MotorcycleRepository motorcycles;private final BoxRepository boxes;
 public CatalogController(MotorcycleRepository motorcycles,BoxRepository boxes){this.motorcycles=motorcycles;this.boxes=boxes;}
 @GetMapping("/motorcycles") public List<Motorcycle> motorcycles(){return motorcycles.findAll();}
 @GetMapping("/boxes") public List<Box> boxes(){return boxes.findAll();}
}
