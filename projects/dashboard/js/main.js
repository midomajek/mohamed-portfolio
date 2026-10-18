// ===================================================================
// NOVA Smart AI & CRM Operations Suite (Egyptian Market Edition)
// Designed & Developed by Eng. Mohamed Abo Helwa (+201112277792)
// ===================================================================

document.addEventListener('DOMContentLoaded', () => {
  initTabNavigation();
  initOverviewQuickChat();
  initWhatsAppSimulator();
  initCRMTable();
  initInvoiceGenerator();
  initAISettings();
  initDemoLeadTrigger();
});

// -------------------------------------------------------------------
// 1. Tab Navigation System
// -------------------------------------------------------------------
function initTabNavigation() {
  const navTabs = document.querySelectorAll('.nav-tab[data-tab]');
  const tabSections = document.querySelectorAll('.tab-content');

  function switchTab(targetTabId) {
    // Update active tab in sidebar
    navTabs.forEach(tab => {
      if (tab.getAttribute('data-tab') === targetTabId) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    // Update active tab section
    tabSections.forEach(section => {
      if (section.id === `tab-${targetTabId}`) {
        section.classList.add('active');
      } else {
        section.classList.remove('active');
      }
    });

    // Mobile scroll to top of content
    if (window.innerWidth <= 992) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  navTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      const tabId = tab.getAttribute('data-tab');
      if (tabId) switchTab(tabId);
    });
  });

  // Switch button from overview card
  const switchToChatBtn = document.getElementById('switchToChatBtn');
  if (switchToChatBtn) {
    switchToChatBtn.addEventListener('click', () => switchTab('ai-chat'));
  }

  // Jump to invoice button in CRM
  document.querySelectorAll('.jump-invoice-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const client = btn.getAttribute('data-client');
      const amount = btn.getAttribute('data-amount');
      if (client && document.getElementById('invClient')) {
        document.getElementById('invClient').value = client;
      }
      if (amount && document.getElementById('invAmount')) {
        document.getElementById('invAmount').value = amount;
      }
      switchTab('invoices');
    });
  });
}

// -------------------------------------------------------------------
// 2. Overview Quick Bot Simulation (Egyptian Dialect)
// -------------------------------------------------------------------
function initOverviewQuickChat() {
  const quickChips = document.querySelectorAll('.prompt-chip');
  const quickReplyBox = document.getElementById('quickBotReply');

  const responses = {
    'تبييض': 'أهلاً بحضرتك يا فندم! 🦷 جلسة تبييض الأسنان بالليزر Zoom4 حالياً بـ 2,800 ج.م بدلاً من 4,200 ج.م شاملة تنظيف وتلميع بالموجات مجاناً. ومتاح التقسيط عبر فاليو على 12 شهر بدون فوائد. تحب حضرتك تحجز النهاردة ولا بكرة في فرع التجمع؟',
    'تأمين': 'أهلاً بك! نعم مجمع النور معتمد لشبكات التأمين الطبي الكبرى في مصر: أكسا (AXA Egypt)، أليانز (Allianz)، متلايف (MetLife)، وبوبا مصر (Bupa)، مع خصم وتغطية مباشرة فورية.',
    'موعد': 'تحت أمرك يا فندم! المواعيد المتاحة غداً بفرع التجمع الخامس (شارع التسعين الشمالي): الساعة 05:00 عصراً مع د. شريف استشاري الزراعة والتركيبات، أو 08:00 مساءً. أي ميعاد أنسب لحضرتك؟'
  };

  quickChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const query = chip.getAttribute('data-query');
      if (!query || !quickReplyBox) return;

      quickReplyBox.innerHTML = '<span style="color:#38bdf8;">⏳ جاري المعالجة بالذكاء الاصطناعي...</span>';

      setTimeout(() => {
        let reply = 'أهلاً بحضرتك! استفسارك تم تحليله بواسطة محرك NOVA AI، ومتاح حجز ميعادك فوراً مع طبيبك المفضل وإرسال تأكيد الحجز على واتساب.';
        if (query.includes('تبييض') || query.includes('فاليو')) reply = responses['تبييض'];
        else if (query.includes('تأمين') || query.includes('أكسا')) reply = responses['تأمين'];
        else if (query.includes('موعد') || query.includes('التجمع')) reply = responses['موعد'];

        quickReplyBox.textContent = reply;
      }, 500);
    });
  });
}

// -------------------------------------------------------------------
// 3. WhatsApp Business AI Chat Simulator (Egypt)
// -------------------------------------------------------------------
function initWhatsAppSimulator() {
  const chatForm = document.getElementById('waChatForm');
  const inputText = document.getElementById('waInputText');
  const messagesContainer = document.getElementById('waMessagesContainer');
  const typingStatus = document.getElementById('waTypingStatus');
  const testChips = document.querySelectorAll('.test-chip');

  if (!chatForm || !inputText || !messagesContainer) return;

  const aiKnowledge = [
    {
      keywords: ['تقسيط', 'فاليو', 'سهولة', 'أمان', 'اقساط', 'valu'],
      answer: 'أهلاً بحضرتك يا فندم! 💳 نعم متاح لدينا برامج تقسيط ميسرة جداً بالتعاون مع:\n1️⃣ فاليو (valU): تقسيط حتى 60 شهر، ومتاح عروض بدون مقدم وبدون فوائد على 6 أشهر.\n2️⃣ سهولة (Souhoola) وأمان (Aman).\n3️⃣ تقسيط مباشر عبر كروت ائتمان البنك الأهلي، CIB، ومصر.\n\nتقدر تفعل التقسيط وأنت في العيادة أو نبعتلك رابط التفعيل فوراً.'
    },
    {
      keywords: ['طوارئ', 'وجع', 'ألم', 'ضرسي', 'عاجل', 'دكتور', 'النهاردة'],
      answer: 'سلامة حضرتك وألف سلامة عليك! 🩺 عيادة طوارئ الأسنان بفرع التجمع الخامس شغالة الآن، ودكتور الطوارئ والاستشاري متاح النهاردة الساعة 06:30 مساءً.\n\nمن فضلك اكتب اسم حضرتك ورقم الموبايل وسأقوم بتأكيد كشف الطوارئ في جدول العيادة فوراً.'
    },
    {
      keywords: ['عنوان', 'مكان', 'فين', 'موقع', 'اللوكيشن', 'خريطة', 'القاهرة'],
      answer: 'فروع مجمع النور الطبي التخصصي في القاهرة:\n📍 فرع التجمع الخامس: شارع التسعين الشمالي - مول ميديكال بارك بريميير - الدور الثاني.\n📍 فرع المهندسين: تقاطع شارع البطل أحمد عبدالعزيز مع جامعة الدول العربية.\n\nمواعيد العمل: يومياً من 10:00 صباحاً حتى 10:00 مساءً (ماعدا الجمعة من 2:00 م حتى 10:00 م).'
    },
    {
      keywords: ['سعر', 'اسعار', 'بكام', 'تكلفة', 'عروض', 'خصم'],
      answer: 'عروض مجمع النور الحالية بالقاهرة بمناسبة الافتتاح:\n✨ كشف واستشارة تخصصية مع خطة علاج: 350 ج.م (مجانياً عند إجراء أي علاج)\n✨ تنظيف وتلميع أسنان وإزالة الجير بالموجات: 650 ج.م\n✨ تبييض أسنان ليزر Zoom4 الأمريكي: 2,800 ج.م\n✨ ابتسامة هوليوود فينير ألماني: تبدأ من 1,800 ج.م للسن الواحد مع ضمان 10 سنوات.'
    },
    {
      keywords: ['حجز', 'احجز', 'موعد', 'ميعاد', 'بكرة'],
      answer: 'تمام يا فندم، يسعدنا حجز ميعاد حضرتك! 📅\nالمواعيد المتاحة غداً بفرع التجمع:\n- ميعاد نهاري: 04:30 عصراً\n- ميعاد مسائي: 07:30 مساءً\n\nابعتلي اسم حضرتك بالكامل والتوقيت المفضل وسأقوم بتأكيد الحجز وإرسال كود التذكرة لحضرتك فوراً.'
    }
  ];

  const fallbackAnswer = 'أهلاً بحضرتك في مجمع النور الطبي التخصصي بمصر! 🌟\nأنا المساعد الذكي المدعوم بنظام NOVA AI. استفسارك مسجل وجاهز لمساعدتك في معرفة الأسعار، حجز الكشف، الاستعلام عن التأمين الطبي، أو طرق التقسيط عبر فاليو وإنستاباي.';

  function sendMessage(text) {
    if (!text) return;

    // Append outgoing message
    appendBubble(text, 'outgoing');
    inputText.value = '';

    // Set typing indicator
    if (typingStatus) {
      typingStatus.textContent = 'يكتب الآن بالذكاء الاصطناعي...';
      typingStatus.style.color = '#38bdf8';
    }

    // Determine reply
    const matched = aiKnowledge.find(item =>
      item.keywords.some(k => text.includes(k))
    );
    const replyText = matched ? matched.answer : fallbackAnswer;

    // Simulate realistic typing latency (800ms to 1200ms)
    setTimeout(() => {
      appendBubble(replyText, 'incoming');

      if (typingStatus) {
        typingStatus.textContent = 'حساب أعمال موثق • متصل الآن';
        typingStatus.style.color = '#94a3b8';
      }

      // Add live event to Activity timeline if exists
      logSystemActivity(text);
    }, 1000);
  }

  function appendBubble(content, type) {
    const timeStr = new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
    const msgDiv = document.createElement('div');
    msgDiv.className = `wa-msg ${type}`;

    const formattedContent = content.replace(/\n/g, '<br>');
    const checkmarks = type === 'outgoing' ? ' <span style="color:#38bdf8;">✓✓</span>' : '';

    msgDiv.innerHTML = `
      <div class="bubble">
        ${formattedContent}
        <span class="wa-time">${timeStr}${checkmarks}</span>
      </div>
    `;

    messagesContainer.appendChild(msgDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    sendMessage(inputText.value.trim());
  });

  testChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const msg = chip.getAttribute('data-msg');
      if (msg) sendMessage(msg);
    });
  });

  function logSystemActivity(query) {
    const feed = document.getElementById('activityFeed');
    if (!feed) return;

    const item = document.createElement('div');
    item.className = 'activity-item';
    item.innerHTML = `
      <div class="act-icon bot">🤖</div>
      <div class="act-details">
        <strong>رد ذكي فوري عبر واتساب</strong>
        <p>استفسار عميل مصري: "${query.substring(0, 35)}..."</p>
      </div>
      <span class="act-time">الآن</span>
    `;
    feed.insertBefore(item, feed.firstChild);
  }
}

// -------------------------------------------------------------------
// 4. CRM Table Filtering & Status Updates
// -------------------------------------------------------------------
function initCRMTable() {
  const searchInput = document.getElementById('leadSearchInput');
  const statusFilter = document.getElementById('statusFilterSelect');
  const tableBody = document.getElementById('crmTableBody');

  if (!searchInput || !statusFilter || !tableBody) return;

  function applyFilters() {
    const query = searchInput.value.toLowerCase().trim();
    const filter = statusFilter.value;
    const rows = tableBody.querySelectorAll('tr');

    rows.forEach(row => {
      const text = row.textContent.toLowerCase();
      const rowStatus = row.getAttribute('data-status') || '';

      const matchQuery = !query || text.includes(query);
      const matchStatus = (filter === 'all') || (rowStatus === filter);

      row.style.display = matchQuery && matchStatus ? '' : 'none';
    });
  }

  searchInput.addEventListener('input', applyFilters);
  statusFilter.addEventListener('change', applyFilters);

  // Status Action Buttons
  tableBody.addEventListener('click', (e) => {
    const confirmBtn = e.target.closest('.confirm-lead-btn');
    if (confirmBtn) {
      const row = confirmBtn.closest('tr');
      const name = confirmBtn.getAttribute('data-name');
      if (row) {
        row.setAttribute('data-status', 'confirmed');
        const statusCell = row.querySelector('td:nth-child(5)');
        if (statusCell) {
          statusCell.innerHTML = '<span class="status-tag confirmed">✓ موعد مؤكد</span>';
        }
        confirmBtn.remove();
        showToast(`تم تأكيد حجز العميل (${name}) وإرسال رسالة التأكيد عبر واتساب!`, 'success');
      }
    }

    const changeStatusBtn = e.target.closest('.change-status-btn');
    if (changeStatusBtn) {
      const row = changeStatusBtn.closest('tr');
      const name = changeStatusBtn.getAttribute('data-name');
      if (row) {
        row.setAttribute('data-status', 'confirmed');
        const statusCell = row.querySelector('td:nth-child(5)');
        if (statusCell) {
          statusCell.innerHTML = '<span class="status-tag confirmed">✓ تأكيد عبر AI</span>';
        }
        showToast(`تم تحديث حالة (${name}) إلى موعد مؤكد بنجاح.`, 'success');
      }
    }
  });
}

// -------------------------------------------------------------------
// 5. Egyptian ETA Electronic Invoicing Calculator (14% VAT)
// -------------------------------------------------------------------
function initInvoiceGenerator() {
  const form = document.getElementById('invoiceForm');
  const clientInput = document.getElementById('invClient');
  const serviceInput = document.getElementById('invService');
  const amountInput = document.getElementById('invAmount');
  const methodSelect = document.getElementById('invPaymentMethod');

  // Preview elements
  const clientDisplay = document.getElementById('invClientDisplay');
  const numberDisplay = document.getElementById('invNumberDisplay');
  const dateDisplay = document.getElementById('invDateDisplay');
  const serviceDisplay = document.getElementById('invServiceDisplay');
  const baseDisplay = document.getElementById('invBaseDisplay');
  const vatDisplay = document.getElementById('invVatDisplay');
  const totalDisplay = document.getElementById('invTotalDisplay');
  const methodDisplay = document.getElementById('invMethodDisplay');

  if (!form || !amountInput) return;

  function updateInvoice() {
    const totalAmount = parseFloat(amountInput.value) || 0;
    const clientName = clientInput?.value.trim() || 'عميل مجمع النور';
    const serviceName = serviceInput?.value.trim() || 'خدمة طبية';
    const paymentMethod = methodSelect?.value || 'إنستاباي / InstaPay';

    // Egyptian 14% VAT calculation: Total = Base * 1.14 => Base = Total / 1.14
    const basePrice = totalAmount / 1.14;
    const vatAmount = totalAmount - basePrice;

    // Realistic Egyptian ETA UUID receipt number
    const randomInvNum = '#ETA-EG-' + Math.floor(10000 + Math.random() * 90000);
    const todayStr = new Date().toISOString().split('T')[0];

    if (clientDisplay) clientDisplay.textContent = clientName;
    if (numberDisplay) numberDisplay.textContent = randomInvNum;
    if (dateDisplay) dateDisplay.textContent = todayStr;
    if (serviceDisplay) serviceDisplay.textContent = serviceName;
    if (baseDisplay) baseDisplay.textContent = basePrice.toFixed(2) + ' ج.م';
    if (vatDisplay) vatDisplay.textContent = vatAmount.toFixed(2) + ' ج.م';
    if (totalDisplay) totalDisplay.textContent = totalAmount.toFixed(2) + ' ج.م';
    if (methodDisplay) methodDisplay.textContent = paymentMethod.split('(')[0].trim();
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    updateInvoice();
    showToast('تم إصدار الإيصال الإلكتروني وتوليد رمز الضرائب المصرية (ETA QR) بنجاح!', 'success');
  });
}

// -------------------------------------------------------------------
// 6. AI Brain Settings & Prompt Persistence
// -------------------------------------------------------------------
function initAISettings() {
  const saveBtn = document.getElementById('saveAiSettingsBtn');
  const saveMsg = document.getElementById('saveMsg');

  if (!saveBtn) return;

  saveBtn.addEventListener('click', () => {
    saveBtn.innerHTML = '<span>جاري التحديث والتشفير... ⚡</span>';
    saveBtn.disabled = true;

    setTimeout(() => {
      saveBtn.innerHTML = '<span>✓ تم حفظ التعديلات بنجاح!</span>';
      saveBtn.disabled = false;

      if (saveMsg) {
        saveMsg.textContent = 'تم تطبيق السلوك الجديد بنجاح على سيرفرات الذكاء الاصطناعي بمصر.';
        saveMsg.style.color = '#34d399';
      }

      showToast('تم تحديث برومبت وسلوك الروبوت على الواتساب بنجاح!', 'success');

      setTimeout(() => {
        saveBtn.innerHTML = '<span>حفظ التعديلات وتحديث الروبوت فوراً</span>';
        if (saveMsg) saveMsg.textContent = '';
      }, 3000);
    }, 800);
  });
}

// -------------------------------------------------------------------
// 7. Interactive Demo Lead Trigger (+ تجربة وصول عميل جديد)
// -------------------------------------------------------------------
function initDemoLeadTrigger() {
  const triggerBtn = document.getElementById('triggerNewDemoLead');
  const tableBody = document.getElementById('crmTableBody');
  const badgeCount = document.getElementById('crmBadgeCount');

  if (!triggerBtn || !tableBody) return;

  const demoPool = [
    { name: 'د. هشام طلعت مصطفى', phone: '0101 449 8812', service: 'جلسة تنظيف وتبييض ليزر Zoom4', price: '2,800 ج.م', time: 'غداً • 08:00 م (التجمع)' },
    { name: 'أ. ميادة عبدالحميد الشريف', phone: '0114 902 3314', service: 'كشف واستشارة تقويم شفاف إنفزلاين', price: '1,500 ج.م', time: 'اليوم • 06:30 م (المهندسين)' },
    { name: 'م. كريم سامي العدل', phone: '0122 718 9045', service: 'زراعة عظم وفك وتثبيت فوري', price: '12,500 ج.م', time: 'السبت • 04:00 م (التجمع)' }
  ];

  let poolIndex = 0;

  triggerBtn.addEventListener('click', () => {
    const lead = demoPool[poolIndex % demoPool.length];
    poolIndex++;

    const newRow = document.createElement('tr');
    newRow.setAttribute('data-status', 'new');
    newRow.innerHTML = `
      <td>
        <div class="client-cell">
          <div class="initial-avatar" style="background:#0284c7;">${lead.name.charAt(2)}</div>
          <strong>${lead.name}</strong>
        </div>
      </td>
      <td dir="ltr">${lead.phone}</td>
      <td>${lead.service}</td>
      <td>${lead.time}</td>
      <td><span class="status-tag new">★ عميل جديد (الآن)</span></td>
      <td>${lead.price}</td>
      <td>
        <button class="btn btn-xs btn-primary confirm-lead-btn" data-name="${lead.name}">تأكيد الحجز</button>
      </td>
    `;

    tableBody.insertBefore(newRow, tableBody.firstChild);

    // Update badge count
    if (badgeCount) {
      const current = parseInt(badgeCount.textContent) || 8;
      badgeCount.textContent = current + 1;
    }

    showToast(`🔔 عميل جديد (${lead.name}) حجز لتوه عبر شات بوت واتساب!`, 'success');
  });
}

// -------------------------------------------------------------------
// Global Toast Helper
// -------------------------------------------------------------------
function showToast(message, type = 'info') {
  let toast = document.getElementById('novaToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'novaToast';
    toast.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 10000;
      background: #0f172a;
      border: 1px solid #38bdf8;
      border-right: 4px solid #38bdf8;
      color: #f8fafc;
      padding: 14px 22px;
      border-radius: 8px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
      font-family: 'Cairo', sans-serif;
      font-size: 0.95rem;
      direction: rtl;
      transition: all 0.3s ease;
      opacity: 0;
      transform: translateY(20px);
      pointer-events: none;
    `;
    document.body.appendChild(toast);
  }

  const borderColor = type === 'success' ? '#34d399' : '#38bdf8';
  toast.style.borderRightColor = borderColor;
  toast.innerHTML = `<strong>${type === 'success' ? '✓' : 'ℹ️'}</strong> ${message}`;
  toast.style.opacity = '1';
  toast.style.transform = 'translateY(0)';

  clearTimeout(toast.timeoutId);
  toast.timeoutId = setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
  }, 4000);
}
