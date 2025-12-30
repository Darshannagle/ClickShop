package com.dan.app.config;

import java.util.Map;

import org.springframework.context.annotation.Configuration;

import com.dan.app.model.User;
import com.fasterxml.jackson.databind.ObjectMapper;

@Configuration
public class MapperConfig {
    static ObjectMapper mapper = new ObjectMapper();

    public static Map<String, Object> toJson(Object object) {

        Map<String, Object> map = mapper.convertValue(object, Map.class);
        return map;
    }

    public static <T> T toClass(Map<String, Object> data, Object T) {
        T objT = (T) mapper.convertValue(data, T.getClass());
        return objT;
    }

    public static <T> T toClass(Object data, Class<T> clazz) {
        return mapper.convertValue(data, clazz);
    }
}
