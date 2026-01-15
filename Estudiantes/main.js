const URL = "https://formulario-ii-backend.onrender.com";
const form = document.querySelector("form");
const steps = document.querySelectorAll(".form-step");
const progressBar = document.getElementById("progressBar");

let currentStep = 0;

/* ================= LÓGICA DE PASOS ================= */

function showStep(index) {
  steps.forEach((step, i) => {
    step.classList.toggle("active", i === index);
  });
  window.scrollTo(0, 0);
}

function validateStep(step) {
  const requiredFields = step.querySelectorAll("[required]");
  return Array.from(requiredFields).every(field => field.value.trim() !== "");
}

/* ================= BARRA DE PROGRESO ================= */

function updateProgress() {
  if (!progressBar) return;
  const percent = Math.round(((currentStep) / (steps.length - 1)) * 100);
  progressBar.style.width = percent + "%";
  progressBar.textContent = percent + "%";
}

/* ================= MANEJO DE BOTONES (SIGUIENTE/ANTERIOR) ================= */

document.addEventListener("click", (e) => {
  const nextBtn = e.target.closest(".btn-next");
  const prevBtn = e.target.closest(".btn-prev");

  if (nextBtn) {
    e.preventDefault();
    if (!validateStep(steps[currentStep])) {
      alert("Por favor, completa los campos obligatorios antes de continuar.");
      return;
    }
    if (currentStep < steps.length - 1) {
      currentStep++;
      showStep(currentStep);
      updateProgress();
    }
  }

  if (prevBtn) {
    e.preventDefault();
    if (currentStep > 0) {
      currentStep--;
      showStep(currentStep);
      updateProgress();
    }
  }
});

/* ================= ENVÍO ÚNICO DEL FORMULARIO ================= */

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // 1. Validación de seguridad
  const isFormValid = Array.from(steps).every(step => validateStep(step));
  if (!isFormValid) {
    alert("Hay campos obligatorios pendientes.");
    return;
  }

  // 2. Captura de datos
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  // 3. Selección de RUTA (Si existe 'Ciclo' es el formulario de estudiantes IIE)
  const endpoint = data.Ciclo ? "/usuarios/usuario-iie" : "/usuarios/usuario";

  try {
    const response = await fetch(`${URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (response.ok) {
      alert("¡Datos guardados con éxito! ✅");
      form.reset();
      currentStep = 0;
      showStep(currentStep);
      updateProgress();
      // Opcional: recargar para limpiar todo rastro
      location.reload(); 
    } else {
      alert("Error del servidor: " + (result.message || "Error desconocido"));
    }
  } catch (error) {
    console.error("Error al enviar:", error);
    alert("No se pudo conectar con el servidor.");
  }
});

/* ================= INICIALIZACIÓN ================= */

showStep(currentStep);
if(progressBar) updateProgress();