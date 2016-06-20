package ro.fmarket.mail;

import java.util.List;

import ro.fmarket.model.demand.Demand;

public interface MailService {

	void sendDemandConfirmMail(String emailTo, String name, String token);
	
	void sendPasswordChangeMail(String emailTo, String token);

	void sendRegistrationMail(String emailTo, String token);
	
	void sendMailToCompaniesForNewDemand(Demand demand, List<String> emailAddresses);
	
	void sendAcceptedDemandMail(String emailTo, String demandTitle, String token);
	
	void sendMailForRejectedDemand(String emailTo, String demandTitle, String rejectedCause);

}
