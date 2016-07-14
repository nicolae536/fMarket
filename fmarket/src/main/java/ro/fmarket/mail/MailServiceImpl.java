package ro.fmarket.mail;

import java.io.UnsupportedEncodingException;
import java.util.List;

import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring4.SpringTemplateEngine;

import ro.fmarket.model.demand.Demand;

@Async
@Service
public class MailServiceImpl implements MailService {

	private static final Logger LOG = Logger.getLogger(MailServiceImpl.class);

	private static final String DEMAND_CONFIRM_HTML = "demandConfirm";
	private static final String PASSWORD_CHANGE_CONFIRM_HTML = "passwordChangeConfirm";
	private static final String REGISTRATION_CONFIRM_HTML = "registrationConfirm";
	private static final String ACCEPTED_DEMAND_HTML = "demandActivated";
	private static final String REJECTED_DEMAND_HTML = "demandRejected";
	private static final String COMPANY_NEW_DEMAND_HTML = "companyNewDemand";

	@Value("${base.url}")
	private String baseUrl;

	@Value("${mail.address.mask}")
	private String addressMask;

	@Autowired
	private JavaMailSender mailSender;

	@Autowired
	private SpringTemplateEngine templateEngine;

	@Override
	public void sendRegistrationMail(String emailTo, String token) {
		final MimeMessage mimeMessage = mailSender.createMimeMessage();
		final MimeMessageHelper message = new MimeMessageHelper(mimeMessage, "UTF-8");

		final Context context = new Context();
		context.setVariable("baseUrl", baseUrl);
		context.setVariable("token", token);
		final String htmlContent = templateEngine.process(REGISTRATION_CONFIRM_HTML, context);
		try {
			LOG.info("Sending registration confirmation email to " + emailTo);
			configureMessage(message, emailTo, "Confirmare cont", htmlContent);
			mailSender.send(mimeMessage);
		} catch (Exception e) {
			LOG.error("Exception occurred while trying to send registration confirmation email", e);
		}
	}

	@Override
	public void sendPasswordChangeMail(String emailTo, String token) {
		final MimeMessage mimeMessage = mailSender.createMimeMessage();
		final MimeMessageHelper message = new MimeMessageHelper(mimeMessage, "UTF-8");

		final Context context = new Context();
		context.setVariable("baseUrl", baseUrl);
		context.setVariable("token", token);
		final String htmlContent = templateEngine.process(PASSWORD_CHANGE_CONFIRM_HTML, context);
		try {
			LOG.info("Sending password change confirmation email to " + emailTo);
			configureMessage(message, emailTo, "Schimbare parola", htmlContent);
			mailSender.send(mimeMessage);
		} catch (Exception e) {
			LOG.error("Exception occurred while trying to send password change confirmation email", e);
		}
	}

	@Override
	public void sendDemandConfirmMail(String emailTo, String name, String token) {
		final MimeMessage mimeMessage = mailSender.createMimeMessage();
		final MimeMessageHelper message = new MimeMessageHelper(mimeMessage, "UTF-8");

		final Context context = new Context();
		context.setVariable("baseUrl", baseUrl);
		context.setVariable("token", token);
		context.setVariable("name", name);
		final String htmlContent = templateEngine.process(DEMAND_CONFIRM_HTML, context);
		try {
			LOG.info("Sending demand confirmation email to " + emailTo);
			configureMessage(message, emailTo, "Confirmare cerere", htmlContent);
			mailSender.send(mimeMessage);
		} catch (Exception e) {
			LOG.error("Exception occurred while trying to send demand confirmation email", e);
		}
	}

	/**
	 * Configure mime message.
	 * 
	 * @throws MessagingException
	 * @throws UnsupportedEncodingException
	 */
	private void configureMessage(MimeMessageHelper message, String to, String subject, String content) throws MessagingException, UnsupportedEncodingException {
		message.setFrom(new InternetAddress("fmarketapp@gmail.com", addressMask));
		message.setTo(to);
		message.setSubject(subject);
		message.setText(content, true /* is html */);
	}

	private void sendMailToCompany(String emailTo, Demand demand) {
		final MimeMessage mimeMessage = mailSender.createMimeMessage();
		final MimeMessageHelper message = new MimeMessageHelper(mimeMessage, "UTF-8");

		final Context context = new Context();
		context.setVariable("baseUrl", baseUrl);
		context.setVariable("phone", demand.getPhone());
		context.setVariable("email", demand.getAccount().getEmail());
		context.setVariable("name", demand.getName());
		context.setVariable("title", demand.getTitle());
		context.setVariable("message", demand.getMessage());
		// context.setVariable("city", ); //TODO
		final String htmlContent = templateEngine.process(COMPANY_NEW_DEMAND_HTML, context);
		try {
			LOG.info("Sending new demand email to company with email " + emailTo);
			configureMessage(message, emailTo, "Cerere noua", htmlContent);
			mailSender.send(mimeMessage);
		} catch (Exception e) {
			LOG.error("Exception occurred while trying to send new demand email to company", e);
		}
	}

	@Override
	public void sendMailToCompaniesForNewDemand(Demand demand, List<String> emailAddresses) {
		LOG.info("Sending new demaind mails to " + emailAddresses.size() + " companies...");
		for (String email : emailAddresses) {
			sendMailToCompany(email, demand);
		}
	}

	@Override
	public void sendAcceptedDemandMail(String emailTo, String demandTitle, String token) {
		final MimeMessage mimeMessage = mailSender.createMimeMessage();
		final MimeMessageHelper message = new MimeMessageHelper(mimeMessage, "UTF-8");

		final Context context = new Context();
		context.setVariable("baseUrl", baseUrl);
		context.setVariable("token", token);
		context.setVariable("title", demandTitle);
		final String htmlContent = templateEngine.process(ACCEPTED_DEMAND_HTML, context);
		try {
			LOG.info("Sending demand accepted info email to " + emailTo);
			configureMessage(message, emailTo, "Cerere activata", htmlContent);
			mailSender.send(mimeMessage);
		} catch (Exception e) {
			LOG.error("Exception occurred while trying to send demand accepted info email", e);
		}
	}

	@Override
	public void sendMailForRejectedDemand(String emailTo, String demandTitle, String rejectedCause) {
		final MimeMessage mimeMessage = mailSender.createMimeMessage();
		final MimeMessageHelper message = new MimeMessageHelper(mimeMessage, "UTF-8");

		final Context context = new Context();
		context.setVariable("baseUrl", baseUrl);
		context.setVariable("rejectedCause", rejectedCause);
		context.setVariable("title", demandTitle);
		final String htmlContent = templateEngine.process(REJECTED_DEMAND_HTML, context);
		try {
			LOG.info("Sending demand rejected info email to " + emailTo);
			configureMessage(message, emailTo, "Cerere respinsa", htmlContent);
			mailSender.send(mimeMessage);
		} catch (Exception e) {
			LOG.error("Exception occurred while trying to send demand rejected info email", e);
		}

	}

	@Override
	public void sendMailForNewFacebookAccount(String emailTo, String name) {
		// TODO Auto-generated method stub
		
	}
}
