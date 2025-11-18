package com.lucia.palermo.rentalapp.rent_a_look.controllers;

import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lucia.palermo.rentalapp.rent_a_look.models.entities.Product;
import com.lucia.palermo.rentalapp.rent_a_look.models.entities.Reservation;
import com.lucia.palermo.rentalapp.rent_a_look.models.entities.User;
// import com.lucia.palermo.rentalapp.rent_a_look.services.EmailService;
import com.lucia.palermo.rentalapp.rent_a_look.services.ProductService;
import com.lucia.palermo.rentalapp.rent_a_look.services.ReservationService;
import com.lucia.palermo.rentalapp.rent_a_look.services.UserService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/reservations")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    /* // Descomentar para el envío de correo
    @Autowired
    private EmailService emailService; */

    @Autowired
    private UserService userService;

    @Autowired
    private ProductService productService;

    // Para desactivar/activar email real
    private boolean sendRealEmails = false;

    // Crear reserva
    @PostMapping
    public ResponseEntity<?> createReservation(@RequestBody Reservation reservation) {
        try {
            // Se verifica si ya hay reservas que se pisen para este producto
            List<Reservation> existing = reservationService.getReservationsByProduct(reservation.getProduct().getId());

            boolean hasConflict = existing.stream()
                    .anyMatch(r -> !reservation.getEndDate().isBefore(r.getStartDate()) &&
                            !reservation.getStartDate().isAfter(r.getEndDate()));

            if (hasConflict) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body("El producto ya está reservado en las fechas seleccionadas.");
            }

            // Se busca el usuario completo en base al ID recibido
            User user = userService.findById(reservation.getUser().getId());
            if (user == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("El usuario no existe.");
            }

            // Se busca el producto completo
            Product product = productService.findById(reservation.getProduct().getId())
                    .orElseThrow(() -> new RuntimeException("El producto no existe."));

            reservation.setUser(user); // Asigna el usuario completo a la reserva
            reservation.setProduct(product); // Asigna el producto completo a la reserva

            // Se guarda la reserva
            Reservation newReservation = reservationService.save(reservation);

            // Log para verificar el email antes de enviar
            System.out.println(">>> Reserva recibida: " + reservation);
            System.out.println(">>> Usuario: " + user.getNombre() + " " + user.getApellido());
            System.out.println(">>> Email del usuario: " + user.getEmail());
            System.out.println(">>> Producto reservado: " + product.getName());
            System.out.println(">>> Fecha de retiro: " + reservation.getStartDate());
            System.out.println(">>> Fecha de devolución: " + reservation.getEndDate());

            // Contenido del mail. Si el usuario tiene un email válido, se envia el correo
            if (user.getEmail() != null && !user.getEmail().isBlank()) {
                String subject = "Confirmación de tu reserva en Rent-a-Look";

                // Formateo de fechas a dd-mm-yyyy
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
                String formattedStart = reservation.getStartDate().format(formatter);
                String formattedEnd = reservation.getEndDate().format(formatter);

                String content = """
                        <html>
                          <body style="font-family: Arial, sans-serif; color: #333; line-height: 1.5;">
                            <p><strong>%s, has finalizado correctamente el proceso de reserva.</strong></p>

                            <div style="background-color: #f0f0f0; padding: 10px; margin: 10px 0;">
                                <p><strong>Producto: %s</strong></p>
                            </div>

                            <p><strong>Información:</strong></p>
                            <p><strong>Fecha de retiro:</strong> %s<br>
                               <strong>Fecha de devolución:</strong> %s<br>
                               <strong>Teléfono de contacto:</strong> %s<br>
                               Nota: %s</p>

                            <p><strong>¡Gracias por confiar en Rent-a-Look!</strong></p>
                          </body>
                        </html>
                        """.formatted(
                        user.getNombre(),
                        reservation.getProduct().getName(),
                        formattedStart,
                        formattedEnd,
                        reservation.getPhone() != null && !reservation.getPhone().isBlank() ? reservation.getPhone()
                                : "(No hay teléfono de contacto)",
                        reservation.getNote() != null && !reservation.getNote().isBlank() ? reservation.getNote()
                                : "(No hay info adicional)");

                if (sendRealEmails) {
                    // --- Código original de envío de email real , descomentar para poder mandar el
                    // correo---
                    // emailService.sendEmail(user.getEmail(), subject, content);
                } else {
                    // Modo desarrollo: mostrar el contenido del email en consola
                    System.out.println(">>> Simulación envío de email");
                    System.out.println("Para: " + user.getEmail());
                    System.out.println("Asunto: " + subject);
                    System.out.println("Contenido:\n" + content);
                }
            } else {
                System.err.println("El usuario no tiene un email válido. No se envió correo.");
            }

            return ResponseEntity.status(HttpStatus.CREATED).body(newReservation);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Ocurrió un error al guardar la reserva: " + e.getMessage());
        }
    }

    // Listar todas las reservas
    @GetMapping
    public ResponseEntity<List<Reservation>> getAllReservations() {
        return ResponseEntity.ok(reservationService.findAll());
    }

    // Listar reservas por producto
    @GetMapping("/product/{productId}")
    public ResponseEntity<List<Reservation>> getReservationsByProduct(@PathVariable Long productId) {
        return ResponseEntity.ok(reservationService.getReservationsByProduct(productId));
    }

    // Listar reservas por usuario
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Reservation>> getReservationsByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(reservationService.getReservationsByUser(userId));
    }

}
