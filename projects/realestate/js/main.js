/* ==========================================================================
   ORYX PRIVATE ESTATES - INTERACTIVE JAVASCRIPT
   Features:
   1. Dynamic Villa Configurator (Data Switcher)
   2. Ambiance Lighting Mode Simulator (Day / Golden Hour / Night)
   3. Real-time Investment & Mortgage Calculator
   4. VIP Viewing Pass Modal & WhatsApp Generator
   5. Mobile Nav & Smooth Navigation
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // -------------------------------------------------------------------------
  // 1. Villa Configurator Data
  // -------------------------------------------------------------------------
  const villaData = {
    royal: {
      code: "VILLA UNIT #07 - PALM EXCLUSIVE",
      name: "قصر رويال مانشن الفاخر",
      desc: "أعلى درجات الخصوصية على 3 طوابق مع مصعد بانورامي خاص، ردهة استقبال مزدوجة الارتفاع، جناح رئيسي يمتد على كامل الطابق العلوي، مرآب تحت الأرض يتسع لـ 5 سيارات، وتراس استجمام مع مسبح لا متناهي.",
      area: "1,450 م² (15,600 قدم²)",
      suites: "6 أجنحة ماستر ملكية",
      garage: "5 سيارات خاصة",
      view: "بانورامية 360° على البحر",
      price: "24,500,000 درهم / ريال",
      img: "assets/images/hero.jpg",
      tags: [
        "✨ صالة سينما خاصة 4K Dolby Atmos",
        "🏊‍♂️ مسبح إنفينيتي زجاجي معلق",
        "💆‍♀️ سبا وغرفة ساونا وجاكوزي إيطالي",
        "📱 نظام ذكاء اصطناعي للتحكم بالصوت والإضاءة"
      ]
    },
    waterfront: {
      code: "VILLA UNIT #12 - WATERFRONT SIGNATURE",
      name: "فيلا الواجهة المائية الحصرية",
      desc: "تصميم انسيابي يتيح الوصول المباشر إلى الشاطئ الخاص ومرسى اليخوت، وتضم صالة معيشة مفتوحة على حديقة استوائية ومسبحاً محاطاً بأشجار النخيل ورخام الترافيرتين.",
      area: "1,120 م² (12,050 قدم²)",
      suites: "5 أجنحة ماستر واسعة",
      garage: "3 سيارات فارهة",
      view: "إطلالة مباشرة على شاطئ الرمال البيضاء",
      price: "18,200,000 درهم / ريال",
      img: "assets/images/sunset.jpg",
      tags: [
        "🛥️ رصيف خاص لرسو اليخوت حتى 70 قدماً",
        "🌿 حديقة استوائية مع تراس شواء خارجي",
        "🍷 ردهة تذوق ومطبخ إيطالي مفتوح من Poliform",
        "☀️ زجاج كهروضوئي عازل للصوت والحرارة 100%"
      ]
    },
    sky: {
      code: "PENTHOUSE UNIT #03 - THE HORIZON",
      name: "بنتهاوس الأفق السماوي (Sky Villa)",
      desc: "قصر معلق في أعلى البرج المعماري يوفر إطلالات خيالية على الأفق والواجهة البحرية، مع مسبح زجاجي يمتد خارج حافة المبنى وتراس خاص للحفلات ومصعد مباشر.",
      area: "850 م² (9,150 قدم²)",
      suites: "4 أجنحة ماستر فاخرة",
      garage: "موقفان مغلقان + محطة شحن كهربائية",
      view: "إطلالة علوية شاملة على كامل الواجهة والمدينة",
      price: "14,800,000 درهم / ريال",
      img: "assets/images/day.jpg",
      tags: [
        "🌌 مسبح زجاجي معلق فوق السحاب",
        "🛗 مصعد فائق السرعة مشفر ببصمة العين",
        "🍸 بار وتراس مفتوح للنجوم",
        "🎵 نظام صوتي محيطي متكامل من Bang & Olufsen"
      ]
    }
  };

  const tabButtons = document.querySelectorAll('.villas-tab-nav .tab-btn');
  const villaCodeEl = document.getElementById('villaCode');
  const villaNameEl = document.getElementById('villaName');
  const villaDescEl = document.getElementById('villaDesc');
  const villaAreaEl = document.getElementById('villaArea');
  const villaSuitesEl = document.getElementById('villaSuites');
  const villaGarageEl = document.getElementById('villaGarage');
  const villaViewEl = document.getElementById('villaView');
  const villaPriceEl = document.getElementById('villaPrice');
  const villaRenderImg = document.getElementById('villaRenderImg');
  const villaTagsContainer = document.getElementById('villaTags');
  const villaTypeSelect = document.getElementById('villaTypeSelect');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const villaKey = btn.getAttribute('data-villa');
      const data = villaData[villaKey];
      if (!data) return;

      // Animate image fade
      villaRenderImg.style.opacity = '0.3';
      setTimeout(() => {
        villaCodeEl.textContent = data.code;
        villaNameEl.textContent = data.name;
        villaDescEl.textContent = data.desc;
        villaAreaEl.textContent = data.area;
        villaSuitesEl.textContent = data.suites;
        villaGarageEl.textContent = data.garage;
        villaViewEl.textContent = data.view;
        villaPriceEl.textContent = data.price;
        villaRenderImg.src = data.img;

        // Tags
        villaTagsContainer.innerHTML = '';
        data.tags.forEach(t => {
          const span = document.createElement('span');
          span.textContent = t;
          villaTagsContainer.appendChild(span);
        });

        villaRenderImg.style.opacity = '1';

        // Auto select in form
        if (villaTypeSelect) {
          Array.from(villaTypeSelect.options).forEach(opt => {
            if (opt.text.includes(data.name.split(' ')[1])) {
              villaTypeSelect.value = opt.value;
            }
          });
        }
      }, 200);
    });
  });

  // -------------------------------------------------------------------------
  // 2. Ambiance Lighting Mode Simulator (Hero & Dedicated Section)
  // -------------------------------------------------------------------------
  const ambianceModes = {
    night: {
      img: "assets/images/hero.jpg",
      text: "08:45 PM • إضاءة السهرة المسائية وسكون الليل"
    },
    sunset: {
      img: "assets/images/sunset.jpg",
      text: "06:15 PM • الساعة الذهبية وتوهج الغروب"
    },
    day: {
      img: "assets/images/day.jpg",
      text: "11:30 AM • إشراقة الصباح والضوء الطبيعي"
    }
  };

  // Hero Ambiance Chips
  const heroChips = document.querySelectorAll('.floating-ambiance-chips .chip-btn');
  const heroImagePreview = document.getElementById('heroImagePreview');

  heroChips.forEach(chip => {
    chip.addEventListener('click', () => {
      heroChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const targetImg = chip.getAttribute('data-img');
      if (heroImagePreview && targetImg) {
        heroImagePreview.style.opacity = '0.4';
        setTimeout(() => {
          heroImagePreview.src = targetImg;
          heroImagePreview.style.opacity = '1';
        }, 200);
      }
    });
  });

  // Dedicated Section Ambiance Simulator
  const ambianceBtns = document.querySelectorAll('.ambiance-switch-controls .ambiance-btn');
  const ambianceMainImg = document.getElementById('ambianceMainImg');
  const ambianceBadge = document.getElementById('ambianceBadge');

  ambianceBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      ambianceBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const modeKey = btn.getAttribute('data-target');
      const mode = ambianceModes[modeKey];
      if (!mode) return;

      if (ambianceMainImg) {
        ambianceMainImg.style.opacity = '0.3';
        setTimeout(() => {
          ambianceMainImg.src = mode.img;
          if (ambianceBadge) ambianceBadge.textContent = mode.text;
          ambianceMainImg.style.opacity = '1';
        }, 200);
      }
    });
  });

  // -------------------------------------------------------------------------
  // 3. Investment & Mortgage Live Calculator
  // -------------------------------------------------------------------------
  const priceRange = document.getElementById('priceRange');
  const downRange = document.getElementById('downRange');
  const yearsRange = document.getElementById('yearsRange');

  const calcPriceDisplay = document.getElementById('calcPriceDisplay');
  const calcDownPercentDisplay = document.getElementById('calcDownPercentDisplay');
  const calcDownAmountDisplay = document.getElementById('calcDownAmountDisplay');
  const calcYearsDisplay = document.getElementById('calcYearsDisplay');
  const calcQuarterlyPayment = document.getElementById('calcQuarterlyPayment');
  const calcRoiPercent = document.getElementById('calcRoiPercent');
  const calcAnnualReturn = document.getElementById('calcAnnualReturn');

  function formatCurrency(num) {
    return new Intl.NumberFormat('ar-AE').format(Math.round(num)) + ' د.إ';
  }

  function updateCalculator() {
    if (!priceRange || !downRange || !yearsRange) return;

    const price = parseFloat(priceRange.value);
    const downPercent = parseFloat(downRange.value);
    const years = parseFloat(yearsRange.value);

    const downAmount = price * (downPercent / 100);
    const remainingAmount = price - downAmount;
    const totalQuarters = years * 4;
    const quarterlyPayment = remainingAmount / totalQuarters;

    // ROI estimation (10.8% to 12.4% depending on price bracket)
    const roiRate = 0.115;
    const annualRent = price * roiRate;

    // Update UI displays
    calcPriceDisplay.textContent = formatCurrency(price);
    calcDownPercentDisplay.innerHTML = `${downPercent}% (<span id="calcDownAmountDisplay">${formatCurrency(downAmount)}</span>)`;
    calcYearsDisplay.textContent = `${years} سنوات (${totalQuarters} قسطاً ربع سنوي)`;
    calcQuarterlyPayment.textContent = formatCurrency(quarterlyPayment);
    calcRoiPercent.textContent = (roiRate * 100).toFixed(1) + '%';
    calcAnnualReturn.textContent = formatCurrency(annualRent) + ' / سنوياً';
  }

  if (priceRange && downRange && yearsRange) {
    priceRange.addEventListener('input', updateCalculator);
    downRange.addEventListener('input', updateCalculator);
    yearsRange.addEventListener('input', updateCalculator);
    updateCalculator(); // initial run
  }

  // -------------------------------------------------------------------------
  // 4. VIP Booking Form & WhatsApp Pass Generation
  // -------------------------------------------------------------------------
  const vipBookingForm = document.getElementById('vipBookingForm');
  const vipModal = document.getElementById('vipModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalBackdrop = document.getElementById('modalBackdrop');

  const passCodeDisplay = document.getElementById('passCodeDisplay');
  const passClientName = document.getElementById('passClientName');
  const passVillaType = document.getElementById('passVillaType');
  const passDate = document.getElementById('passDate');
  const passChauffeur = document.getElementById('passChauffeur');
  const passWhatsappBtn = document.getElementById('passWhatsappBtn');

  // Set default visit date to 5 days ahead
  const visitDateInput = document.getElementById('visitDate');
  if (visitDateInput) {
    const d = new Date();
    d.setDate(d.getDate() + 4);
    visitDateInput.value = d.toISOString().split('T')[0];
  }

  if (vipBookingForm) {
    vipBookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('clientName').value.trim() || 'سعادة العميل الكريم';
      const phone = document.getElementById('clientPhone').value.trim() || '';
      const villa = document.getElementById('villaTypeSelect').value;
      const date = document.getElementById('visitDate').value || 'خلال هذا الأسبوع';
      const rolls = document.getElementById('rollsService').checked;

      // Generate random VIP Pass number
      const randomCode = Math.floor(1000 + Math.random() * 9000);
      const passId = `#ORYX-${randomCode}`;

      // Populate Modal Pass
      passCodeDisplay.textContent = `PASS ${passId}`;
      passClientName.textContent = name;
      passVillaType.textContent = villa;
      passDate.textContent = date;
      passChauffeur.textContent = rolls ? 'مؤكدة (Rolls Royce Ghost)' : 'حضور خاص';

      // Build WhatsApp URL
      const whatsappNumber = "971528914300"; // developer VIP line
      const message = 
`👑 *طلب حجز موعد جولة خاصة VIP - أوريكس ريزيدنس*
━━━━━━━━━━━━━━━━━━━━
🏷️ *رقم بطاقة الدعوة:* ${passId}
👤 *الاسم الكريم:* ${name}
📞 *رقم الهاتف:* ${phone}
🏛️ *الوحدة المختارة:* ${villa}
📅 *تاريخ الزيارة المقترح:* ${date}
🏎️ *خدمة سيارة رولز رويس:* ${rolls ? 'نعم، أرغب في تأكيد الاستقبال' : 'حضور خاص بسيارتي'}

*ملاحظة:* يرجى تأكيد الموعد وساعة الاستقبال وإرسال لوكيشن صالة العرض الخاصة. شكراً جزيلاً.`;

      const encodedMsg = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMsg}`;

      passWhatsappBtn.href = whatsappUrl;

      // Open Modal
      vipModal.classList.add('open');
    });
  }

  // Close modal logic
  function closeModal() {
    if (vipModal) vipModal.classList.remove('open');
  }
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

  // -------------------------------------------------------------------------
  // 5. Mobile Navigation Toggle
  // -------------------------------------------------------------------------
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-active');
    });

    // Close when clicking nav items
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-active');
      });
    });
  }

});
