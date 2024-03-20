package hu.personal.opsystem.mapper;

import hu.personal.opsystem.entity.User;
import hu.personal.opsystem.model.UserDto;
import org.mapstruct.Mapper;
import org.springframework.core.convert.converter.Converter;

@Mapper(componentModel = "spring")
public interface UserMapper extends Converter<User, UserDto> {
    User toEntity(UserDto userDto);
    UserDto toDto(User user);
}
