package main.java.com.kash.dao;

import java.sql.Connection; 
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;

import main.java.com.kash.models.MnfClient;

public class MnfDaoImpl implements MnfDao {

	@Override
	public boolean registerClient(MnfClient x) {
		//boolean retval = false;
		try {
			Connection conn = ConnectionFactory.getConnection();
			String sql = "INSERT INTO mnf_clients (email, pass, firstname, lastname) VALUES (?, ?, ?, ?)";
			System.out.println("1a");
			PreparedStatement ps = conn.prepareStatement(sql);
			System.out.println("2");
			ps.setString(1, x.getEmail().toLowerCase());
			ps.setString(2, x.getPassword());
			ps.setString(3, x.getFirstname());
			ps.setString(4, x.getLastname());
			
			ps.execute();
			System.out.println("3");
			
			conn.close();
			return true;
		}
		catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	@Override
	public MnfClient readCilentFromDB(String email) {
		
		try {
			Connection conn = ConnectionFactory.getConnection();
			String sql = "SELECT * FROM mnf_clients where email = '" + email + "'";
			
			Statement s = conn.createStatement();
			ResultSet rs = s.executeQuery(sql);
			
			if (rs.next()) {
				String e = rs.getString("email");
				String p = rs.getString("pass");
				String f = rs.getString("firstname");
				String l = rs.getString("lastname");
				MnfClient x = new MnfClient(e,p,f,l);
				conn.close();
				return x;
			}
			else {
				conn.close();
			}
		}
		catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public static void main(String[] args) {
		MnfDao db = new MnfDaoImpl();
		MnfClient x = new MnfClient("ak@uci.edu", "p", "a", "k");
		
		if ( db.registerClient(x) == true ) {
			System.out.println("worked");
			System.out.println(db.readCilentFromDB(x.getEmail()));
		}
		else {
			System.out.println("didnt");
		}
	}

}
