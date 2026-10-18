/**
 * KURA Artisan Roastery - Zen Scandinavian Coffee Bar Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  const WHATSAPP_NUMBER = '966548129044';

  // 1. Cart / Bag State
  let bag = [];
  const zenCartBar = document.getElementById('zenCartBar');
  const bagSummary = document.getElementById('bagSummary');
  const bagPrice = document.getElementById('bagPrice');
  const sendWaOrder = document.getElementById('sendWaOrder');

  function updateBagUI() {
    if (bag.length === 0) {
      zenCartBar.classList.remove('visible');
      return;
    }

    const totalQty = bag.reduce((sum, item) => sum + item.qty, 0);
    const totalPrice = bag.reduce((sum, item) => sum + (item.price * item.qty), 0);

    bagSummary.textContent = `${totalQty} صنف في حقيبتك`;
    bagPrice.textContent = `${totalPrice} ر.س`;
    zenCartBar.classList.add('visible');
  }

  function addToBag(name, price, btnElement) {
    const existing = bag.find(i => i.name === name);
    if (existing) {
      existing.qty += 1;
    } else {
      bag.push({ name, price, qty: 1 });
    }

    // Visual button feedback
    const originalText = btnElement.textContent;
    btnElement.textContent = '✓ أضيف للحقيبة';
    btnElement.style.color = '#10b981';
    setTimeout(() => {
      btnElement.textContent = originalText;
      btnElement.style.color = '';
    }, 900);

    updateBagUI();
  }

  // Hook menu add buttons
  document.querySelectorAll('.btn-add-minimal').forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.getAttribute('data-item');
      const price = parseFloat(btn.getAttribute('data-price'));
      addToBag(name, price, btn);
    });
  });

  // Hook origin quick order buttons
  document.querySelectorAll('.quick-order-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.getAttribute('data-item');
      const price = parseFloat(btn.getAttribute('data-price'));
      addToBag(name, price, btn);
    });
  });

  // 2. WhatsApp Order Dispatch
  if (sendWaOrder) {
    sendWaOrder.addEventListener('click', () => {
      if (bag.length === 0) return;

      const total = bag.reduce((sum, item) => sum + (item.price * item.qty), 0);
      let msg = `*طلب جديد من مقهى ومحمص كورا (KURA)*%0A`;
      msg += `---------------------------------%0A`;
      bag.forEach((item, idx) => {
        msg += `${idx + 1}. *${encodeURIComponent(item.name)}* × ${item.qty} = ${item.price * item.qty} ر.س%0A`;
      });
      msg += `---------------------------------%0A`;
      msg += `💰 *الإجمالي:* ${total} ر.س%0A`;
      msg += `أرجو تجهيز الطلب للاستلام. شكراً!`;

      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
    });
  }

  // 3. Zen Table Booking Form
  const zenBookingForm = document.getElementById('zenBookingForm');
  const zDate = document.getElementById('zDate');

  if (zDate) {
    const today = new Date().toISOString().split('T')[0];
    zDate.setAttribute('min', today);
    zDate.value = today;
  }

  if (zenBookingForm) {
    zenBookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('zName').value.trim();
      const phone = document.getElementById('zPhone').value.trim();
      const date = document.getElementById('zDate').value;
      const time = document.getElementById('zTime').value;
      const guests = document.getElementById('zGuests').value;

      let msg = `*حجز جلسة هادئة - كورا روسترز*%0A`;
      msg += `---------------------------------%0A`;
      msg += `👤 *الاسم:* ${encodeURIComponent(name)}%0A`;
      msg += `📱 *الجوال:* ${phone}%0A`;
      msg += `📅 *التاريخ:* ${date}%0A`;
      msg += `⏰ *الوقت:* ${time}%0A`;
      msg += `🍵 *نوع الجلسة:* ${encodeURIComponent(guests)}%0A`;
      msg += `---------------------------------%0A`;
      msg += `أرجو تأكيد توفر الطاولة. شكراً لكم!`;

      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
    });
  }
});
