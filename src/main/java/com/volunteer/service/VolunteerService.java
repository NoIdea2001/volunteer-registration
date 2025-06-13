package com.volunteer.service;

import com.volunteer.model.Volunteer;
import com.volunteer.repository.VolunteerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VolunteerService {

    @Autowired
    private VolunteerRepository volunteerRepository;

    public List<Volunteer> getAllVolunteers() {
        return volunteerRepository.findAll();
    }

    public Optional<Volunteer> getVolunteerById(Long id) {
        return volunteerRepository.findById(id);
    }

    public Volunteer createVolunteer(Volunteer volunteer) {
        return volunteerRepository.save(volunteer);
    }

    public Optional<Volunteer> updateVolunteer(Long id, Volunteer volunteerDetails) {
        Optional<Volunteer> volunteer = volunteerRepository.findById(id);
        if (volunteer.isPresent()) {
            Volunteer existingVolunteer = volunteer.get();
            existingVolunteer.setName(volunteerDetails.getName());
            existingVolunteer.setEmail(volunteerDetails.getEmail());
            existingVolunteer.setAvailability(volunteerDetails.getAvailability());
            return Optional.of(volunteerRepository.save(existingVolunteer));
        }
        return Optional.empty();
    }

    public boolean deleteVolunteer(Long id) {
        if (volunteerRepository.existsById(id)) {
            volunteerRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
