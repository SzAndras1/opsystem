package hu.personal.opsystem.mapper;

import hu.personal.opsystem.entity.Application;
import hu.personal.opsystem.model.ApplicationDto;
import org.mapstruct.Mapper;
import org.springframework.core.convert.converter.Converter;

@Mapper(componentModel = "spring")
public interface ApplicationMapper extends Converter<Application, ApplicationDto> {
    Application toEntity(ApplicationDto applicationDto);

    ApplicationDto toDto(Application application);
}
