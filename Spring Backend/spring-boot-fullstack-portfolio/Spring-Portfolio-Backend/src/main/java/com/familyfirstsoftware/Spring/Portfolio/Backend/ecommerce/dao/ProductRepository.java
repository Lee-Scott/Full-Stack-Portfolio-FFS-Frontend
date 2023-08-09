package com.familyfirstsoftware.Spring.Portfolio.Backend.ecommerce.dao;

import com.familyfirstsoftware.Spring.Portfolio.Backend.ecommerce.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200/")
@Repository                                         // entity type, primary key type
public interface ProductRepository extends JpaRepository<Product, Long> {

}