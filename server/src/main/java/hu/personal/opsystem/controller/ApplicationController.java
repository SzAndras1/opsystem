package hu.personal.opsystem.controller;

import hu.personal.opsystem.ApplicationApi;
import hu.personal.opsystem.model.ApplicationDto;
import hu.personal.opsystem.service.ApplicationImportingService;
import hu.personal.opsystem.service.ApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@RestController
public class ApplicationController implements ApplicationApi {
    public static final String APPLICATION_API_PATH = "api/v1/application";

    private final ApplicationService applicationService;

    private final ApplicationImportingService applicationImportingService;

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

    @Override
    public ResponseEntity<ApplicationDto> getApplication(UUID appId) {
        return ResponseEntity.ok(applicationService.getApplication(appId));
    }

    @Override
    public ResponseEntity<ApplicationDto> updateApplication(ApplicationDto applicationDto) {
        return ResponseEntity.ok(applicationService.updateApplication(applicationDto));
    }

    @Override
    public ResponseEntity<List<ApplicationDto>> populateDatabaseFromJson() {
        return ResponseEntity.ok(applicationImportingService.populateDbWithJson());
    }

    @Override
    public ResponseEntity<String> populateDatabaseFromSql() {
        applicationImportingService.populateDbWithSql();
        return ResponseEntity.ok("Successfully uploaded 4 applications to the Database!");
    }
}
