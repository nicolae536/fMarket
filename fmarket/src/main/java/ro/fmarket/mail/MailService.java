package ro.fmarket.mail;

import java.util.List;

import ro.fmarket.model.demand.Demand;

public interface MailService {

	void sendDemandConfirmMail(String emailTo, String token);
	
	void sendNewDemandMailForLoggedInUser(Demand demand);

	void sendPasswordChangeMail(String emailTo, String token);

	void sendRegistrationMail(String emailTo, String token);
	
	void sendMailToCompanies(Demand demand, List<String> emailAddresses);
	
	void sendAcceptedDemandMail(String emailTo, Demand demand);
	
	void sendMailForRejectedDemand(String emailTo, Demand demand, String rejectedCause);

}
