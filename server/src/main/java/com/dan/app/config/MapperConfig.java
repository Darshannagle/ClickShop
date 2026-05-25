package com.dan.app.config;

import java.io.IOException;
import java.util.Map;

import org.springframework.context.annotation.Configuration;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

@Configuration
public class MapperConfig {
    public static ObjectMapper mapper = new ObjectMapper().registerModule(new JavaTimeModule())
            .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

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

    public static JsonParser getParser(Object data) {
        try {
            return mapper.getFactory().createParser(data.toString());
        } catch (JsonParseException e) {
            e.printStackTrace();
            return null;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
}
