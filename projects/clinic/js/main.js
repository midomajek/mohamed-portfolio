/**
 * مركز النور الطبي التخصصي - Al-Noor Medical Center
 * Frontend Logic & Interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Elements Cache
  const header = document.getElementById('header');
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const appointmentForm = document.getElementById('appointmentForm');
  const confirmationModal = document.getElementById('confirmationModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const modalWhatsappSend = document.getElementById('modalWhatsappSend');
  const whatsappBookBtn = document.getElementById('whatsappBookBtn');
  const preferredDateInput = document.getElementById('preferredDate');
  const serviceSelect = document.getElementById('service');
  const selectServiceBtns = document.querySelectorAll('.select-service-btn');
  const quickServiceLinks = document.querySelectorAll('.quick-service-link');

  // WhatsApp Destination Number (Clinic Reception)
  const CLINIC_WHATSAPP = '966558924110';

  // 2. Prevent past dates in booking picker
  if (preferredDateInput) {
    const today = new Date().toISOString().split('T')[0];
    preferredDateInput.setAttribute('min', today);
    // Default to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    preferredDateInput.value = tomorrow.toISOString().split('T')[0];
  }

  // 3. Header Scroll Effect & Sticky Shadow
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    highlightActiveNavLink();
  });

  // 4. Mobile Menu Toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking outside or on a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  // 5. Active Nav Link on Scroll
  function highlightActiveNavLink() {
    const scrollPos = window.scrollY + 120;
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // 6. Connect "احجز موعد" buttons on service cards to the booking form
  function selectServiceAndScroll(serviceName) {
    if (!serviceSelect) return;
    
    // Find matching option
    for (let i = 0; i < serviceSelect.options.length; i++) {
      if (serviceSelect.options[i].text.includes(serviceName) || serviceSelect.options[i].value.includes(serviceName)) {
        serviceSelect.selectedIndex = i;
        break;
      }
    }

    // Scroll to booking section
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  selectServiceBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const serviceName = e.currentTarget.getAttribute('data-service-name');
      selectServiceAndScroll(serviceName);
    });
  });

  quickServiceLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const serviceName = e.currentTarget.getAttribute('data-service');
      selectServiceAndScroll(serviceName);
    });
  });

  // 7. Form Field Validation
  function validateField(fieldId, errorId, validatorFn) {
    const field = document.getElementById(fieldId);
    const formGroup = field.closest('.form-group');
    const isValid = validatorFn(field.value.trim());

    if (!isValid) {
      formGroup.classList.add('has-error');
    } else {
      formGroup.classList.remove('has-error');
    }
    return isValid;
  }

  function validateAllFields() {
    const isNameValid = validateField('fullName', 'nameError', val => val.length >= 3);
    const isPhoneValid = validateField('phone', 'phoneError', val => /^(05|5)[0-9]{8}$/.test(val));
    const isServiceValid = validateField('service', 'serviceError', val => val !== '');
    const isDateValid = validateField('preferredDate', 'dateError', val => val !== '');
    const isTimeValid = validateField('preferredTime', 'timeError', val => val !== '');

    return isNameValid && isPhoneValid && isServiceValid && isDateValid && isTimeValid;
  }

  // Real-time input validation cleanup
  ['fullName', 'phone', 'service', 'preferredDate', 'preferredTime'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', () => {
        el.closest('.form-group').classList.remove('has-error');
      });
      el.addEventListener('change', () => {
        el.closest('.form-group').classList.remove('has-error');
      });
    }
  });

  // Helper: Construct WhatsApp formatted text
  function generateWhatsAppMessage(formData, ticketCode) {
    let msg = `*طلب حجز موعد جديد - مركز النور الطبي*%0A`;
    if (ticketCode) msg += `*رقم الحجز:* ${ticketCode}%0A`;
    msg += `----------------------------%0A`;
    msg += `👤 *الاسم:* ${encodeURIComponent(formData.fullName)}%0A`;
    msg += `📱 *الجوال:* ${formData.phone}%0A`;
    msg += `🩺 *الخدمة:* ${encodeURIComponent(formData.service)}%0A`;
    msg += `📅 *التاريخ:* ${formData.preferredDate}%0A`;
    msg += `⏰ *الفترة:* ${encodeURIComponent(formData.preferredTime)}%0A`;
    if (formData.notes) {
      msg += `📝 *ملاحظات:* ${encodeURIComponent(formData.notes)}%0A`;
    }
    msg += `----------------------------%0A`;
    msg += `أرجو تأكيد أقرب موعد متاح. شكراً لكم!`;
    return msg;
  }

  // Helper: Extract current form data
  function getFormData() {
    return {
      fullName: document.getElementById('fullName').value.trim(),
      phone: document.getElementById('phone').value.trim(),
      service: document.getElementById('service').value,
      preferredDate: document.getElementById('preferredDate').value,
      preferredTime: document.getElementById('preferredTime').value,
      notes: document.getElementById('notes').value.trim()
    };
  }

  // 8. Direct WhatsApp Booking Button in the form
  if (whatsappBookBtn) {
    whatsappBookBtn.addEventListener('click', () => {
      if (!validateAllFields()) {
        const firstError = document.querySelector('.form-group.has-error');
        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }

      const data = getFormData();
      const randomCode = 'ALN-' + Math.floor(10000 + Math.random() * 90000);
      const waMsg = generateWhatsAppMessage(data, randomCode);
      const waUrl = `https://wa.me/${CLINIC_WHATSAPP}?text=${waMsg}`;
      window.open(waUrl, '_blank');
    });
  }

  // 9. Standard Form Submission & Native Dialog Modal
  if (appointmentForm) {
    appointmentForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!validateAllFields()) {
        const firstError = document.querySelector('.form-group.has-error');
        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }

      const data = getFormData();
      const ticketCode = 'ALN-' + Math.floor(10000 + Math.random() * 90000);

      // Populate Modal Content
      document.getElementById('ticketCode').textContent = ticketCode;
      document.getElementById('ticketName').textContent = data.fullName;
      document.getElementById('ticketService').textContent = data.service;
      document.getElementById('ticketDateTime').textContent = `${data.preferredDate} (${data.preferredTime.split('(')[0].trim()})`;
      document.getElementById('ticketPhone').textContent = data.phone;

      // Setup Modal WhatsApp Link
      const waMsg = generateWhatsAppMessage(data, ticketCode);
      modalWhatsappSend.href = `https://wa.me/${CLINIC_WHATSAPP}?text=${waMsg}`;

      // Open Native Dialog Modal
      if (typeof confirmationModal.showModal === 'function') {
        confirmationModal.showModal();
      } else {
        confirmationModal.setAttribute('open', '');
      }

      // Reset form
      appointmentForm.reset();
      // Re-set default date
      if (preferredDateInput) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        preferredDateInput.value = tomorrow.toISOString().split('T')[0];
      }
    });
  }

  // 10. Modal Close Actions
  if (closeModalBtn && confirmationModal) {
    closeModalBtn.addEventListener('click', () => {
      if (typeof confirmationModal.close === 'function') {
        confirmationModal.close();
      } else {
        confirmationModal.removeAttribute('open');
      }
    });

    // Close when clicking modal backdrop
    confirmationModal.addEventListener('click', (e) => {
      const rect = confirmationModal.getBoundingClientRect();
      const isInDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        if (typeof confirmationModal.close === 'function') {
          confirmationModal.close();
        } else {
          confirmationModal.removeAttribute('open');
        }
      }
    });
  }

  // 11. Subtle Number Counter Animation for Stats
  const statNumbers = document.querySelectorAll('.stat-num');
  let animated = false;

  function runCounterAnimation() {
    if (animated) return;
    const heroStats = document.querySelector('.hero-stats');
    if (!heroStats) return;

    const rect = heroStats.getBoundingClientRect();
    if (rect.top <= window.innerHeight && rect.bottom >= 0) {
      animated = true;
      // Soft entrance animation
      statNumbers.forEach(num => {
        num.style.opacity = '0';
        num.style.transform = 'translateY(10px)';
        num.style.transition = 'all 0.8s ease-out';
        setTimeout(() => {
          num.style.opacity = '1';
          num.style.transform = 'translateY(0)';
        }, 150);
      });
    }
  }

  window.addEventListener('scroll', runCounterAnimation);
  runCounterAnimation();
});
