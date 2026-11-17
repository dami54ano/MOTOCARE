package ch.motocare.domain;
import jakarta.persistence.*;import java.time.Instant;
@Entity public class Subscription {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) public Long id;
 @Column(nullable=false) public String email;
 @ManyToOne(optional=false) public Motorcycle motorcycle;
 @ManyToOne(optional=false) public Box box;
 @Enumerated(EnumType.STRING) @Column(name="delivery_interval",nullable=false) public Interval interval;
 @Enumerated(EnumType.STRING) @Column(nullable=false) public Status status=Status.ACTIVE;
 @Column(nullable=false) public Instant createdAt=Instant.now();
 public Subscription(){} public Subscription(String email, Motorcycle motorcycle,Box box,Interval interval){this.email=email;this.motorcycle=motorcycle;this.box=box;this.interval=interval;}
 public enum Interval {MONTHLY,QUARTERLY,ON_DEMAND} public enum Status {ACTIVE,PAUSED}
}

