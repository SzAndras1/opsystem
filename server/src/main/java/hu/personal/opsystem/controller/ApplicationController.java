package hu.personal.opsystem.controller;

import hu.personal.opsystem.ApplicationApi;
import hu.personal.opsystem.model.ApplicationDto;
import hu.personal.opsystem.service.ApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RequiredArgsConstructor
@RestController
public class ApplicationController implements ApplicationApi {
    public static final String APPLICATION_API_PATH = "api/v1/application";

    private final ApplicationService applicationService;

    @Override
    public ResponseEntity<ApplicationDto> createApplication(ApplicationDto applicationDto) {
        ApplicationDto savedApplcation = applicationService.createApp(applicationDto);

        URI location = ServletUriComponentsBuilder
                .fromPath(APPLICATION_API_PATH)
                .path("/{id}")
                .buildAndExpand(savedApplcation.getId())
                .toUri();

        return ResponseEntity.created(location).body(savedApplcation);
    }

    @Override
    public ResponseEntity<List<ApplicationDto>> getAllApplication() {
        return ResponseEntity.ok(applicationService.getAll());
    }
}
