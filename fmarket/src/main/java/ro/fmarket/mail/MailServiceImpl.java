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

@Service
public class MailServiceImpl implements MailService {

	private static final Logger LOG = Logger.getLogger(MailServiceImpl.class);
	private static final String DEMAND_CONFIRM_HTML = "demandConfirm";
	private static final String PASSWORD_CHANGE_CONFIRM_HTML = "passwordChangeConfirm";
	private static final String REGISTRATION_CONFIRM_HTML = "registrationConfirm";
	private static final String ACCEPTED_DEMAND_HTML = "";
	private static final String REJECTED_DEMAND_HTML = "";
	private static final String COMPANY_DEMAND_HTML = "";

	@Value("${base.url}")
	private String baseUrl;

	@Autowired
	private JavaMailSender mailSender;

	@Autowired
	private SpringTemplateEngine templateEngine;

	@Async
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

	@Async
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

	@Async
	@Override
	public void sendDemandConfirmMail(String emailTo, String token) {
		final MimeMessage mimeMessage = mailSender.createMimeMessage();
		final MimeMessageHelper message = new MimeMessageHelper(mimeMessage, "UTF-8");

		final Context context = new Context();
		context.setVariable("baseUrl", baseUrl);
		context.setVariable("token", token);
		final String htmlContent = templateEngine.process(DEMAND_CONFIRM_HTML, context);
		try {
			LOG.info("Sending demand confirmation email to " + emailTo);
			configureMessage(message, emailTo, "Confirmare cerere", htmlContent);
			mailSender.send(mimeMessage);
		} catch (Exception e) {
			LOG.error("Exception occurred while trying to send demand confirmation email", e);
		}
	}

	@Async
	@Override
	public void sendMailToCompanies(Demand demand, List<String> emailAddresses) {
		LOG.info("Sending new demaind mails to " + emailAddresses.size() + " companies...");
		
	}

	@Async
	@Override
	public void sendAcceptedDemandMail(String emailTo, Demand demand) {
		LOG.info("Sending accepted demand email to " + emailTo);
		
	}

	@Async
	@Override
	public void sendMailForRejectedDemand(String emailTo, Demand demand, String rejectedCause) {
		LOG.info("Sending rejected demand email to " + emailTo);
		
	}
	
	/**
	 * Configure mime message.
	 * @throws MessagingException
	 * @throws UnsupportedEncodingException
	 */
	private void configureMessage(MimeMessageHelper message, String to, String subject, String content)
			throws MessagingException, UnsupportedEncodingException {
		message.setFrom(new InternetAddress("fmarketapp@gmail.com", "fMarket.ro"));
		message.setTo(to);
		message.setSubject(subject);
		message.setText(content, true /* is html */);
	}
}
