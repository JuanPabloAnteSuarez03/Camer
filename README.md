# Diego Cadena Ingeniería S.A.S — Corporate website

**English** · [Español](README.es.md)

Corporate website for [Diego Cadena Ingeniería S.A.S](https://diegocadenaingenieria.com), a Colombian firm specializing in **horizontal directional drilling (HDD)** and trenchless pipe installation, based in Cali with nationwide coverage.

🔗 **Live:** https://diegocadenaingenieria.com

---

## What's in here

A static multi-page site with a working PHP contact backend and a substantial amount of technical SEO. It was the company's first website — not a redesign. The visual design was delivered as an Illustrator file by a graphic designer; this repository is the implementation of that design as a real, working site.

For a specialized engineering firm, ranking for the exact service matters more than any other optimization: search volume is low, but intent is very high. That's why the SEO work here goes well beyond a title tag.

### Pages

| File | Page |
|---|---|
| `index.html` | Home |
| `nosotros.html` | About the company |
| `camer.html` | CAMER (drilling equipment / service line) |
| `notas-tecnicas.html` | Technical notes |
| `proyectos.html` | Projects |
| `contacto.html` | Contact |
| `politica-de-privacidad.html` | Privacy policy |

---

## SEO

This is the part of the project worth reading the source for.

- **Structured data (Schema.org JSON-LD)** — the business is typed as `["LocalBusiness", "GeneralContractor", "ProfessionalService"]`, with `PostalAddress`, `GeoCoordinates`, `OpeningHoursSpecification`, an `OfferCatalog` of `Service`/`Offer` entries, the service areas as `City`/`AdministrativeArea`/`Country`, and a full `FAQPage` with `Question`/`Answer` pairs.
- **Geo meta tags** — `geo.region`, `geo.placename`, `geo.position`, `ICBM` pointing at Cali, Valle del Cauca.
- **Social cards** — Open Graph (`es_CO` locale) and Twitter `summary_large_image`.
- **Canonical URLs** on every page.
- **`sitemap.xml`** and **`robots.txt`**, with the sitemap declared in robots.
- **Clean URLs** — `.htaccess` strips the `.html` extension and 301-redirects the old form.

### `.htaccess` behaviour

| Rule | Effect |
|---|---|
| HTTPS redirect | All HTTP traffic 301s to HTTPS |
| Canonical host | `www.diegocadenaingenieria.com` → `diegocadenaingenieria.com` |
| Extensionless URLs | `/nosotros` serves `nosotros.html`; `/nosotros.html` 301s to `/nosotros` |
| Trailing slash | Stripped via 301 |
| Legacy paths | `/about` → `/nosotros`, `/contact` → `/contacto` |
| HSTS | `Strict-Transport-Security` with `preload` |

---

## Stack

| Layer | Technology |
|---|---|
| Markup / styling | HTML5, CSS3, Bootstrap 5 |
| Interaction | Vanilla JavaScript |
| Backend | PHP 8 |
| Email | PHPMailer (via Composer) |
| Server config | Apache `.htaccess` |

**Front-end libraries** (in `assets/vendor/`): AOS (scroll animations), Swiper (sliders), Isotope + imagesLoaded (project filtering), GLightbox (lightbox), PureCounter (counters), Bootstrap Icons, php-email-form.

---

## Getting started

The site is static HTML, but the contact forms need PHP. A router is included so you can serve the whole thing locally with PHP's built-in server — it reproduces what `.htaccess` does on Apache (clean URLs, directory handling):

```bash
composer install                      # installs PHPMailer
php -S localhost:8000 router.php
```

Then open http://localhost:8000.

> Opening `index.html` directly from the filesystem works for reviewing layout, but the contact forms and the extensionless URLs will not.

---

## Forms

| File | Purpose |
|---|---|
| `forms/contact.php` | General contact form |
| `forms/quote.php` | Quote request |

Both send mail through PHPMailer. The client's hosting already supported PHP, so handling email there avoided adding a monthly subscription to a business whose only backend need is receiving contact emails.

> Configure the SMTP credentials inside the form scripts before deploying. Do not commit real credentials.

---

## Project structure

```
├─ index.html · nosotros.html · camer.html
├─ notas-tecnicas.html · proyectos.html
├─ contacto.html · politica-de-privacidad.html
├─ assets/
│  ├─ css/main.css
│  ├─ img/                 Photography and graphics
│  ├─ js/
│  └─ vendor/              Bootstrap, AOS, Swiper, Isotope, GLightbox, ...
├─ forms/
│  ├─ contact.php
│  └─ quote.php
├─ .htaccess               HTTPS, canonical host, clean URLs, HSTS
├─ router.php              Local dev server (mimics .htaccess)
├─ sitemap.xml
├─ robots.txt
└─ composer.json           PHPMailer
```

---

## Deployment

Shared Apache hosting with PHP 8:

1. Upload the repository contents to the web root.
2. Run `composer install` (or upload `vendor/`) so PHPMailer is available.
3. Make sure `.htaccess` overrides are enabled (`AllowOverride All`) — the clean URLs and HTTPS redirect depend on it.

---

## About

Built by [Juan Pablo Ante Suárez](https://github.com/JuanPabloAnteSuarez03). I developed and implemented the entire site and have handled occasional maintenance since. The visual design was delivered in Illustrator by a graphic designer; implementation, the contact backend, the SEO work and the deployment are mine.

📖 **Full case study:** [juanpabloante.vercel.app/en/projects/camer](https://juanpabloante.vercel.app/en/projects/camer)
