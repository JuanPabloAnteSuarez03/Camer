## Diego Cadena Ingeniería S.A.S — Sitio web corporativo

Este repositorio contiene el código fuente del sitio web corporativo de Diego Cadena Ingeniería S.A.S. Está optimizado para presentar servicios, casos de éxito y canales de contacto de la compañía.

- Producción: [diegocadenaingenieria.com](https://diegocadenaingenieria.com/)


### Tecnologías y dependencias
- HTML5, CSS3, JavaScript (ES6)
- Bootstrap 5.3.3, Bootstrap Icons
- AOS (Animate On Scroll), GLightbox, Isotope, Swiper, PureCounter
- Font Awesome
- PHP 8.x para formularios de contacto
- Composer (dependencias PHP):
  - `phpmailer/phpmailer` ^6.9
  - `vlucas/phpdotenv` ^5.6


### Estructura del proyecto (resumen)
```
.
├─ index.html              # Página de inicio (hero, servicios, destacados)
├─ about.html              # Quiénes somos (misión, visión, valores)
├─ camer.html              # CAMER: perforación horizontal dirigida
├─ proyectos.html          # Portafolio de proyectos
├─ contact.html            # Contacto (form + información + mapa)
├─ assets/
│  ├─ css/
│  │  ├─ main.css         # Estilos globales y componentes
│  │  └─ scroll-effects.css
│  ├─ js/
│  │  ├─ main.js          # Navegación, preloader, AOS, Isotope, Swiper, etc.
│  │  └─ contact.js       # Envío del formulario de contacto con fetch
│  ├─ img/                # Imágenes y recursos gráficos
│  └─ vendor/             # Librerías frontend (Bootstrap, AOS, etc.)
├─ forms/
│  └─ contact.php         # Endpoint PHP para envío de correos (PHPMailer)
├─ composer.json          # Dependencias PHP
├─ composer.lock
├─ robots.txt
└─ sitemap.xml
```


### Páginas principales
- `index.html`: sección hero con carrusel, listado de servicios, estadísticas, mapa y datos de contacto. Incluye datos estructurados (Schema.org) para negocio local y etiquetas SEO/OG.
- `camer.html`: detalle de servicios CAMER (perforación horizontal dirigida, topo, etc.) y proyectos destacados.
- `about.html`: historia, misión, visión y valores.
- `proyectos.html`: cuadrícula de proyectos representativos.
- `contact.html`: formulario de contacto y canales oficiales.


### Estilos y JavaScript
- Estilos:
  - `assets/css/main.css`: diseño base, cabecera, navegación, secciones, cards de proyectos/servicios.
  - `assets/css/scroll-effects.css`: animaciones y efectos de entrada.
- JavaScript:
  - `assets/js/main.js`:
    - Toggle de navegación móvil, preloader, botón scroll-top.
    - Inicialización de AOS, GLightbox, Isotope, Swiper y PureCounter.
    - Mantiene el link activo en el menú según la URL.
  - `assets/js/contact.js`:
    - Intercepta el submit del formulario, envía datos con `fetch` a `/forms/contact.php` y muestra mensajes JSON de éxito/error.


### Requisitos previos (local)
- PHP 8.0+
- Composer 2+


### Instalación y ejecución local
1) Instalar dependencias PHP (PHPMailer y Dotenv):
```bash
composer install
```

2) Crear un archivo `.env` en la raíz del proyecto con las credenciales SMTP (ejemplo):
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=tls
SMTP_USER=tu_correo@dominio.com
SMTP_PASS=tu_contraseña_de_aplicacion
SMTP_FROM=tu_correo@dominio.com
SMTP_TO=destino@dominio.com
```

3) Levantar un servidor local de PHP apuntando al directorio del proyecto:
```bash
php -S 127.0.0.1:8000 -t .
```
Luego abre `http://127.0.0.1:8000` en tu navegador.


### Configuración del formulario de contacto
- Endpoint: `forms/contact.php` (retorna JSON).
- Cliente: `assets/js/contact.js` envía `name`, `phone`, `email`, `message` vía `fetch`.
- Recomendado: usar variables de entorno con `vlucas/phpdotenv` para no exponer credenciales SMTP. Ejemplo de carga en PHP (referencia):
```php
// Cargar Composer
require_once __DIR__ . '/../vendor/autoload.php';

// Cargar .env
Dotenv\Dotenv::createImmutable(dirname(__DIR__))->load();

$mail->Host = $_ENV['SMTP_HOST'] ?? 'smtp.gmail.com';
$mail->Port = (int)($_ENV['SMTP_PORT'] ?? 587);
$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
$mail->Username = $_ENV['SMTP_USER'] ?? '';
$mail->Password = $_ENV['SMTP_PASS'] ?? '';
$mail->setFrom($_ENV['SMTP_FROM'] ?? 'no-reply@dominio.com', 'Web DC Ingenieria');
$mail->addAddress($_ENV['SMTP_TO'] ?? 'contacto@dominio.com');
```

Notas de seguridad:
- No commitees credenciales reales al repositorio.
- En producción, desactiva `display_errors` para evitar fuga de información.
- Asegura `HTTPS` en el dominio de producción.


### SEO y metadatos
- Cada página define: `title`, `meta description`, `keywords`, etiquetas Open Graph/Twitter y canonical.
- `index.html` incluye datos estructurados Schema.org para negocio local.
- `robots.txt` y `sitemap.xml` están incluidos para ayudar a la indexación.


### Despliegue
- Subir los archivos al hosting (document root apuntando a la carpeta del proyecto).
- Ejecutar `composer install` en el servidor (ideal). Si el hosting no soporta Composer, incluye la carpeta `vendor/` en el despliegue.
- Configurar variables de entorno (`.env`) o variables del sistema en el hosting.


### Créditos y licencia
- Template base: UpConstruction por BootstrapMade ([licencia](https://bootstrapmade.com/license/)).
- Imágenes, logos y contenido: Diego Cadena Ingeniería S.A.S.
- Desarrollo/edición/diseño: Juan Pablo Ante, Juan Camilo Silva Campos & Natalia Jaramillo.


### Contacto oficial
- Tel: +57 317 520 7436 / +57 301 713 2227
- Email: ingdiegocadena@yahoo.com / gerencia@diegocadenaingenieria.com

Para más información, visita la web oficial: [diegocadenaingenieria.com](https://diegocadenaingenieria.com/)
