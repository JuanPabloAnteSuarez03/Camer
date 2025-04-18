<?php
// Comprobar varias rutas posibles al autoload
$paths = [
    'vendor/autoload.php',
    '../vendor/autoload.php',
    '../../vendor/autoload.php',
    dirname(__FILE__) . '/vendor/autoload.php'
];

$loaded = false;
foreach ($paths as $path) {
    if (file_exists($path)) {
        echo "Archivo encontrado en: " . $path . "<br>";
        require $path;
        $loaded = true;
        break;
    } else {
        echo "No se encontró en: " . $path . "<br>";
    }
}

if ($loaded) {
    echo "<h3>Autoloader cargado correctamente</h3>";
    
    // Verificar si las clases de PHPMailer existen
    if (class_exists('PHPMailer\PHPMailer\PHPMailer')) {
        echo "<p style='color:green'>✓ La clase PHPMailer está disponible</p>";
    } else {
        echo "<p style='color:red'>✗ La clase PHPMailer NO está disponible</p>";
    }
    
    if (class_exists('PHPMailer\PHPMailer\Exception')) {
        echo "<p style='color:green'>✓ La clase Exception de PHPMailer está disponible</p>";
    } else {
        echo "<p style='color:red'>✗ La clase Exception de PHPMailer NO está disponible</p>";
    }
    
    if (class_exists('PHPMailer\PHPMailer\SMTP')) {
        echo "<p style='color:green'>✓ La clase SMTP de PHPMailer está disponible</p>";
    } else {
        echo "<p style='color:red'>✗ La clase SMTP de PHPMailer NO está disponible</p>";
    }
} else {
    echo "<h3 style='color:red'>No se pudo cargar el autoloader de Composer</h3>";
    
    // Listar directorios para debugging
    echo "<h4>Contenido del directorio vendor:</h4>";
    if (is_dir('vendor')) {
        $files = scandir('vendor');
        echo "<pre>";
        print_r($files);
        echo "</pre>";
    } else {
        echo "El directorio 'vendor' no existe";
    }
}
?>