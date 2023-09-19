package com.homiecomb.demo.service;

import com.homiecomb.demo.model.Property;
import com.homiecomb.demo.repository.PropertyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * ClassName: TaskService
 * Package: com.example.demo.service
 * Description:
 *
 * @Author Wai Yan(Raymond) Ng
 * @Create 2023-09-15 19:07
 * @Version 1.0
 */

@Service
public class PropertyService {
    @Autowired
    private final PropertyRepository propertyRepository;

    public PropertyService(PropertyRepository propertyRepository) {
        this.propertyRepository = propertyRepository;
    }

    // get all tasks
    public List<Property> getAllProperties(){
        return propertyRepository.findAll();
    }

    // create task
    public Property createProperty(Property property){
        return propertyRepository.save(property);
    }

    // update a task
    public Property updateProperty(Long id, Property property){
        if (propertyRepository.existsById(id)){
            property.setId(id);
            return propertyRepository.save(property);
        }
        return null;
    }

    // delete a task
    public void deleteProperty(Long id){
        propertyRepository.deleteById(id);
    }

}
