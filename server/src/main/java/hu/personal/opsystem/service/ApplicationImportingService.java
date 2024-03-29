package hu.personal.opsystem.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import hu.personal.opsystem.entity.Application;
import hu.personal.opsystem.mapper.ApplicationMapper;
import hu.personal.opsystem.model.ApplicationDto;
import hu.personal.opsystem.repository.ApplicationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.jdbc.datasource.DataSourceUtils;
import org.springframework.jdbc.datasource.init.ScriptUtils;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;

import javax.sql.DataSource;
import java.io.*;
import java.sql.Connection;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ApplicationImportingService {

    private final ApplicationRepository applicationRepository;

    private final ApplicationMapper applicationMapper;

    private final DataSource dataSource;

    @Value("classpath:sample_data.sql")
    Resource sqlResource;

    @Value("classpath:sample_data.json")
    Resource jsonResource;

    public List<ApplicationDto> populateDbWithJson() {
        List<Application> applications;
        String jsonString;
        try (Reader reader = new InputStreamReader(jsonResource.getInputStream())) {
            jsonString = FileCopyUtils.copyToString(reader);
            applications = Arrays.asList(new ObjectMapper().readValue(jsonString, Application[].class));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return applicationRepository.saveAll(applications).stream()
                .map(applicationMapper::toDto)
                .collect(Collectors.toList());
    }

    public void populateDbWithSql() {
        Connection connection = DataSourceUtils.getConnection(dataSource);
        ScriptUtils.executeSqlScript(connection, sqlResource);
    }
}
