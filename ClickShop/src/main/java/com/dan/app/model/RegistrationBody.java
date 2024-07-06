package com.dan.app.model;

public class RegistrationBody {
private String usernaame;
public String getUsernaame() {
	return usernaame;
}
public void setUsernaame(String usernaame) {
	this.usernaame = usernaame;
}
public String getPassword() {
	return password;
}
public void setPassword(String password) {
	this.password = password;
}
public String getFirstname() {
	return firstname;
}
public void setFirstname(String firstname) {
	this.firstname = firstname;
}
public String getLastname() {
	return lastname;
}
public void setLastname(String lastname) {
	this.lastname = lastname;
}
private String password;
private String firstname;
private String lastname;

}

