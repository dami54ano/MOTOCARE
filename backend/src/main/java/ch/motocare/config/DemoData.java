package ch.motocare.config;
import ch.motocare.domain.*;import ch.motocare.repo.*;import java.math.BigDecimal;
import org.springframework.context.annotation.*;import org.springframework.boot.CommandLineRunner;
@Configuration public class DemoData {
 @Bean CommandLineRunner seed(MotorcycleRepository motorcycles,BoxRepository boxes){return args->{
 if(motorcycles.count()==0){motorcycles.save(new Motorcycle("Husqvarna","FE 450",2026));motorcycles.save(new Motorcycle("KTM","690 SMC R",2024));motorcycles.save(new Motorcycle("Yamaha","MT-07",2025));motorcycles.save(new Motorcycle("BMW","S 1000 RR",2025));motorcycles.save(new Motorcycle("Honda","CB650R",2024));motorcycles.save(new Motorcycle("Kawasaki","Z900",2025));}
 if(boxes.count()==0){boxes.save(new Box("WASH","THE WASH KIT","WASH","Der perfekte Reset.",new BigDecimal("29.90"),"Monatlich","01 / CLEAN","lime","BESTSELLER","Alles für den sauberen Ride. Universelle Pflegeprodukte für den regelmässigen Einsatz."));boxes.save(new Box("SERVICE","THE SERVICE KIT","SERVICE","Für den nächsten Service.",new BigDecimal("59.90"),"Nach Bedarf","02 / MAINTAIN","sand","BIKE-SPECIFIC","Technische Teile werden nur nach bestätigter Hersteller-Kompatibilität angeboten."));boxes.save(new Box("WINTER","THE WINTER KIT","WINTER","Bereit für die Pause.",new BigDecimal("39.90"),"Saisonal","03 / PROTECT","steel","SEASONAL","Schutz und Vorbereitung für die Standzeit deiner Maschine."));boxes.save(new Box("MYSTERY","THE MYSTERY KIT","MYSTERY","Jedes Mal etwas Neues.",new BigDecimal("24.90"),"Monatlich","04 / DISCOVER","charcoal","LIMITED","Nur universelle, nicht sicherheitskritische Artikel. Keine zufälligen Öle oder Filter."));}
 }; }
}
