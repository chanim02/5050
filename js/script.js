document.addEventListener("DOMContentLoaded", () => {
  /* ---------- Mobilmeny ---------- */
  const navToggle = document.getElementById("navToggle");
  const mainNav = document.getElementById("mainNav");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- År i footer ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ---------- Meny, totalsum og bestilling ---------- */
  const form = document.getElementById("order-form");
  if (!form) return;

  const checkboxes = form.querySelectorAll('.menu-item input[type="checkbox"]');
  const totalEl = document.getElementById("total-sum");
  const summaryField = document.getElementById("order-summary");
  const submitBtn = document.getElementById("submit-btn");
  const feedback = document.getElementById("form-feedback");

  function formatKr(amount) {
    return amount.toLocaleString("nb-NO") + ",- kr";
  }

  function updateOrder() {
    let total = 0;
    const valgteRetter = [];

    checkboxes.forEach((cb) => {
      if (cb.checked) {
        const pris = parseFloat(cb.dataset.price) || 0;
        total += pris;
        valgteRetter.push(`${cb.dataset.name} – ${pris},- kr`);
      }
    });

    totalEl.textContent = formatKr(total);

    summaryField.value = valgteRetter.length
      ? valgteRetter.join("\n") + `\n\nTotalsum: ${formatKr(total)}`
      : "Ingen retter valgt";

    submitBtn.disabled = valgteRetter.length === 0;
  }

  checkboxes.forEach((cb) => cb.addEventListener("change", updateOrder));
  updateOrder();

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    updateOrder();

    if (submitBtn.disabled) {
      feedback.textContent = "Velg minst én rett før du sender bestillingen.";
      feedback.className = "form-feedback error";
      return;
    }

    feedback.textContent = "Sender bestillingen...";
    feedback.className = "form-feedback";
    submitBtn.disabled = true;

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        feedback.textContent = "Takk for bestillingen! Vi tar kontakt med deg snart.";
        feedback.className = "form-feedback success";
        form.reset();
        updateOrder();
      } else {
        throw new Error("Innsending feilet");
      }
    } catch (err) {
      feedback.textContent =
        "Noe gikk galt med innsendingen. Prøv igjen, eller ring oss på 952 58 283.";
      feedback.className = "form-feedback error";
      submitBtn.disabled = false;
    }
  });
});
