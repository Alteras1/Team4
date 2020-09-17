package main.java.com.kash.dao;

import main.java.com.kash.models.MnfClient;

public interface MnfDao {
	
	public boolean registerClient(MnfClient x);
	
	public MnfClient readCilentFromDB(String email);
	
	
}
