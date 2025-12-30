package com.dan.app.config.types.User;

import java.util.Map;

import com.dan.app.model.User;

public class UserType {

    public interface userListData {
        String getId();

        String getFname();

        String getLname();

        String getEmail();

        String getPassword();

        String getPhone();

        String getGender();

        String getLocation();

        Long getPinCode();
    }

    public interface userDetailsData {
        String getId();

        String getFname();

        String getLname();

        String getEmail();

        String getPassword();

        String getPhone();

        String getGender();

        String getLocation();

        Long getPinCode();
    }

    public static User formatDetails(User user) {
        // ObjectMapper mapper = new ObjectMapper();
        // Map<String, Object> map = mapper.convertValue(user, Map.class);
        // String json = mapper.writeValueAsString(user);
        // Map<String, Object> map = mapper.readValue(json, Map.class);
        User data = new User();
        data.setFullName(user.getFullName());
        data.setEmail(user.getEmail());
        data.setPhone(user.getPhone());
        data.setGender(user.getGender());
        data.setLocation(user.getLocation());
        data.setPinCode(user.getPinCode());
        return data;
    }

}
