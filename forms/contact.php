<?php
// Importar las clases de PHPMailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


// Comprobar si se han enviado los datos del formulario
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Validar que los campos no estén vacíos
    if (empty($_POST['name']) || empty($_POST['email']) || empty($_POST['message']) || empty($_POST['phone'])) {
        echo json_encode(['success' => false, 'message' => 'Por favor, completa todos los campos requeridos.']);
        exit;
    }
    
    // Validar dirección de correo
    if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'message' => 'Por favor, ingresa una dirección de correo válida.']);
        exit;
    }
    
    // Sanitizar entradas para prevenir inyecciones
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $phone = htmlspecialchars($_POST['phone']);
    $message = htmlspecialchars($_POST['message']);
    $subject = "Nuevo contacto desde el sitio web";
    
    try {
        // Verificar si Composer autoload está disponible
        if (file_exists('../vendor/autoload.php')) {
            require '../vendor/autoload.php';
        } else {
            throw new Exception('No se pudo cargar PHPMailer. Asegúrate de instalar las dependencias con Composer.');
        }
        
        // Crear una instancia de PHPMailer
        $mail = new PHPMailer(true);
                // Después de crear la instancia de PHPMailer
        $mail = new PHPMailer(true);
        $mail->SMTPDebug = 0; // Habilitar depuración detallada
        $mail->Debugoutput = 'html'; // Formato de salida
        // Configuración del servidor
        $mail->isSMTP();                                      // Usar SMTP
        $mail->Host       = 'smtp.gmail.com';                // Servidor SMTP
        $mail->SMTPAuth   = true;                            // Habilitar autenticación SMTP
        $mail->Username   = 'juan.pablo.ante@correounivalle.edu.co'; // Tu correo
        $mail->Password   = 'zkdh rfbf ejwu yict';  // Tu contraseña o contraseña de aplicación
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;  // TLS
        $mail->Port       = 587;                             // Puerto TCP
        
        // Destinatarios
        $mail->setFrom($email, $name);
        $mail->addAddress('bannaaanalol@gmail.com');  // Correo receptor
        
        // Contenido
        $mail->isHTML(true);                                  // Formato HTML
        $mail->Subject = $subject;
        $mail->Body    = "
            <h3>Nuevo mensaje de contacto</h3>
            <p><strong>Nombre:</strong> {$name}</p>
            <p><strong>Email:</strong> {$email}</p>
            <p><strong>Teléfono:</strong> {$phone}</p>
            <p><strong>Mensaje:</strong> {$message}</p>
        ";
        
        $mail->send();
        echo json_encode(['success' => true, 'message' => '¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.']);
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => "No se pudo enviar el mensaje: {$mail->ErrorInfo}"]);
    }
} else {
    // Si no es una solicitud POST, redirigir
    header('Location: ../index.html');
    exit;
}
header('Content-Type: application/json');
echo json_encode([
  'success' => false,
  'message' => 'Ocurrió un error interno.'
]);

?>
