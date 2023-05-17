package sistemamoedas.service;

import org.springframework.mail.javamail.JavaMailSender;

public interface EmailService {

    public void sendEmail(String to, String subject, String body);
}
