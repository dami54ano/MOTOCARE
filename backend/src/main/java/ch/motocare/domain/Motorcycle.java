package ch.motocare.domain;
import jakarta.persistence.*;
@Entity public class Motorcycle {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) public Long id;
 @Column(nullable=false) public String brand;
 @Column(nullable=false) public String model;
 @Column(name="model_year",nullable=false) public Integer year;
 public Motorcycle(){} public Motorcycle(String brand,String model,Integer year){this.brand=brand;this.model=model;this.year=year;}
}

