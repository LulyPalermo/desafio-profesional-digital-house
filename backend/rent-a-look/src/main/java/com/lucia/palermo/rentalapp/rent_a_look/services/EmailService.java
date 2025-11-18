package com.lucia.palermo.rentalapp.rent_a_look.services;

import com.sendgrid.*;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.io.IOException;

@Service
public class EmailService {

    @Value("${sendgrid.api.key}")
    private String sendGridApiKey;

    @Value("${sendgrid.from.email}")
    private String fromEmail;

    /*
     * Esto envía un correo electrónico al usuario con los detalles de la reserva.
     * 
     * @param toEmail destinatario
     * 
     * @param subject asunto del correo
     * 
     * @param contentHtml contenido del correo en formato HTML
     */

    public void sendEmail(String toEmail, String subject, String contentHtml) {
        Email from = new Email(fromEmail);
        Email to = new Email(toEmail);
        Content content = new Content("text/html", contentHtml);
        Mail mail = new Mail(from, subject, to, content);

        SendGrid sg = new SendGrid(sendGridApiKey);
        Request request = new Request();

        try {
            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());
            Response response = sg.api(request);

            System.out.println("Email enviado con estado: " + response.getStatusCode());
            if (response.getStatusCode() >= 400) {
                System.err.println("Error al enviar el email: " + response.getBody());
            }

        } catch (IOException ex) {
            System.err.println("Error al enviar email: " + ex.getMessage());
        }
    }
}
