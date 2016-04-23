package ro.fmarket.mail;

import java.util.List;

public interface MailService {

	void sendDemandConfirmMail(String emailTo, String token);

	void sendPasswordChangeMail(String emailTo, String token);

	void sendRegistrationMail(String emailTo, String token);
	
//	void sendMailToCompanies(List<String> emailAddresses);
	
//	void sendMailForRejectedDemand(String emailTo, String message);

}
