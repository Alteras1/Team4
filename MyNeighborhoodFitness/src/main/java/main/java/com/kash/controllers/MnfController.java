package main.java.com.kash.controllers;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import main.java.com.kash.dao.MnfDao;
import main.java.com.kash.dao.MnfDaoImpl;
import main.java.com.kash.models.MnfClient;

public class MnfController {
	
	public static void logout(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.getSession().invalidate();
		request.getRequestDispatcher("/index.html").forward(request, response);
	}
	
	
	public static void getMnfIndexPage(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		if(request.getSession(false) == null) {
			request.getRequestDispatcher("/index.html").forward(request, response);
		}
		else {
			request.getRequestDispatcher("/MnfMemberHome.html").forward(request, response);
		}
	}
	
//	public static void getMnfMemberHome(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//		if(request.getSession(false) != null) {
//			System.out.println("member success");
//			request.getRequestDispatcher("/MnfMemberHome.html").forward(request, response);
//		}
//		else {
//			System.out.println("member fail");
//			request.getRequestDispatcher("/index.html").forward(request, response);
//		}
//	}
	
	public static void register(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		MnfDao db = new MnfDaoImpl();
		
		// new client
		String email = request.getParameter("email").toLowerCase();
		String password = request.getParameter("pass");
		String confirm = request.getParameter("confirm");
		String firstname = request.getParameter("firstname");
		String lastname = request.getParameter("lastname");
		MnfClient x = new MnfClient(email,password,firstname,lastname);
		System.out.println("before if");
		System.out.println("p: " + password);
		System.out.println("c: " + confirm);
		if (password != null && confirm != null && password.equals(confirm) && db.registerClient(x) == true  ) {
			System.out.println("after if");
			HttpSession session = request.getSession();
			session.setAttribute("email", email);
			session.setAttribute("firstname", firstname);
			session.setAttribute("lastname", lastname);
			response.setStatus(300);
			getMnfIndexPage(request,response);
		}
		else {
			registerPage(request,response);
		}
	}
	
	public static void login(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		MnfDao db = new MnfDaoImpl();
		
		String email = request.getParameter("email").toLowerCase();
		String pass = request.getParameter("pass");
		
		MnfClient x = db.readCilentFromDB(email);
		//String p = x.getPassword();
		
		if(x != null && pass.equals(x.getPassword())) {
			HttpSession session = request.getSession();
			// read whole client and store
			session.setAttribute("email", email);
			session.setAttribute("firstname", x.getFirstname());
			session.setAttribute("lastname", x.getLastname());
			response.setStatus(300);
			System.out.println("successfully logged into member home");
			getMnfIndexPage(request,response);
		}
		else {
			System.out.println("error: back to log in page");
			getMnfIndexPage(request,response);
		}
	}
	
	public static void aboutUsPage(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.getRequestDispatcher("/MnfAboutUs.html").forward(request, response);
	}
	
	public static void registerPage(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.getRequestDispatcher("/MnfRegister.html").forward(request, response);
	}
	
	//
	public static void bootcampPage(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.getRequestDispatcher("/MnfBootcamp.html").forward(request, response);
	}
	
	public static void contactUsPage(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.getRequestDispatcher("/MnfContactUsPage.html").forward(request, response);
	}
	
	public static void donatePage(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.getRequestDispatcher("/MnfDonatePage.html").forward(request, response);
	}
	
	public static void sponsorsPage(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.getRequestDispatcher("/MnfSponsorsPage.html").forward(request, response);
	}
}
