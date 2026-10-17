/* ==========================================================================
   MZ SMART CCTV — PRODUCTION OPTIMIZED ENGINE
   Zero Memory Leaks • Anti-Bypass Validation • 60FPS Throttled Scroll • Vercel Ready
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  /* --------------------------------------------------------------------------
     1. PERFORMANCE-THROTTLED SCROLL & STICKY NAVBAR
     (Single requestAnimationFrame loop, passive event listener, zero memory leak)
     -------------------------------------------------------------------------- */
  const navbar = document.getElementById('navbar');
  const navItems = document.querySelectorAll('.nav-item');
  const sections = Array.from(document.querySelectorAll('section[id]'));

  let isScrollTicking = false;

  function handleScroll() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    // Sticky navbar shadow toggle
    if (navbar) {
      if (scrollY > 15) {
        if (!navbar.classList.contains('scrolled')) navbar.classList.add('scrolled');
      } else {
        if (navbar.classList.contains('scrolled')) navbar.classList.remove('scrolled');
      }
    }

    // Scroll spy: highlight current active navigation link
    if (sections.length > 0 && navItems.length > 0) {
      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        const secTop = sec.offsetTop - 120;
        if (scrollY >= secTop) {
          const secId = sec.getAttribute('id');
          navItems.forEach(function (ni) {
            const href = ni.getAttribute('href');
            if (href === `#${secId}`) {
              if (!ni.classList.contains('active')) ni.classList.add('active');
            } else {
              ni.classList.remove('active');
            }
          });
          break;
        }
      }
    }

    isScrollTicking = false;
  }

  window.addEventListener('scroll', function () {
    if (!isScrollTicking) {
      window.requestAnimationFrame(handleScroll);
      isScrollTicking = true;
    }
  }, { passive: true });

  /* --------------------------------------------------------------------------
     2. LEAK-PROOF MOBILE DRAWER (ZERO OFF-SCREEN BOUNDS)
     -------------------------------------------------------------------------- */
  const menuBurger = document.getElementById('menuBurger');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileOverlay = document.getElementById('mobileOverlay');
  const drawerClose = document.getElementById('drawerClose');
  const drawerLinks = document.querySelectorAll('.drawer-card');

  let drawerCloseTimer = null;

  function openDrawer() {
    if (!mobileDrawer) return;
    if (drawerCloseTimer) clearTimeout(drawerCloseTimer);
    mobileDrawer.style.display = 'flex';
    void mobileDrawer.offsetWidth; // Force reflow to initiate smooth transform
    mobileDrawer.classList.add('open');
    if (mobileOverlay) mobileOverlay.classList.add('active');
    if (menuBurger) {
      menuBurger.classList.add('open');
      menuBurger.setAttribute('aria-expanded', 'true');
    }
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (!mobileDrawer) return;
    if (drawerCloseTimer) clearTimeout(drawerCloseTimer);
    mobileDrawer.classList.remove('open');
    if (mobileOverlay) mobileOverlay.classList.remove('active');
    if (menuBurger) {
      menuBurger.classList.remove('open');
      menuBurger.setAttribute('aria-expanded', 'false');
    }
    document.body.style.overflow = '';
    drawerCloseTimer = setTimeout(function () {
      if (!mobileDrawer.classList.contains('open')) {
        mobileDrawer.style.display = 'none';
      }
    }, 350);
  }

  if (menuBurger) {
    menuBurger.addEventListener('click', function () {
      if (mobileDrawer && mobileDrawer.classList.contains('open')) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });
  }

  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (mobileOverlay) mobileOverlay.addEventListener('click', closeDrawer);

  drawerLinks.forEach(function (link) {
    link.addEventListener('click', closeDrawer);
  });

  // Close drawer on Escape key for accessibility
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileDrawer && mobileDrawer.classList.contains('open')) {
      closeDrawer();
    }
  });

  // Automatically close drawer on screen width resize past mobile threshold
  let resizeTimer = null;
  window.addEventListener('resize', function () {
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      if (window.innerWidth > 768 && mobileDrawer && mobileDrawer.classList.contains('open')) {
        closeDrawer();
      }
    }, 150);
  }, { passive: true });

  /* --------------------------------------------------------------------------
     3. REAL-TIME CAMERA CLOCK (BATTERY & MEMORY LEAK PROOF)
     (Pauses automatically when browser tab is inactive)
     -------------------------------------------------------------------------- */
  const camTimestamp = document.getElementById('camTimestamp');
  let camClockInterval = null;

  function updateCamClock() {
    if (!camTimestamp) return;
    const now = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    camTimestamp.textContent = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  }

  function startCamClock() {
    updateCamClock();
    if (!camClockInterval) {
      camClockInterval = setInterval(updateCamClock, 1000);
    }
  }

  function stopCamClock() {
    if (camClockInterval) {
      clearInterval(camClockInterval);
      camClockInterval = null;
    }
  }

  startCamClock();

  // Pause timer when user minimizes or switches tab to save mobile battery & CPU
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      stopCamClock();
    } else {
      startCamClock();
    }
  });

  /* --------------------------------------------------------------------------
     4. INTERACTIVE 4K CAMERA DEMO SIMULATOR (POV MODES)
     -------------------------------------------------------------------------- */
  const demoTabs = document.querySelectorAll('.mode-pill');
  const demoScreen = document.getElementById('demoScreen');
  const demoFeedImg = document.getElementById('demoFeedImg');
  const camResBadge = document.getElementById('camResBadge');
  const camBitrate = document.getElementById('camBitrate');
  const camChLabel = document.getElementById('camChLabel');
  const camLocation = document.getElementById('camLocation');
  const hudCenterText = document.getElementById('hudCenterText');

  const demoModes = {
    daylight: {
      image: './assets/demo-daylight.webp',
      res: '3840×2160 • 60 FPS • H.265+',
      bitrate: 'Bitrate: 8,192 kbps • Ultra WDR ON',
      ch: 'REC CH-01 [GATE]',
      loc: 'CAM 01: MAIN ENTRANCE DRIVEWAY',
      centerTag: 'DAYLIGHT 4K ULTRA-HD SENSOR ACTIVE'
    },
    night: {
      image: './assets/demo-night.webp',
      res: '3840×2160 • 30 FPS • F1.0 ColorVu',
      bitrate: 'Bitrate: 6,144 kbps • Full Color Night',
      ch: 'REC CH-04 [VILLA]',
      loc: 'CAM 04: NOCTURNAL COLORVU STARLIGHT FEED',
      centerTag: 'COLORVU FULL-COLOR NIGHT VISION ACTIVE'
    },
    ai: {
      image: './assets/demo-ai.webp',
      res: '3840×2160 • 60 FPS • AI AcuSense',
      bitrate: 'AI Target Engine: ACTIVE (Human Tracked)',
      ch: 'REC CH-02 [PERIMETER]',
      loc: 'CAM 02: AI INTRUSION PERIMETER DEFENSE',
      centerTag: 'AI HUMAN & VEHICLE TRACKING ACTIVE'
    },
    ptz: {
      image: './assets/demo-ptz.webp',
      res: '3840×2160 • 60 FPS • 25× Optical',
      bitrate: 'PTZ Preset Sweep: 360° Panoramic',
      ch: 'REC CH-08 [HIGH-DOME]',
      loc: 'CAM 08: 360° PAN-TILT-ZOOM OVERVIEW',
      centerTag: '360° MOTORIZED PTZ PATROL ACTIVE'
    }
  };

  demoTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      demoTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const mode = tab.getAttribute('data-mode');
      const data = demoModes[mode];
      if (!data) return;

      if (demoScreen) demoScreen.className = `screen-view mode-${mode}`;
      if (demoFeedImg) demoFeedImg.src = data.image;
      if (camResBadge) camResBadge.textContent = data.res;
      if (camBitrate) camBitrate.textContent = data.bitrate;
      if (camChLabel) camChLabel.textContent = data.ch;
      if (camLocation) camLocation.textContent = data.loc;
      if (hudCenterText) hudCenterText.textContent = data.centerTag;
    });
  });

  /* --------------------------------------------------------------------------
     5. DYNAMIC COST CALCULATOR
     -------------------------------------------------------------------------- */
  const camSlider = document.getElementById('camSlider');
  const camCountDisplay = document.getElementById('camCountDisplay');
  const calcResBtns = document.querySelectorAll('#calcRes .pill-btn');
  const calcStorageBtns = document.querySelectorAll('#calcStorage .pill-btn');

  const addonAudio = document.getElementById('addonAudio');
  const addonUps = document.getElementById('addonUps');
  const addonConceal = document.getElementById('addonConceal');

  const calcPriceDisplay = document.getElementById('calcPriceDisplay');
  const summaryCams = document.getElementById('summaryCams');
  const summaryCamsPrice = document.getElementById('summaryCamsPrice');
  const summaryNvr = document.getElementById('summaryNvr');
  const summaryHdd = document.getElementById('summaryHdd');
  const summaryHddPrice = document.getElementById('summaryHddPrice');
  const summaryUpgrades = document.getElementById('summaryUpgrades');
  const summaryUpgradesPrice = document.getElementById('summaryUpgradesPrice');
  const summaryLaborPrice = document.getElementById('summaryLaborPrice');
  const bookCalcBtn = document.getElementById('bookCalcBtn');

  const pricing = {
    res: {
      '2k': { perCam: 5500, label: '2K Quad HD (4MP)' },
      '4k': { perCam: 8500, label: '4K Ultra HD (8MP)' },
      'ai4k': { perCam: 11500, label: '4K AI ColorVu Night' }
    },
    storage: {
      '1tb': { price: 8000, label: '1 TB Storage' },
      '2tb': { price: 12500, label: '2 TB Storage' },
      '4tb': { price: 21000, label: '4 TB Storage' }
    },
    nvr: {
      2: { price: 8000, label: '4-Channel Smart NVR Hub' },
      4: { price: 8000, label: '4-Channel Smart NVR Hub' },
      6: { price: 13000, label: '8-Channel 4K AI NVR Hub' },
      8: { price: 13000, label: '8-Channel 4K AI NVR Hub' },
      10: { price: 22000, label: '16-Channel Enterprise NVR Hub' },
      12: { price: 22000, label: '16-Channel Enterprise NVR Hub' },
      14: { price: 22000, label: '16-Channel Enterprise NVR Hub' },
      16: { price: 22000, label: '16-Channel Enterprise NVR Hub' }
    }
  };

  const calcState = {
    cameras: 4,
    res: '4k',
    storage: '2tb'
  };

  function updateCalculator() {
    if (!camSlider) return;
    const camCount = parseInt(camSlider.value, 10) || 4;
    calcState.cameras = camCount;
    if (camCountDisplay) camCountDisplay.textContent = `${camCount} Cameras`;

    const resData = pricing.res[calcState.res] || pricing.res['4k'];
    const camTotal = camCount * resData.perCam;

    const nvrData = pricing.nvr[camCount] || pricing.nvr[16];
    const hddData = pricing.storage[calcState.storage] || pricing.storage['2tb'];

    let upgradesTotal = 0;
    const upgradeList = [];
    if (addonAudio && addonAudio.checked) {
      upgradesTotal += (camCount * 500);
      upgradeList.push('Audio');
    }
    if (addonUps && addonUps.checked) {
      upgradesTotal += 4500;
      upgradeList.push('UPS');
    }
    if (addonConceal && addonConceal.checked) {
      upgradesTotal += (camCount * 700);
      upgradeList.push('Ducting');
    }

    const laborTotal = 3000 + (camCount * 1200);
    const grandTotal = camTotal + nvrData.price + hddData.price + upgradesTotal + laborTotal;

    if (calcPriceDisplay) calcPriceDisplay.textContent = `PKR ${grandTotal.toLocaleString()}`;
    if (summaryCams) summaryCams.textContent = `${camCount} × ${resData.label}`;
    if (summaryCamsPrice) summaryCamsPrice.textContent = `PKR ${camTotal.toLocaleString()}`;
    if (summaryNvr) summaryNvr.textContent = nvrData.label;
    if (summaryHdd) summaryHdd.textContent = hddData.label;
    if (summaryHddPrice) summaryHddPrice.textContent = `PKR ${hddData.price.toLocaleString()}`;
    if (summaryUpgrades) summaryUpgrades.textContent = upgradeList.length > 0 ? upgradeList.join(' + ') : 'None';
    if (summaryUpgradesPrice) summaryUpgradesPrice.textContent = `PKR ${upgradesTotal.toLocaleString()}`;
    if (summaryLaborPrice) summaryLaborPrice.textContent = `PKR ${laborTotal.toLocaleString()}`;
  }

  if (camSlider) {
    camSlider.addEventListener('input', updateCalculator);
  }

  calcResBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      calcResBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      calcState.res = btn.getAttribute('data-val') || '4k';
      updateCalculator();
    });
  });

  calcStorageBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      calcStorageBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      calcState.storage = btn.getAttribute('data-val') || '2tb';
      updateCalculator();
    });
  });

  [addonAudio, addonUps, addonConceal].forEach(function (chk) {
    if (chk) chk.addEventListener('change', updateCalculator);
  });

  updateCalculator();

  if (bookCalcBtn) {
    bookCalcBtn.addEventListener('click', function () {
      const quoteSection = document.getElementById('quote');
      const camSelect = document.getElementById('cameraCountSelect');
      const clientNotes = document.getElementById('clientNotes');

      if (camSelect) {
        for (let i = 0; i < camSelect.options.length; i++) {
          if (camSelect.options[i].value.startsWith(String(calcState.cameras))) {
            camSelect.selectedIndex = i;
            break;
          }
        }
      }

      if (clientNotes) {
        const estText = calcPriceDisplay ? calcPriceDisplay.textContent : 'Calculated';
        clientNotes.value = `Calculated Estimate: ${calcState.cameras} Cameras, ${pricing.res[calcState.res].label}, ${pricing.storage[calcState.storage].label} (~${estText}).`;
      }

      if (quoteSection) {
        quoteSection.scrollIntoView({ behavior: 'smooth' });
        const nameInput = document.getElementById('clientName');
        if (nameInput) setTimeout(() => nameInput.focus(), 400);
      }
    });
  }

  /* --------------------------------------------------------------------------
     6. ANTI-BYPASS INPUT SANITIZATION & DIRECT WHATSAPP INTEGRATION
     (Stops script injection, empty bypass, invalid telephone numbers, double-submits)
     -------------------------------------------------------------------------- */
  const quoteForm = document.getElementById('quoteForm');
  const formSuccess = document.getElementById('formSuccess');
  const formError = document.getElementById('formError');
  const formErrorText = document.getElementById('formErrorText');
  const submitQuoteBtn = document.getElementById('submitQuoteBtn');
  const waSuccessText = document.getElementById('waSuccessText');

  // Allowed whitelist options for select dropdowns to prevent DOM tampering
  const VALID_PROPERTIES = [
    'Home / Villa',
    'Apartment',
    'Office',
    'Shop / Retail',
    'Warehouse'
  ];

  const VALID_CAM_OPTIONS = [
    '2 Cameras',
    '4 Cameras',
    '6 Cameras',
    '8 Cameras',
    '12+ Cameras'
  ];

  // Robust Text Sanitizer: Removes HTML tags, script delimiters, quotes and control characters
  function sanitizeInput(str, maxLen) {
    if (!str || typeof str !== 'string') return '';
    return str
      .replace(/[<>'"\\;`]/g, '')   // Strip script/HTML injection delimiters
      .replace(/\s+/g, ' ')         // Collapse excessive whitespace
      .trim()
      .slice(0, maxLen || 200);
  }

  function showFormError(msg) {
    if (formError && formErrorText) {
      formErrorText.textContent = msg;
      formError.classList.add('visible');
      formError.style.display = 'flex';
      formError.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  function hideFormError() {
    if (formError) {
      formError.classList.remove('visible');
      formError.style.display = 'none';
    }
  }

  let isSubmitting = false;

  if (quoteForm) {
    quoteForm.addEventListener('submit', function (e) {
      e.preventDefault();
      hideFormError();

      if (isSubmitting) return; // Prevent double-click spam

      // Fetch and sanitize all inputs
      const rawName = document.getElementById('clientName') ? document.getElementById('clientName').value : '';
      const rawPhone = document.getElementById('clientPhone') ? document.getElementById('clientPhone').value : '';
      const rawProp = document.getElementById('propertyTypeSelect') ? document.getElementById('propertyTypeSelect').value : '';
      const rawCams = document.getElementById('cameraCountSelect') ? document.getElementById('cameraCountSelect').value : '';
      const rawAddr = document.getElementById('clientAddress') ? document.getElementById('clientAddress').value : '';
      const rawNotes = document.getElementById('clientNotes') ? document.getElementById('clientNotes').value : '';

      const name = sanitizeInput(rawName, 60);
      const phone = sanitizeInput(rawPhone, 25);
      const addr = sanitizeInput(rawAddr, 150);
      const notes = sanitizeInput(rawNotes, 300);

      // 1. Anti-Bypass Name Validation
      if (!name || name.length < 2) {
        showFormError('Please enter your full name (minimum 2 characters).');
        const nInput = document.getElementById('clientName');
        if (nInput) nInput.focus();
        return;
      }

      // Check for pure symbols/numbers bypass in name
      if (!/[a-zA-Z]/.test(name)) {
        showFormError('Please enter a valid personal or company name containing letters.');
        const nInput = document.getElementById('clientName');
        if (nInput) nInput.focus();
        return;
      }

      // 2. Anti-Bypass Phone Validation
      const phoneDigits = phone.replace(/\D/g, '');
      if (phoneDigits.length < 7 || phoneDigits.length > 15) {
        showFormError('Please enter a valid WhatsApp or mobile phone number (7 to 15 digits).');
        const pInput = document.getElementById('clientPhone');
        if (pInput) pInput.focus();
        return;
      }

      // 3. Dropdown Whitelist Validation
      const prop = VALID_PROPERTIES.includes(rawProp) ? rawProp : 'Home / Villa';
      const cams = VALID_CAM_OPTIONS.includes(rawCams) ? rawCams : '4 Cameras';

      isSubmitting = true;

      // Construct clean, secure WhatsApp message text
      const waMessage = 
        `🚨 *NEW CCTV INSTALLATION INQUIRY*\n` +
        `━━━━━━━━━━━━━━━━━━━━━\n` +
        `👤 *Name:* ${name}\n` +
        `📞 *Contact:* ${phone}\n` +
        `🏠 *Property:* ${prop}\n` +
        `📹 *Cameras Needed:* ${cams}\n` +
        `📍 *Location:* ${addr || 'Not specified'}\n` +
        `📝 *Notes/Requirements:* ${notes || 'None provided'}\n` +
        `━━━━━━━━━━━━━━━━━━━━━\n` +
        `_Sent from MZ Smart CCTV Website_`;

      const waUrl = `https://wa.me/923074588344?text=${encodeURIComponent(waMessage)}`;

      // Visual feedback on button
      const origHtml = submitQuoteBtn ? submitQuoteBtn.innerHTML : '';
      if (submitQuoteBtn) {
        submitQuoteBtn.disabled = true;
        submitQuoteBtn.innerHTML = `<span>Connecting to WhatsApp...</span>`;
      }

      // Safe rendering of confirmation banner (zero XSS risk)
      if (formSuccess) {
        formSuccess.classList.add('visible');
        if (waSuccessText) {
          waSuccessText.textContent = ''; // Clear
          const confirmText = document.createTextNode('All details formatted! ');
          const fallbackLink = document.createElement('a');
          fallbackLink.href = waUrl;
          fallbackLink.target = '_blank';
          fallbackLink.rel = 'noopener noreferrer';
          fallbackLink.style.cssText = 'color:#0284c7; font-weight:700; text-decoration:underline; display:inline-block; margin-top:4px;';
          fallbackLink.textContent = 'Tap here if WhatsApp did not open automatically →';

          waSuccessText.appendChild(confirmText);
          waSuccessText.appendChild(document.createElement('br'));
          waSuccessText.appendChild(fallbackLink);
        }
      }

      // Open WhatsApp window safely
      setTimeout(function () {
        if (submitQuoteBtn) {
          submitQuoteBtn.disabled = false;
          submitQuoteBtn.innerHTML = origHtml;
        }
        isSubmitting = false;

        const newTab = window.open(waUrl, '_blank', 'noopener,noreferrer');
        if (!newTab || newTab.closed || typeof newTab.closed === 'undefined') {
          // Popup blocked fallback: redirect directly
          window.location.href = waUrl;
        }
      }, 500);
    });
  }
});

/* --------------------------------------------------------------------------
   7. GLOBAL PRESELECTION HELPERS (SANITIZED)
   -------------------------------------------------------------------------- */
window.preselectService = function (serviceName) {
  'use strict';
  const cleanName = String(serviceName || '').replace(/[<>'"\\;`]/g, '').trim().slice(0, 40);
  const quoteSection = document.getElementById('quote');
  const clientNotes = document.getElementById('clientNotes');
  if (clientNotes) clientNotes.value = `Interested in ${cleanName} security installation.`;
  if (quoteSection) {
    quoteSection.scrollIntoView({ behavior: 'smooth' });
    const nameInput = document.getElementById('clientName');
    if (nameInput) setTimeout(() => nameInput.focus(), 400);
  }
};

window.preselectPackage = function (packageName) {
  'use strict';
  const cleanPkg = String(packageName || '').replace(/[<>'"\\;`]/g, '').trim().slice(0, 40);
  const quoteSection = document.getElementById('quote');
  const clientNotes = document.getElementById('clientNotes');
  if (clientNotes) clientNotes.value = `Selected Package: ${cleanPkg}. Please confirm survey timing.`;
  if (quoteSection) {
    quoteSection.scrollIntoView({ behavior: 'smooth' });
    const nameInput = document.getElementById('clientName');
    if (nameInput) setTimeout(() => nameInput.focus(), 400);
  }
};
