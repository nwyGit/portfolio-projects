package com.homiecomb.demo.controller;

import com.homiecomb.demo.model.Property;
import com.homiecomb.demo.service.PropertyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * ClassName: TaskController
 * Package: com.example.demo.controller
 * Description:
 *
 * @Author Wai Yan(Raymond) Ng
 * @Create 2023-09-15 19:07
 * @Version 1.0
 */

@RestController
public class PropertyController {
    @Autowired
    private final PropertyService propertyService;

    public PropertyController(PropertyService propertyService) {
        this.propertyService = propertyService;
    }

    @GetMapping
    public List<Property> getAllProperties(){
        return propertyService.getAllProperties();
    }

    @PostMapping
    public Property createProperty(@RequestBody Property property){
        return propertyService.createProperty(property);
    }

    @PutMapping("/{id}")
    public Property updateProperty(@PathVariable Long id, @RequestBody Property property){
        return propertyService.updateProperty(id, property);
    }

    @DeleteMapping("/{id}")
    public void deleteProperty(@PathVariable Long id){
        propertyService.deleteProperty(id);
    }
}
