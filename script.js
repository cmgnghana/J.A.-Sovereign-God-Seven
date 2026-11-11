/**
 * J.A. SOVEREIGN GOD LIMITED - Official Interactive Scripts
 * Heavy Construction Equipment & Construction Solutions • Tema, Ghana
 *
 * All forms across the website submit exclusively to the official business WhatsApp.
 * Complete removal of email submissions per specifications.
 * Form submissions are dynamically validated and structured into a professional,
 * clean WhatsApp message before opening the chat in WhatsApp.
 */

document.addEventListener('DOMContentLoaded', () => {
  // -------------------------------------------------------------------------
  // Company Configuration Constants
  // Primary Business WhatsApp Number: 0244 406 085 (Ghana international format: 233244406085)
  // -------------------------------------------------------------------------
  const COMPANY_NAME = 'J.A. Sovereign God Limited';
  const WHATSAPP_PHONE_NUMBER = '233244406085';
  const SEPARATOR_LINE = '━━━━━━━━━━━━━━━━━━';

  // -------------------------------------------------------------------------
  // Helper: Date & Time Formatter for WhatsApp Submissions
  // -------------------------------------------------------------------------
  function getSubmissionDateTime() {
    const now = new Date();
    try {
      const dateStr = now.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
      const timeStr = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
      return { dateStr, timeStr };
    } catch (_e) {
      return {
        dateStr: now.toISOString().split('T')[0],
        timeStr: now.toTimeString().split(' ')[0]
      };
    }
  }

  // -------------------------------------------------------------------------
  // 1. Mobile Navigation Drawer
  // -------------------------------------------------------------------------
  const mobileToggleBtn = document.getElementById('mobileToggleBtn');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');
  const mobileNavClose = document.getElementById('mobileNavClose');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link:not(.has-sub)');

  function openMobileNav() {
    if (!mobileNavDrawer) return;
    mobileNavDrawer.classList.add('active');
    mobileNavDrawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    if (!mobileNavDrawer) return;
    mobileNavDrawer.classList.remove('active');
    mobileNavDrawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  mobileToggleBtn?.addEventListener('click', openMobileNav);
  mobileNavClose?.addEventListener('click', closeMobileNav);

  mobileNavDrawer?.addEventListener('click', (e) => {
    if (e.target === mobileNavDrawer) {
      closeMobileNav();
    }
  });

  mobileLinks.forEach((link) => {
    link.addEventListener('click', closeMobileNav);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 991 && mobileNavDrawer?.classList.contains('active')) {
      closeMobileNav();
    }
  });

  // Mobile Submenu Accordions
  const mobileAccordionTriggers = document.querySelectorAll('.mobile-nav-link.has-sub');
  mobileAccordionTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const subnav = trigger.nextElementSibling;
      const chevron = trigger.querySelector('.chevron-icon');
      if (subnav) {
        subnav.classList.toggle('open');
        if (chevron) {
          chevron.style.transform = subnav.classList.contains('open') ? 'rotate(180deg)' : 'rotate(0deg)';
        }
      }
    });
  });

  // -------------------------------------------------------------------------
  // 2. Animated Counter for "100% Quality & Reliable Execution"
  // -------------------------------------------------------------------------
  const counterElement = document.getElementById('projectCounter');
  let hasAnimatedCounter = false;

  function animateCounter(el, target, duration = 1800) {
    let startTimestamp = null;
    const startValue = 0;

    function step(timestamp) {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(easeProgress * (target - startValue) + startValue);
      el.textContent = currentValue.toLocaleString('en-US');

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        el.textContent = target.toLocaleString('en-US');
      }
    }

    window.requestAnimationFrame(step);
  }

  if (counterElement) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimatedCounter) {
          hasAnimatedCounter = true;
          animateCounter(counterElement, 100, 1600);
        }
      });
    }, { threshold: 0.3 });

    observer.observe(counterElement);
  }

  // -------------------------------------------------------------------------
  // 3. Consultation / Equipment Enquiry Modal
  // -------------------------------------------------------------------------
  const appointmentModal = document.getElementById('appointmentModal');
  const appointmentClose = document.getElementById('appointmentClose');
  const appointmentBtns = document.querySelectorAll('[data-action="appointment"]');
  const modalServiceSelect = document.querySelector('#appointmentForm select[name="serviceRequired"]');

  function openAppointmentModal(defaultService = null) {
    closeMobileNav();

    if (!appointmentModal) {
      // If modal does not exist on this page, scroll to on-page form or navigate to contact
      const onPageForm = document.getElementById('mainContactForm') || document.querySelector('.contact-form');
      if (onPageForm) {
        onPageForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
        const firstInput = onPageForm.querySelector('input:not([type="hidden"]), select');
        firstInput?.focus();
        return;
      }
      const targetUrl = defaultService ? `contact.html?service=${encodeURIComponent(defaultService)}` : 'contact.html';
      window.location.href = targetUrl;
      return;
    }

    if (defaultService && modalServiceSelect) {
      let found = false;
      for (const opt of modalServiceSelect.options) {
        if (opt.value.toLowerCase().includes(defaultService.toLowerCase()) ||
            defaultService.toLowerCase().includes(opt.value.toLowerCase())) {
          modalServiceSelect.value = opt.value;
          found = true;
          break;
        }
      }
      if (!found) {
        modalServiceSelect.value = defaultService;
      }
    }

    appointmentModal.classList.add('active');
    appointmentModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Focus first input for keyboard accessibility
    const firstInput = appointmentModal.querySelector('input:not([type="hidden"]), select');
    setTimeout(() => firstInput?.focus(), 80);
  }

  function closeAppointmentModal() {
    if (!appointmentModal) return;
    appointmentModal.classList.remove('active');
    appointmentModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  appointmentBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceParam = btn.getAttribute('data-service');
      openAppointmentModal(serviceParam);
    });
  });

  appointmentClose?.addEventListener('click', closeAppointmentModal);
  appointmentModal?.addEventListener('click', (e) => {
    if (e.target === appointmentModal) closeAppointmentModal();
  });

  // -------------------------------------------------------------------------
  // 4. Toast Notification
  // -------------------------------------------------------------------------
  let toastTimer = null;

  function showToast(msg) {
    let notice = document.getElementById('toastNotice');
    let message = document.getElementById('toastMessage');

    if (!notice) {
      notice = document.createElement('div');
      notice.className = 'toast-notice';
      notice.id = 'toastNotice';
      notice.setAttribute('role', 'alert');
      notice.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        <span id="toastMessage"></span>
      `;
      document.body.appendChild(notice);
      message = notice.querySelector('#toastMessage');
    }

    if (message) {
      message.textContent = msg;
    }
    notice.classList.add('show');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      notice.classList.remove('show');
    }, 4500);
  }

  // -------------------------------------------------------------------------
  // 5. Universal WhatsApp Link Dispatcher
  // Opens official WhatsApp click-to-chat API with cleanly encoded message.
  // Never falsely declares the message as sent before the visitor presses Send.
  // -------------------------------------------------------------------------
  function dispatchToWhatsApp(formattedMessage, form = null) {
    const encodedText = encodeURIComponent(formattedMessage);
    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodedText}`;

    // Transparent, non-deceptive user feedback
    showToast('Opening WhatsApp... Please tap "Send" in WhatsApp to deliver your message.');

    // Attempt to open in a new tab/window (desktop WhatsApp Web or app protocol on mobile)
    const win = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    if (!win || win.closed || typeof win.closed === 'undefined') {
      window.location.href = whatsappUrl;
    }

    // If submitted from the consultation modal, close it after launching WhatsApp
    if (form && form.id === 'appointmentForm') {
      setTimeout(() => {
        closeAppointmentModal();
      }, 350);
    }
  }

  // -------------------------------------------------------------------------
  // 6. Heavy Equipment Operator Training Form Handler
  // Covers: #homeTrainingForm (homepage) and #pageTrainingForm (training page)
  // -------------------------------------------------------------------------
  function handleTrainingFormSubmit(form) {
    const fullNameInput = form.querySelector('[name="fullName"]');
    const phoneInput = form.querySelector('[name="phoneNumber"]');
    const whatsappInput = form.querySelector('[name="whatsappNumber"]');
    const emailInput = form.querySelector('[name="emailAddress"]');
    const locationInput = form.querySelector('[name="residentialLocation"]');
    const equipmentInput = form.querySelector('[name="trainingEquipment"]');
    const experienceInput = form.querySelector('[name="previousExperience"]');
    const startDateInput = form.querySelector('[name="preferredStartDate"]');
    const additionalInfoInput = form.querySelector('[name="additionalInfo"]');

    const fullName = fullNameInput?.value?.trim() || '';
    const phone = phoneInput?.value?.trim() || '';
    const whatsapp = whatsappInput?.value?.trim() || phone;
    const email = emailInput?.value?.trim() || '';
    const location = locationInput?.value?.trim() || '';
    const equipment = equipmentInput?.value?.trim() || '';
    const experience = experienceInput?.value?.trim() || '';
    const startDate = startDateInput?.value?.trim() || '';
    const additionalInfo = additionalInfoInput?.value?.trim() || '';

    // Field-by-field validation with targeted focus
    if (!fullName) {
      showToast('Please enter your full name.');
      fullNameInput?.focus();
      return;
    }
    if (!phone) {
      showToast('Please enter your phone number.');
      phoneInput?.focus();
      return;
    }
    if (!whatsapp) {
      showToast('Please enter your WhatsApp number.');
      whatsappInput?.focus();
      return;
    }
    if (!location) {
      showToast('Please enter your residential location.');
      locationInput?.focus();
      return;
    }
    if (!equipment) {
      showToast('Please select the equipment programme you are interested in.');
      equipmentInput?.focus();
      return;
    }
    if (!experience) {
      showToast('Please select your previous experience level.');
      experienceInput?.focus();
      return;
    }
    if (!startDate) {
      showToast('Please select your preferred training start date.');
      startDateInput?.focus();
      return;
    }

    const { dateStr, timeStr } = getSubmissionDateTime();
    const source = form.id === 'pageTrainingForm'
      ? 'Website Training Centre Registration'
      : 'Website Homepage Training Form';

    // Build clean, professional WhatsApp message structure
    // Exclude empty optional fields (email and additional notes)
    const messageParts = [
      'NEW OPERATOR TRAINING APPLICATION',
      SEPARATOR_LINE,
      'APPLICANT INFORMATION',
      `Full Name: ${fullName}`,
      `Phone Number: ${phone}`,
      `WhatsApp Number: ${whatsapp}`
    ];

    if (email) {
      messageParts.push(`Email Address: ${email}`);
    }

    messageParts.push(`Residential Location: ${location}`);
    messageParts.push(SEPARATOR_LINE);
    messageParts.push('TRAINING PROGRAMME DETAILS');
    messageParts.push(`Programme / Equipment: ${equipment}`);
    messageParts.push(`Experience Level: ${experience}`);
    messageParts.push(`Preferred Start Date: ${startDate}`);

    if (additionalInfo) {
      messageParts.push(`Additional Notes: ${additionalInfo}`);
    }

    messageParts.push(SEPARATOR_LINE);
    messageParts.push('SUBMISSION DETAILS');
    messageParts.push(`Source: ${source}`);
    messageParts.push(`Date: ${dateStr}`);
    messageParts.push(`Time: ${timeStr}`);
    messageParts.push(SEPARATOR_LINE);
    messageParts.push('Please review this training application and follow up with the applicant.');
    messageParts.push('Thank you.');

    const formattedMessage = messageParts.join('\n');
    dispatchToWhatsApp(formattedMessage, form);
  }

  // -------------------------------------------------------------------------
  // 7. Contact & Equipment Consultation Form Handler
  // Covers: #mainContactForm (contact page) and #appointmentForm (all pages modal)
  // -------------------------------------------------------------------------
  function handleContactOrConsultationSubmit(form) {
    const fullNameInput = form.querySelector('[name="fullName"]');
    const phoneInput = form.querySelector('[name="phoneNumber"]');
    const whatsappInput = form.querySelector('[name="whatsappNumber"]');
    const serviceInput = form.querySelector('[name="serviceRequired"]');
    const locationInput = form.querySelector('[name="projectLocation"]');
    const emailInput = form.querySelector('[name="emailAddress"]');
    const messageInput = form.querySelector('[name="projectMessage"]');

    const fullName = fullNameInput?.value?.trim() || '';
    const phone = phoneInput?.value?.trim() || '';
    const whatsapp = whatsappInput?.value?.trim() || phone;
    const service = serviceInput?.value?.trim() || 'Heavy Equipment Enquiry';
    const location = locationInput?.value?.trim() || '';
    const email = emailInput?.value?.trim() || '';
    const message = messageInput?.value?.trim() || '';

    // Validate required fields
    if (!fullName) {
      showToast('Please enter your full name.');
      fullNameInput?.focus();
      return;
    }
    if (!phone) {
      showToast('Please enter your phone number.');
      phoneInput?.focus();
      return;
    }
    if (!service) {
      showToast('Please select the service or equipment required.');
      serviceInput?.focus();
      return;
    }
    if (!location) {
      showToast('Please enter your project or site location.');
      locationInput?.focus();
      return;
    }
    if (!message) {
      showToast('Please provide details regarding your machinery or project requirements.');
      messageInput?.focus();
      return;
    }

    const { dateStr, timeStr } = getSubmissionDateTime();
    const isModal = form.id === 'appointmentForm';
    const pageTitle = document.title ? document.title.split(' - ')[0].trim() : 'Website';

    const heading = isModal ? 'NEW EQUIPMENT & QUOTE REQUEST' : 'NEW CONTACT ENQUIRY';
    const source = isModal
      ? `Equipment & Service Consultation Modal (${pageTitle})`
      : 'Website Contact Form';

    // Format professional WhatsApp message structure
    const messageParts = [
      heading,
      SEPARATOR_LINE,
      'CUSTOMER INFORMATION',
      `Full Name: ${fullName}`,
      `Phone Number: ${phone}`,
      `WhatsApp Number: ${whatsapp}`
    ];

    if (email) {
      messageParts.push(`Email Address: ${email}`);
    }

    messageParts.push(`Project / Site Location: ${location}`);
    messageParts.push(SEPARATOR_LINE);
    messageParts.push('ENQUIRY DETAILS');
    messageParts.push(`Service / Equipment Required: ${service}`);
    messageParts.push('Message / Description:');
    messageParts.push(message);
    messageParts.push(SEPARATOR_LINE);
    messageParts.push('SUBMISSION DETAILS');
    messageParts.push(`Source: ${source}`);
    messageParts.push(`Date: ${dateStr}`);
    messageParts.push(`Time: ${timeStr}`);
    messageParts.push(SEPARATOR_LINE);
    messageParts.push('Please review this enquiry and follow up with the customer.');
    messageParts.push('Thank you.');

    const formattedMessage = messageParts.join('\n');
    dispatchToWhatsApp(formattedMessage, form);
  }

  // -------------------------------------------------------------------------
  // 8. Generic Form Handler Fallback (Ensures 100% of website forms submit to WhatsApp)
  // Dynamically inspects all fields, extracts labels, excludes empty optional fields
  // -------------------------------------------------------------------------
  function handleGenericFormSubmit(form) {
    const elements = Array.from(form.elements);
    const collectedFields = [];

    for (const el of elements) {
      // Skip buttons, fieldsets, and hidden system inputs
      if (['submit', 'button', 'reset', 'hidden'].includes(el.type) || !el.name) {
        continue;
      }

      // Check required validation
      if (el.hasAttribute('required') && !el.value.trim()) {
        const labelEl = form.querySelector(`label[for="${el.id}"]`);
        const fieldName = labelEl ? labelEl.textContent.replace('*', '').trim() : el.name;
        showToast(`Please complete the required field: ${fieldName}.`);
        el.focus();
        return;
      }

      const val = el.value.trim();
      // Exclude empty or unfilled optional fields per instructions
      if (!val) continue;

      let labelText = el.name;
      const labelEl = form.querySelector(`label[for="${el.id}"]`);
      if (labelEl) {
        labelText = labelEl.textContent.replace('*', '').trim();
      } else if (el.placeholder) {
        labelText = el.placeholder;
      }

      collectedFields.push({ label: labelText, value: val });
    }

    const { dateStr, timeStr } = getSubmissionDateTime();
    const heading = 'NEW WEBSITE ENQUIRY';

    const messageParts = [
      heading,
      SEPARATOR_LINE,
      'SUBMITTED INFORMATION'
    ];

    collectedFields.forEach((item) => {
      messageParts.push(`${item.label}: ${item.value}`);
    });

    messageParts.push(SEPARATOR_LINE);
    messageParts.push('SUBMISSION DETAILS');
    messageParts.push(`Source: Website Form (${document.title.split(' - ')[0].trim() || 'General'})`);
    messageParts.push(`Date: ${dateStr}`);
    messageParts.push(`Time: ${timeStr}`);
    messageParts.push(SEPARATOR_LINE);
    messageParts.push('Please review this enquiry and follow up with the customer.');
    messageParts.push('Thank you.');

    const formattedMessage = messageParts.join('\n');
    dispatchToWhatsApp(formattedMessage, form);
  }

  // -------------------------------------------------------------------------
  // 9. Attach Unified WhatsApp Handlers to All Forms
  // -------------------------------------------------------------------------
  function setupAllForms() {
    const allForms = document.querySelectorAll('form');

    allForms.forEach((form) => {
      // Unified submission dispatcher for this form
      const onSubmit = (e) => {
        e?.preventDefault();

        if (form.classList.contains('training-form') || form.id.toLowerCase().includes('training')) {
          handleTrainingFormSubmit(form);
        } else if (form.classList.contains('contact-form') || form.id === 'mainContactForm' || form.id === 'appointmentForm') {
          handleContactOrConsultationSubmit(form);
        } else {
          handleGenericFormSubmit(form);
        }
      };

      // Form submit event (handles Enter key and form.submit())
      form.addEventListener('submit', onSubmit);

      // Submit button click listener (handles button clicks explicitly)
      const submitBtn = form.querySelector('.btn-send-whatsapp, button[type="submit"], .form-submit-btn');
      submitBtn?.addEventListener('click', (e) => {
        // If the button is not type="submit", trigger onSubmit manually
        if (submitBtn.getAttribute('type') !== 'submit') {
          e.preventDefault();
          onSubmit(e);
        }
      });
    });
  }

  setupAllForms();

  // -------------------------------------------------------------------------
  // 10. URL Pre-filling for Service Dropdowns (Deep-linking)
  // E.g. contact.html?service=Heavy%20Equipment%20Rental
  // -------------------------------------------------------------------------
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const serviceParam = urlParams.get('service');
    if (serviceParam) {
      const pageSelects = document.querySelectorAll('select[name="serviceRequired"]');
      pageSelects.forEach((pageSelect) => {
        for (const opt of pageSelect.options) {
          if (opt.value.toLowerCase() === serviceParam.toLowerCase() ||
              opt.value.toLowerCase().includes(serviceParam.toLowerCase()) ||
              serviceParam.toLowerCase().includes(opt.value.toLowerCase())) {
            pageSelect.value = opt.value;
            break;
          }
        }
      });
    }
  } catch (_e) {
    // Graceful fallback if URLSearchParams is unavailable
  }

  // -------------------------------------------------------------------------
  // 11. Equipment Cards "Enquire / Request Equipment" Actions
  // -------------------------------------------------------------------------
  document.querySelectorAll('.btn-equipment-enquire').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const equipmentName = btn.getAttribute('data-equipment') || 'Heavy Equipment';
      openAppointmentModal(equipmentName);
    });
  });

  // -------------------------------------------------------------------------
  // 12. FAQ Accordion Functionality
  // -------------------------------------------------------------------------
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const button = item.querySelector('.faq-question-btn');
    button?.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      // Close other items
      faqItems.forEach((other) => {
        other.classList.remove('active');
        const otherBtn = other.querySelector('.faq-question-btn');
        otherBtn?.setAttribute('aria-expanded', 'false');
      });
      if (!isActive) {
        item.classList.add('active');
        button.setAttribute('aria-expanded', 'true');
      } else {
        button.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // -------------------------------------------------------------------------
  // 13. Video Tour / Corporate Presentation Modal
  // -------------------------------------------------------------------------
  const videoModal = document.getElementById('videoModal');
  const videoClose = document.getElementById('videoClose');
  const watchVideoBtn = document.getElementById('watchVideoBtn');

  function openVideoModal() {
    if (!videoModal) return;
    videoModal.classList.add('active');
    videoModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeVideoModal() {
    if (!videoModal) return;
    videoModal.classList.remove('active');
    videoModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  watchVideoBtn?.addEventListener('click', openVideoModal);
  videoClose?.addEventListener('click', closeVideoModal);
  videoModal?.addEventListener('click', (e) => {
    if (e.target === videoModal) closeVideoModal();
  });

  // -------------------------------------------------------------------------
  // 14. Global Escape Key Handler
  // -------------------------------------------------------------------------
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAppointmentModal();
      closeVideoModal();
      closeMobileNav();
    }
  });

  console.log("J.A. Sovereign God Limited scripts initialized. All forms configured for direct WhatsApp submission.");
});
