package com.sloweat.domain.auth.config;

import com.sloweat.domain.auth.jwt.CustomLogoutFilter;
import com.sloweat.domain.auth.jwt.JWTFilter;
import com.sloweat.domain.auth.jwt.JWTUtil;
import com.sloweat.domain.auth.jwt.LoginFilter;
import com.sloweat.domain.auth.repository.RefreshRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.CustomLog;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutFilter;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.Collections;

@Configuration
@EnableWebSecurity //시큐리티 활성화
@RequiredArgsConstructor
public class SecurityConfig {

    private final AuthenticationConfiguration authenticationConfiguration;
    private final JWTUtil jwtUtil;
    private final RefreshRepository refreshRepository;

    @Value("${jwt.access-token-validity}")
    private long accessTokenValidity;

    @Value("${jwt.refresh-token-validity}")
    private long refreshTokenValidity;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        //스프링 시큐리티 CORS 설정
        http
                .cors((cors)->cors.configurationSource(new CorsConfigurationSource() {
                    @Override
                    public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {

                        CorsConfiguration corsConfiguration = new CorsConfiguration();

                        corsConfiguration.setAllowedOrigins(Collections.singletonList("http://localhost:3000"));
                        corsConfiguration.setAllowedMethods(Collections.singletonList("*"));
                        corsConfiguration.setAllowCredentials(true);
                        corsConfiguration.setAllowedHeaders(Collections.singletonList("*"));
                        corsConfiguration.setMaxAge(60*60L);
                        corsConfiguration.setExposedHeaders(Collections.singletonList("Authorization"));

                        return corsConfiguration;
                    }
                }));

        //CSRF 비활성화
        http
                .csrf((csrf)->csrf.disable());

        //FormLogin, httpBasic 비활성화
        http
                .formLogin((formLogin)->formLogin.disable());

        http
                .httpBasic((httpBasic)->httpBasic.disable());

        //세션 stateless
        http
                .sessionManagement((sessionManagement)->sessionManagement
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        //필터 추가
        //JWTFilter
        http
                .addFilterBefore(new JWTFilter(jwtUtil),LoginFilter.class);

        //LoginFilter
        http
                .addFilterAt(new LoginFilter(
                                authenticationManager(authenticationConfiguration),
                                jwtUtil,
                                refreshRepository,
                                accessTokenValidity,
                                refreshTokenValidity)
                    , UsernamePasswordAuthenticationFilter.class);

        //LogoutFilter
        http
                .addFilterBefore(new CustomLogoutFilter(jwtUtil,refreshRepository), LogoutFilter.class);

        //경로별 인가 작업
        http
                .authorizeHttpRequests((auth)->auth
                        //추후에 / -> 은 제거해야 함
                        .requestMatchers("/api/auth/**","/login","/logout", "/images/**").permitAll()
                        .requestMatchers("/api/admin/**").hasRole("ADMIN")
                        .anyRequest().authenticated()
                );

        return http.build();
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
}