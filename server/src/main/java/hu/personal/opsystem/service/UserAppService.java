package hu.personal.opsystem.service;

import hu.personal.opsystem.entity.Application;
import hu.personal.opsystem.entity.User;
import hu.personal.opsystem.mapper.UserMapper;
import hu.personal.opsystem.model.UserDto;
import hu.personal.opsystem.repository.ApplicationRepository;
import hu.personal.opsystem.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class UserAppService {
    private final UserRepository userRepository;

    private final ApplicationRepository applicationRepository;

    private final UserMapper userMapper;

    public UserDto connectUserWithApp(UserDto userDto, UUID appId) {
        User user = userRepository.findById(userDto.getId()).orElseThrow(EntityNotFoundException::new);
        Application application = applicationRepository.findById(appId).orElseThrow(EntityNotFoundException::new);

        user.getApplications().add(application);
        return userMapper.toDto(userRepository.save(user));
    }
}
