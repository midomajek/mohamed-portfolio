// ===================================================================
// PayPulse Smart Digital Wallet & Neobank Simulator
// Designed & Developed by Eng. Mohamed Abo Helwa (+201112277792)
// ===================================================================

document.addEventListener('DOMContentLoaded', () => {
  initMobileTabNavigation();
  initBalanceToggle();
  initCardControls();
  initInstaPayFlow();
  initAnalyticsSlider();
});

// Current balance state (in EGP)
let currentBalance = 48750.50;

// -------------------------------------------------------------------
// 1. Mobile App Bottom Navigation
// -------------------------------------------------------------------
function initMobileTabNavigation() {
  const navButtons = document.querySelectorAll('.nav-phone-item[data-tab]');
  const appPages = document.querySelectorAll('.app-tab-page');

  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      navButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      appPages.forEach(page => {
        page.classList.remove('active');
        if (page.id === `page-${targetTab}`) {
          page.classList.add('active');
        }
      });
    });
  });

  // Quick Action Buttons on Home Screen
  const quickSendBtn = document.getElementById('actionQuickSend');
  if (quickSendBtn) {
    quickSendBtn.addEventListener('click', () => {
      switchAppTab('send');
    });
  }

  const quickCardBtn = document.getElementById('actionQuickCard');
  if (quickCardBtn) {
    quickCardBtn.addEventListener('click', () => {
      switchAppTab('cards');
    });
  }
}

function switchAppTab(tabName) {
  const navBtn = document.querySelector(`.nav-phone-item[data-tab="${tabName}"]`);
  if (navBtn) navBtn.click();
}

// -------------------------------------------------------------------
// 2. Balance Reveal / Hide
// -------------------------------------------------------------------
function initBalanceToggle() {
  const eyeBtn = document.getElementById('toggleEyeBtn');
  const balanceDisplay = document.getElementById('balanceDisplay');
  let isHidden = false;

  if (eyeBtn && balanceDisplay) {
    eyeBtn.addEventListener('click', () => {
      isHidden = !isHidden;
      if (isHidden) {
        balanceDisplay.innerHTML = '•••••• <small>ج.م</small>';
        eyeBtn.textContent = '👁️‍🗨️';
      } else {
        updateBalanceDisplay();
        eyeBtn.textContent = '👁️';
      }
    });
  }
}

function updateBalanceDisplay() {
  const balanceDisplay = document.getElementById('balanceDisplay');
  if (balanceDisplay) {
    balanceDisplay.innerHTML = `${currentBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <small>ج.م</small>`;
  }
}

// -------------------------------------------------------------------
// 3. Virtual Card Security & Freeze Controls
// -------------------------------------------------------------------
function initCardControls() {
  const freezeToggle = document.getElementById('freezeCardToggle');
  const onlineToggle = document.getElementById('onlineShopToggle');
  const cardElement = document.getElementById('virtualVisaCard');
  const limitSlider = document.getElementById('cardLimitSlider');
  const limitValue = document.getElementById('cardLimitValue');

  if (freezeToggle && cardElement) {
    freezeToggle.addEventListener('click', () => {
      freezeToggle.classList.toggle('active');
      const isFrozen = freezeToggle.classList.contains('active');
      if (isFrozen) {
        cardElement.classList.add('frozen');
        triggerDynamicIsland('❄️ تم تجميد البطاقة مؤقتاً');
      } else {
        cardElement.classList.remove('frozen');
        triggerDynamicIsland('✓ تم تفعيل البطاقة بنجاح');
      }
    });
  }

  if (onlineToggle) {
    onlineToggle.addEventListener('click', () => {
      onlineToggle.classList.toggle('active');
      const isActive = onlineToggle.classList.contains('active');
      triggerDynamicIsland(isActive ? '✓ تم تفعيل الشراء عبر الإنترنت' : '🔒 تم إيقاف الشراء عبر الإنترنت');
    });
  }

  if (limitSlider && limitValue) {
    limitSlider.addEventListener('input', () => {
      const val = parseInt(limitSlider.value).toLocaleString('en-US');
      limitValue.textContent = `${val} ج.م`;
    });
  }
}

// -------------------------------------------------------------------
// 4. InstaPay Instant Transfer Simulation & Biometrics
// -------------------------------------------------------------------
function initInstaPayFlow() {
  const contactButtons = document.querySelectorAll('.contact-avatar-btn');
  const recipientInput = document.getElementById('sendRecipientInput');
  const amountDisplay = document.getElementById('sendAmountVisual');
  const presetChips = document.querySelectorAll('.chip-amount');
  const sendBtn = document.getElementById('sendNowBtn');
  const bioModal = document.getElementById('biometricModal');
  const bioStatus = document.getElementById('bioStatusText');

  let currentAmount = 500;

  // Contact selection
  contactButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      contactButtons.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');

      const phone = btn.getAttribute('data-phone');
      const name = btn.getAttribute('data-name');
      if (recipientInput) {
        recipientInput.value = `${name} (${phone})`;
      }
    });
  });

  // Preset chips
  presetChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const val = parseInt(chip.getAttribute('data-val'));
      currentAmount = val;
      if (amountDisplay) {
        amountDisplay.textContent = `${currentAmount.toLocaleString('en-US')} ج.م`;
      }
    });
  });

  // Submit transfer with Face ID Simulation
  if (sendBtn && bioModal) {
    sendBtn.addEventListener('click', () => {
      const recipient = recipientInput?.value.trim() || 'أحمد الشناوي (0102 941 8820)';

      if (currentAmount > currentBalance) {
        alert('عفواً، الرصيد المتاح غير كافٍ لإتمام هذه المعاملة.');
        return;
      }

      // Show Face ID Scanning Modal
      bioModal.style.display = 'flex';
      if (bioStatus) bioStatus.textContent = 'جاري التحقق عبر Face ID...';

      // Simulate Biometric Success after 1.2s
      setTimeout(() => {
        if (bioStatus) bioStatus.innerHTML = '<span style="color:#10b981;">✓ تم تأكيد الهوية بنجاح</span>';

        setTimeout(() => {
          bioModal.style.display = 'none';

          // Deduct from balance
          currentBalance -= currentAmount;
          updateBalanceDisplay();

          // Trigger Dynamic Island notification
          triggerDynamicIsland(`💸 تم تحويل ${currentAmount} ج.م عبر إنستاباي`);

          // Prepend to activity list on Home
          addTransactionToHistory(recipient.split('(')[0].trim(), currentAmount);

          // Return to home tab
          setTimeout(() => {
            switchAppTab('home');
          }, 800);

        }, 700);
      }, 1200);
    });
  }
}

function addTransactionToHistory(recipientName, amount) {
  const list = document.getElementById('homeTransactionsList');
  if (!list) return;

  const item = document.createElement('div');
  item.className = 'trans-item';
  item.innerHTML = `
    <div class="trans-lead">
      <div class="trans-icon-box" style="background:rgba(56,189,248,0.15); color:#38bdf8;">
        ⚡
      </div>
      <div class="trans-text">
        <strong>تحويل فوري إلى ${recipientName}</strong>
        <small>الآن • عبر إنستاباي InstaPay</small>
      </div>
    </div>
    <span class="trans-amount outgoing">-${amount.toLocaleString('en-US')} ج.م</span>
  `;

  list.insertBefore(item, list.firstChild);
}

// -------------------------------------------------------------------
// 5. Dynamic Island Notification Animation
// -------------------------------------------------------------------
function triggerDynamicIsland(message) {
  const island = document.getElementById('dynamicIsland');
  const textEl = document.getElementById('islandNotifText');

  if (!island || !textEl) return;

  textEl.textContent = message;
  island.classList.add('expanded');

  clearTimeout(island.timeoutId);
  island.timeoutId = setTimeout(() => {
    island.classList.remove('expanded');
  }, 3500);
}

// -------------------------------------------------------------------
// 6. Analytics Slider
// -------------------------------------------------------------------
function initAnalyticsSlider() {
  // Can be expanded with interactive filters
}
