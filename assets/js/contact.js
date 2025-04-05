document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('form-message');
    
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Mostrar estado de carga
        formMessage.innerHTML = '<div style="color: #eee5cd; font-weight: bold;">Enviando mensaje...</div>';
        
        // Recopilar datos del formulario
        const formData = new FormData(contactForm);
        
        // Enviar datos con fetch
        fetch('forms/contact.php', {
          method: 'POST',
          body: formData
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
          }
          return response.json();
        })
        .then(data => {
          if (data.success) {
            // Mensaje enviado con éxito
            formMessage.innerHTML = '<div style="color: #eee5cd; font-weight: bold;">' + data.message + '</div>';
            contactForm.reset(); // Limpiar formulario
          } else {
            // Error al enviar mensaje
            formMessage.innerHTML = '<div style="color: #ff6600; font-weight: bold;">' + data.message + '</div>';
          }
        })
        .catch(error => {
          // Error de conexión
          formMessage.innerHTML = '<div style="color: #ff6600; font-weight: bold;">Error de conexión. Inténtalo nuevamente.</div>';
          console.error('Error:', error);
        });
      });
    }
  });