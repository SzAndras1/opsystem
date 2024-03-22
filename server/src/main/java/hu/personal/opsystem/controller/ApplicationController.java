package hu.personal.opsystem.controller;

import hu.personal.opsystem.ApplicationApi;
import hu.personal.opsystem.model.ApplicationDto;
import hu.personal.opsystem.service.ApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class ApplicationController implements ApplicationApi {
    private final ApplicationService applicationService;

    @Override
    public ResponseEntity<ApplicationDto> createApplication(ApplicationDto applicationDto) {
        return ResponseEntity.ok(applicationService.createApp(applicationDto));
    }

    @Override
    public ResponseEntity<List<ApplicationDto>> getAllApplication() {
        return ResponseEntity.ok(applicationService.getAll());
    }
}
