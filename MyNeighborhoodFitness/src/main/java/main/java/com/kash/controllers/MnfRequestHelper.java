package main.java.com.kash.controllers;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class MnfRequestHelper {
	public static void process(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
		
		
		String s = request.getRequestURI();
		//System.out.println(s);
		

		//System.out.println("s: "+ s);
		switch(s) {
		
		case "/MyNeighborhoodFitness/mnf/index.html":
			MnfController.getMnfIndexPage(request, response);
			break;
		
		case "/MyNeighborhoodFitness/mnf/logout":
			MnfController.logout(request,response);
			break;
		
		case "/MyNeighborhoodFitness/mnf/register":
			MnfController.register(request,response);
			break;
			
		case "/MyNeighborhoodFitness/mnf/login":
			MnfController.login(request,response);
			break;
			
		case "/MyNeighborhoodFitness/mnf/MnfAboutUs.html":
			MnfController.aboutUsPage(request,response);
			break;
			
		case "/MyNeighborhoodFitness/mnf/MnfRegister.html":
			MnfController.registerPage(request,response);
			break;
		
		case "/MyNeighborhoodFitness/mnf/MnfBootcamp.html":
			MnfController.bootcampPage(request, response);
			break;
			
		case "/MyNeighborhoodFitness/mnf/MnfContactUsPage.html":
			MnfController.contactUsPage(request, response);
			break;
			
		case "/MyNeighborhoodFitness/mnf/MnfDonatePage.html":
			MnfController.donatePage(request, response);
			break;
			
		case "/MyNeighborhoodFitness/mnf/MnfSponsorsPage.html":
			MnfController.sponsorsPage(request, response);
			break;
			
			
		
			
			
		default:
			MnfController.getMnfIndexPage(request,response);
			break;
		
		}
		
	}
}
