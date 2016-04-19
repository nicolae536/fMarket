package ro.fmarket.mail;

import java.io.UnsupportedEncodingException;

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

@Service
public class MailService {

	private static final Logger LOG = Logger.getLogger(MailService.class);
	private static final String DEMAND_CONFIRM_HTML = "demandConfirm";
	private static final String PASSWORD_CHANGE_CONFIRM_HTML = "passwordChangeConfirm";
	private static final String REGISTRATION_CONFIRM_HTML = "registrationConfirm";

	@Value("${base.url}")
	private String baseUrl;

	@Autowired
	private JavaMailSender mailSender;

	@Autowired
	private SpringTemplateEngine templateEngine;

	@Async
	public void sendRegistrationMail(String emailTo, String token) {
		final MimeMessage mimeMessage = mailSender.createMimeMessage();
		final MimeMessageHelper message = new MimeMessageHelper(mimeMessage, "UTF-8");

		final Context context = new Context();
		context.setVariable("baseUrl", baseUrl);
		context.setVariable("token", token);
		final String htmlContent = templateEngine.process("registrationConfirm", context);
		try {
			LOG.info("Sending registration confirmation email to " + emailTo);
			configureMessage(message, emailTo, "Confirmare cont", htmlContent);
			mailSender.send(mimeMessage);
		} catch (Exception e) {
			LOG.error("Exception occurred while trying to send registration confirmation email", e);
		}
	}

	@Async
	public void sendPasswordChangeMail(String emailTo, String token) {
		final MimeMessage mimeMessage = mailSender.createMimeMessage();
		final MimeMessageHelper message = new MimeMessageHelper(mimeMessage, "UTF-8");

		final Context context = new Context();
		context.setVariable("baseUrl", baseUrl);
		context.setVariable("token", token);
		final String htmlContent = templateEngine.process("passwordChangeConfirm", context);
		try {
			LOG.info("Sending password change confirmation email to " + emailTo);
			configureMessage(message, emailTo, "Schimbare parola", htmlContent);
			mailSender.send(mimeMessage);
		} catch (Exception e) {
			LOG.error("Exception occurred while trying to send password change confirmation email", e);
		}
	}

	@Async
	public void sendDemandConfirmMail(String emailTo, String token) {
		final MimeMessage mimeMessage = mailSender.createMimeMessage();
		final MimeMessageHelper message = new MimeMessageHelper(mimeMessage, "UTF-8");

		final Context context = new Context();
		context.setVariable("baseUrl", baseUrl);
		context.setVariable("token", token);
		final String htmlContent = templateEngine.process("demandConfirm", context);
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
