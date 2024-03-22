package hu.personal.opsystem.service;

import hu.personal.opsystem.entity.User;
import hu.personal.opsystem.mapper.UserMapper;
import hu.personal.opsystem.model.UserDto;
import hu.personal.opsystem.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

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

    public void example(String username, String password) {
        System.out.println(username + " " + password);
    }

    public List<UserDto> getAll() {
        return userRepository.findAll().stream()
                .map(userMapper::toDto)
                .collect(Collectors.toList());
    }
}
