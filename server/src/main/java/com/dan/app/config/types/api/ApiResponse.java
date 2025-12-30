package com.dan.app.config.types.api;

import java.util.List;

public class ApiResponse<T> {

	private boolean status = true;

	private T data = null;
	private String message = "";
	private List<String> errors=List.of();

	public ApiResponse(boolean status, T data, String message, List<String> errors) {
		super();
		this.status = status;
		this.data = data;
		this.message = message;
		this.errors = errors;
	}



	public ApiResponse(boolean status, T data, String message) {
		super();
		this.status = status;
		this.data = data;
		this.message = message;
	}

	public ApiResponse() {
		super();
		// TODO Auto-generated constructor stub
	}

	public boolean isStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}

	public T getData() {
		return data;
	}

	public void setData(T data) {
		this.data = data;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public List<String> getErrors() {
		return errors;
	}

	public void setErrors(List<String> errors) {
		this.errors = errors;
	}

}
