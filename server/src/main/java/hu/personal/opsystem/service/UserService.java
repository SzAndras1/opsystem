package hu.personal.opsystem.service;

import hu.personal.opsystem.entity.User;
import hu.personal.opsystem.mapper.UserMapper;
import hu.personal.opsystem.model.UserDto;
import hu.personal.opsystem.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;

    private final UserMapper userMapper;

    public UserDto createUser(UserDto userDto) {
        userDto.setRole(UserDto.RoleEnum.PARENT);
        User savedUser = userMapper.toEntity(userDto);
        return userMapper.toDto(userRepository.save(savedUser));
    }
}
