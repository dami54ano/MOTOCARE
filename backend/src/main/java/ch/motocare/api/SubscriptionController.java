package ch.motocare.api;
import ch.motocare.domain.*;import ch.motocare.repo.*;import jakarta.validation.Valid;import jakarta.validation.constraints.*;
import org.springframework.web.bind.annotation.*;import org.springframework.http.*;import java.util.*;
@RestController @RequestMapping("/api/subscriptions") public class SubscriptionController {
 private final SubscriptionRepository subscriptions;private final MotorcycleRepository motorcycles;private final BoxRepository boxes;
 public SubscriptionController(SubscriptionRepository subscriptions,MotorcycleRepository motorcycles,BoxRepository boxes){this.subscriptions=subscriptions;this.motorcycles=motorcycles;this.boxes=boxes;}
 public record NewSubscription(@NotBlank @Email String email,@NotNull Long motorcycleId,@NotNull Long boxId,@NotNull Subscription.Interval interval){}
 public record UpdateSubscription(@NotNull Subscription.Status status){}
 public record SubscriptionView(Long id,String email,String motorcycleName,String boxName,String interval,String status,String createdAt){}
 private SubscriptionView view(Subscription s){return new SubscriptionView(s.id,s.email,s.motorcycle.brand+" "+s.motorcycle.model+" ("+s.motorcycle.year+")",s.box.name,s.interval.name(),s.status.name(),s.createdAt.toString());}
 @GetMapping public List<SubscriptionView> list(@RequestParam @Email String email){return subscriptions.findByEmailIgnoreCaseOrderByCreatedAtDesc(email).stream().map(this::view).toList();}
 @GetMapping("/{id}") public SubscriptionView one(@PathVariable Long id){return view(find(id));}
 @PostMapping @ResponseStatus(HttpStatus.CREATED) public SubscriptionView create(@Valid @RequestBody NewSubscription req){
   Motorcycle motorcycle=motorcycles.findById(req.motorcycleId()).orElseThrow(()->new ApiException(HttpStatus.NOT_FOUND,"Motorrad nicht gefunden."));
   Box box=boxes.findById(req.boxId()).orElseThrow(()->new ApiException(HttpStatus.NOT_FOUND,"Box nicht gefunden."));
   if("SERVICE".equals(box.type))throw new ApiException(HttpStatus.CONFLICT,"Service-Box gesperrt: Öl- und Filterkompatibilität ist nicht verifiziert.");
   return view(subscriptions.save(new Subscription(req.email().trim().toLowerCase(Locale.ROOT),motorcycle,box,req.interval())));
 }
 @PutMapping("/{id}") public SubscriptionView update(@PathVariable Long id,@Valid @RequestBody UpdateSubscription req){Subscription s=find(id);s.status=req.status();return view(subscriptions.save(s));}
 @DeleteMapping("/{id}") @ResponseStatus(HttpStatus.NO_CONTENT) public void delete(@PathVariable Long id){Subscription s=find(id);subscriptions.delete(s);}
 private Subscription find(Long id){return subscriptions.findById(id).orElseThrow(()->new ApiException(HttpStatus.NOT_FOUND,"Abo nicht gefunden."));}
}
