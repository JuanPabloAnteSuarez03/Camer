# Diego Cadena Ingeniería S.A.S — Sitio corporativo

[English](README.md) · **Español**

Sitio corporativo de [Diego Cadena Ingeniería S.A.S](https://diegocadenaingenieria.com), firma colombiana especializada en **perforación horizontal dirigida (PHD)** e instalación de tuberías sin zanja, con sede en Cali y cobertura nacional.

🔗 **En vivo:** https://diegocadenaingenieria.com

---

## Qué hay acá

Un sitio estático multipágina con backend de contacto en PHP y una cantidad considerable de SEO técnico. Fue el primer sitio web de la empresa — no un rediseño. El diseño visual lo entregó una diseñadora gráfica en un archivo de Illustrator; este repositorio es la implementación de ese diseño como un sitio real y funcionando.

Para una firma de ingeniería especializada, aparecer en búsquedas del servicio exacto vale más que cualquier otra optimización: el volumen de búsqueda es bajo pero la intención es altísima. Por eso el trabajo de SEO acá va bastante más allá de una etiqueta `<title>`.

### Páginas

| Archivo | Página |
|---|---|
| `index.html` | Inicio |
| `nosotros.html` | Quiénes somos |
| `camer.html` | CAMER (equipo / línea de servicio de perforación) |
| `notas-tecnicas.html` | Notas técnicas |
| `proyectos.html` | Proyectos |
| `contacto.html` | Contacto |
| `politica-de-privacidad.html` | Política de privacidad |

---

## SEO

Esta es la parte del proyecto que vale la pena mirar en el código.

- **Datos estructurados (Schema.org JSON-LD)** — el negocio está tipado como `["LocalBusiness", "GeneralContractor", "ProfessionalService"]`, con `PostalAddress`, `GeoCoordinates`, `OpeningHoursSpecification`, un `OfferCatalog` de entradas `Service`/`Offer`, las zonas de cobertura como `City`/`AdministrativeArea`/`Country`, y un `FAQPage` completo con pares `Question`/`Answer`.
- **Meta tags geográficos** — `geo.region`, `geo.placename`, `geo.position` e `ICBM` apuntando a Cali, Valle del Cauca.
- **Tarjetas sociales** — Open Graph (locale `es_CO`) y Twitter `summary_large_image`.
- **URLs canónicas** en cada página.
- **`sitemap.xml`** y **`robots.txt`**, con el sitemap declarado dentro de robots.
- **URLs limpias** — el `.htaccess` quita la extensión `.html` y redirige con 301 la forma vieja.

### Comportamiento del `.htaccess`

| Regla | Efecto |
|---|---|
| Redirección HTTPS | Todo el tráfico HTTP hace 301 a HTTPS |
| Host canónico | `www.diegocadenaingenieria.com` → `diegocadenaingenieria.com` |
| URLs sin extensión | `/nosotros` sirve `nosotros.html`; `/nosotros.html` hace 301 a `/nosotros` |
| Barra final | Se elimina con 301 |
| Rutas heredadas | `/about` → `/nosotros`, `/contact` → `/contacto` |
| HSTS | `Strict-Transport-Security` con `preload` |

---

## Stack

| Capa | Tecnología |
|---|---|
| Maquetación / estilos | HTML5, CSS3, Bootstrap 5 |
| Interacción | JavaScript sin framework |
| Backend | PHP 8 |
| Correo | PHPMailer (vía Composer) |
| Configuración de servidor | `.htaccess` de Apache |

**Librerías de front-end** (en `assets/vendor/`): AOS (animaciones al hacer scroll), Swiper (sliders), Isotope + imagesLoaded (filtrado de proyectos), GLightbox (lightbox), PureCounter (contadores), Bootstrap Icons, php-email-form.

---

## Puesta en marcha

El sitio es HTML estático, pero los formularios necesitan PHP. Se incluye un router para servir todo en local con el servidor propio de PHP — reproduce lo que hace el `.htaccess` en Apache (URLs limpias, manejo de directorios):

```bash
composer install                      # instala PHPMailer
php -S localhost:8000 router.php
```

Y luego abrir http://localhost:8000.

> Abrir `index.html` directamente desde el sistema de archivos sirve para revisar la maquetación, pero los formularios y las URLs sin extensión no van a funcionar.

---

## Formularios

| Archivo | Para qué |
|---|---|
| `forms/contact.php` | Formulario de contacto general |
| `forms/quote.php` | Solicitud de cotización |

Ambos envían correo con PHPMailer. El hosting del cliente ya soportaba PHP, así que resolverlo ahí evitó sumarle una suscripción mensual a un negocio cuya única necesidad de backend es recibir correos de contacto.

> Configurar las credenciales SMTP dentro de los scripts antes de desplegar. No commitear credenciales reales.

---

## Estructura del proyecto

```
├─ index.html · nosotros.html · camer.html
├─ notas-tecnicas.html · proyectos.html
├─ contacto.html · politica-de-privacidad.html
├─ assets/
│  ├─ css/main.css
│  ├─ img/                 Fotografía y gráficos
│  ├─ js/
│  └─ vendor/              Bootstrap, AOS, Swiper, Isotope, GLightbox, ...
├─ forms/
│  ├─ contact.php
│  └─ quote.php
├─ .htaccess               HTTPS, host canónico, URLs limpias, HSTS
├─ router.php              Servidor local de desarrollo (imita el .htaccess)
├─ sitemap.xml
├─ robots.txt
└─ composer.json           PHPMailer
```

---

## Despliegue

Hosting compartido Apache con PHP 8:

1. Subir el contenido del repositorio a la raíz web.
2. Ejecutar `composer install` (o subir `vendor/`) para que PHPMailer esté disponible.
3. Verificar que los overrides de `.htaccess` estén habilitados (`AllowOverride All`) — las URLs limpias y la redirección a HTTPS dependen de eso.

---

## Sobre el proyecto

Desarrollado por [Juan Pablo Ante Suárez](https://github.com/JuanPabloAnteSuarez03). Hice el desarrollo e implementación completa del sitio, y desde entonces le doy mantenimiento ocasional. El diseño visual lo entregó una diseñadora gráfica en Illustrator; la implementación, el backend de contacto, el trabajo de SEO y el despliegue son míos.

📖 **Caso de estudio completo:** [juanpabloante.vercel.app/es/projects/camer](https://juanpabloante.vercel.app/es/projects/camer)
