package ch.motocare.domain;
import jakarta.persistence.*;import java.math.BigDecimal;
@Entity @Table(name="care_box") public class Box {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) public Long id;
 @Column(nullable=false,unique=true) public String code;
 @Column(nullable=false) public String name;
 @Column(nullable=false) public String type;
 public String subtitle;
 public String eyebrow;
 public String accent;
 public String tag;
 @Column(nullable=false,precision=8,scale=2) public BigDecimal price;
 @Column(name="delivery_interval") public String interval;
 @Column(length=1000) public String details;
 public Box(){}
 public Box(String code,String name,String type,String subtitle,BigDecimal price,String interval,String eyebrow,String accent,String tag,String details){this.code=code;this.name=name;this.type=type;this.subtitle=subtitle;this.price=price;this.interval=interval;this.eyebrow=eyebrow;this.accent=accent;this.tag=tag;this.details=details;}
 @Transient public String[] getItems(){return switch(type){case "WASH"->new String[]{"Motorradreiniger","Mikrofasertücher","Detailbürste","Kettenreiniger"};case "SERVICE"->new String[]{"Passendes Motoröl*","Passender Ölfilter*","Dichtring*","Service-Checkliste"};case "WINTER"->new String[]{"Konservierungsspray","Batteriepflege-Guide","Abdeck-Zubehör","Winter-Checkliste"};default->new String[]{"Pflege-Accessoires","Kleine Tools","Lifestyle-Extras","Überraschungsprodukt"};};}
}

