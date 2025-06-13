package com.volunteer.controller;

import com.volunteer.model.Volunteer;
import com.volunteer.service.VolunteerService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/volunteers")
public class VolunteerController {

    @Autowired
    private VolunteerService volunteerService;

    @GetMapping
    public List<Volunteer> getAllVolunteers() {
        return volunteerService.getAllVolunteers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Volunteer> getVolunteerById(@PathVariable Long id) {
        return volunteerService.getVolunteerById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Volunteer createVolunteer(@Valid @RequestBody Volunteer volunteer) {
        return volunteerService.createVolunteer(volunteer);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Volunteer> updateVolunteer(@PathVariable Long id, @Valid @RequestBody Volunteer volunteer) {
        return volunteerService.updateVolunteer(id, volunteer)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVolunteer(@PathVariable Long id) {
        return volunteerService.deleteVolunteer(id)
                ? ResponseEntity.ok().build()
                : ResponseEntity.notFound().build();
    }
}
