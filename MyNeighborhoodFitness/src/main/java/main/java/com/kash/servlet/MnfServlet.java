package main.java.com.kash.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import main.java.com.kash.controllers.MnfRequestHelper;

public class MnfServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
    
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
			MnfRequestHelper.process(request,response);
		} catch (IOException | ServletException e) {
			e.printStackTrace();
		}
	}


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
			MnfRequestHelper.process(request,response);
		} catch (IOException | ServletException e) {
			e.printStackTrace();
		}
	}
}
