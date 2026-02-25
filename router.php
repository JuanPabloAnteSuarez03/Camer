<?php
/**
 * Router para php -S (desarrollo local).
 * Simula el comportamiento del .htaccess en Apache.
 * Uso: php -S localhost:8000 router.php
 */

$uri = urldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));

// Servir archivos estáticos directamente (CSS, JS, imágenes, fuentes, etc.)
if ($uri !== '/' && file_exists(__DIR__ . $uri) && !is_dir(__DIR__ . $uri)) {
    return false;
}

// Servir index.html para /
if ($uri === '/') {
    include __DIR__ . '/index.html';
    exit;
}

// Intentar agregar .html y servir el archivo
$htmlFile = __DIR__ . rtrim($uri, '/') . '.html';
if (file_exists($htmlFile)) {
    include $htmlFile;
    exit;
}

// 404
http_response_code(404);
echo '<h1>404 - Página no encontrada</h1>';
