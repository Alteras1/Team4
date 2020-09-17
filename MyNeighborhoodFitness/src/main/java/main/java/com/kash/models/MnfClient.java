package main.java.com.kash.models;

public class MnfClient {
	private String email;
	private String password;
	private String firstname;
	private String lastname;
	
	public MnfClient(String e, String p, String f, String l) {
		this.email = e;
		this.password = p;
		this.firstname = f;
		this.lastname = l;
	}
	
	public String getEmail() {
		return this.email;
	}
	
	public String getFirstname() {
		return this.firstname;
	}
	
	public String getLastname() {
		return this.lastname;
	}
	
	public String getPassword() {
		return this.password;
	}
	
	public void setPassword(String newPassword) {
		this.password = newPassword;
	}
}
