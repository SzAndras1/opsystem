package hu.personal.opsystem.service;

import hu.personal.opsystem.entity.Application;
import hu.personal.opsystem.mapper.ApplicationMapper;
import hu.personal.opsystem.model.ApplicationDto;
import hu.personal.opsystem.repository.ApplicationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ApplicationService {
    private final ApplicationRepository applicationRepository;

    private final ApplicationMapper applicationMapper;

    public List<ApplicationDto> getAll() {
        return applicationRepository.findAll().stream()
                .map(applicationMapper::toDto)
                .collect(Collectors.toList());
    }


    public ApplicationDto createApp(ApplicationDto applicationDto) {
        Application savedApplication = applicationMapper.toEntity(applicationDto);
        return applicationMapper.toDto(applicationRepository.save(savedApplication));
    }
}
