package ch.motocare.api;
import java.util.Map;import org.springframework.web.bind.annotation.*;import org.springframework.http.*;
@RestControllerAdvice public class ErrorHandler {
 @ExceptionHandler(ApiException.class) ResponseEntity<Map<String,String>> error(ApiException e){return ResponseEntity.status(e.status).body(Map.of("message",e.getMessage()));}
 @ExceptionHandler(org.springframework.web.bind.MethodArgumentNotValidException.class) ResponseEntity<Map<String,String>> validation(Exception e){return ResponseEntity.badRequest().body(Map.of("message","Ungültige Eingabe."));}
 @ExceptionHandler(org.springframework.http.converter.HttpMessageNotReadableException.class) ResponseEntity<Map<String,String>> unreadable(Exception e){return ResponseEntity.badRequest().body(Map.of("message","Ungültige JSON-Daten oder Statuswerte."));}
}
