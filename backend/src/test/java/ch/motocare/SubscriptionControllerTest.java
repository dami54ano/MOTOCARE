package ch.motocare;
import org.junit.jupiter.api.Test;import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.web.server.LocalServerPort;import org.springframework.http.*;
import java.util.*;import static org.assertj.core.api.Assertions.assertThat;
@SpringBootTest(webEnvironment=SpringBootTest.WebEnvironment.RANDOM_PORT,properties={"spring.datasource.url=jdbc:h2:mem:motocaretest;DB_CLOSE_DELAY=-1","spring.jpa.hibernate.ddl-auto=create-drop"})
class SubscriptionControllerTest {
 @Autowired TestRestTemplate rest;@LocalServerPort int port;
 String url(String path){return "http://localhost:"+port+"/api"+path;}
 @Test void catalogIsSeeded(){var r=rest.getForEntity(url("/boxes"),Object[].class);assertThat(r.getStatusCode()).isEqualTo(HttpStatus.OK);assertThat(r.getBody()).hasSize(4);}
 @Test void createPauseResumeAndDelete(){Map<String,Object> req=Map.of("email","test@motocare.ch","motorcycleId",1,"boxId",1,"interval","MONTHLY");var cr=rest.postForEntity(url("/subscriptions"),req,Map.class);assertThat(cr.getStatusCode()).isEqualTo(HttpStatus.CREATED);String id=cr.getBody().get("id").toString();assertThat(cr.getBody().get("status")).isEqualTo("ACTIVE");rest.put(url("/subscriptions/"+id),Map.of("status","PAUSED"));assertThat(rest.getForObject(url("/subscriptions/"+id),Map.class).get("status")).isEqualTo("PAUSED");rest.put(url("/subscriptions/"+id),Map.of("status","ACTIVE"));assertThat(rest.getForObject(url("/subscriptions/"+id),Map.class).get("status")).isEqualTo("ACTIVE");rest.delete(url("/subscriptions/"+id));assertThat(rest.getForEntity(url("/subscriptions/"+id),Map.class).getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);}
 @Test void serviceKitCannotBeOrderedWithoutManufacturerValidation(){var req=Map.of("email","demo@motocare.ch","motorcycleId",1,"boxId",2,"interval","ON_DEMAND");var res=rest.postForEntity(url("/subscriptions"),req,Map.class);assertThat(res.getStatusCode()).isEqualTo(HttpStatus.CONFLICT);}
 @Test void invalidInputIsRejected(){var req=Map.of("email","not-an-email","motorcycleId",1,"boxId",1,"interval","MONTHLY");var res=rest.postForEntity(url("/subscriptions"),req,Map.class);assertThat(res.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);}
}
