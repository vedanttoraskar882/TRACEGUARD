/**
 * TRACEGUARD - Unified Weld-Quality and Site-Safety Evidence Platform
 * Frontend Interactive Controller (Vanilla JavaScript)
 * Strictly client-side, zero backend / zero database
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initActiveNavHighlight();
  initScrollReveals();
  initMobileNav();
  initHeroPreviewToggle();
  initPlatformTabs();
  initEvidenceChainInteraction();
  initFaqAccordion();
  initPilotModal();
});

/* ==========================================================================
   1. STICKY HEADER COMPACT & SCROLL ELEVATION
   ========================================================================== */
function initStickyHeader() {
  const header = document.querySelector('header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('header-compact');
    } else {
      header.classList.remove('header-compact');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ==========================================================================
   2. ACTIVE NAVIGATION HIGHLIGHT ON SCROLL
   ========================================================================== */
function initActiveNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav-link');

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('text-blue-600', 'font-bold');
            link.classList.remove('text-slate-600');
          } else {
            link.classList.remove('text-blue-600', 'font-bold');
            link.classList.add('text-slate-600');
          }
        });
      }
    });
  }, {
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  });

  sections.forEach(section => observer.observe(section));
}

/* ==========================================================================
   3. SCROLL REVEAL ANIMATIONS (IntersectionObserver)
   ========================================================================== */
function initScrollReveals() {
  // If user prefers reduced motion, skip animations
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.reveal-init').forEach(el => {
      el.classList.add('reveal-visible');
    });
    return;
  }

  const reveals = document.querySelectorAll('.reveal-init');
  if (!reveals.length) return;

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        observer.unobserve(entry.target); // Reveal only once
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach(el => revealObserver.observe(el));
}

/* ==========================================================================
   4. MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initMobileNav() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const closeBtn = document.getElementById('closeMobileMenuBtn');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  if (!menuBtn || !mobileMenu) return;

  const openMenu = () => {
    mobileMenu.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
    if (closeBtn) closeBtn.focus();
  };

  const closeMenu = () => {
    mobileMenu.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
    menuBtn.focus();
  };

  menuBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on backdrop click
  mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) closeMenu();
  });

  // Escape key closes mobile menu
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
      closeMenu();
    }
  });
}

/* ==========================================================================
   5. HERO VISUAL PREVIEW TOGGLE (Quality Lane vs Safety Lane)
   ========================================================================== */
function initHeroPreviewToggle() {
  const toggleQuality = document.getElementById('heroToggleQuality');
  const toggleSafety = document.getElementById('heroToggleSafety');
  const viewQuality = document.getElementById('heroViewQuality');
  const viewSafety = document.getElementById('heroViewSafety');

  if (!toggleQuality || !toggleSafety || !viewQuality || !viewSafety) return;

  const setQuality = () => {
    toggleQuality.classList.add('bg-blue-600', 'text-white', 'shadow-sm');
    toggleQuality.classList.remove('text-slate-400', 'hover:text-white');

    toggleSafety.classList.remove('bg-blue-600', 'text-white', 'shadow-sm');
    toggleSafety.classList.add('text-slate-400', 'hover:text-white');

    viewQuality.classList.remove('hidden');
    viewSafety.classList.add('hidden');
  };

  const setSafety = () => {
    toggleSafety.classList.add('bg-blue-600', 'text-white', 'shadow-sm');
    toggleSafety.classList.remove('text-slate-400', 'hover:text-white');

    toggleQuality.classList.remove('bg-blue-600', 'text-white', 'shadow-sm');
    toggleQuality.classList.add('text-slate-400', 'hover:text-white');

    viewSafety.classList.remove('hidden');
    viewQuality.classList.add('hidden');
  };

  toggleQuality.addEventListener('click', setQuality);
  toggleSafety.addEventListener('click', setSafety);
}

/* ==========================================================================
   6. PLATFORM MODULES FILTER / TABS
   ========================================================================== */
function initPlatformTabs() {
  const tabButtons = document.querySelectorAll('.platform-tab-btn');
  const moduleCards = document.querySelectorAll('.platform-module-card');

  if (!tabButtons.length || !moduleCards.length) return;

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetModule = btn.dataset.module;

      // Update button styles
      tabButtons.forEach(b => {
        b.classList.remove('bg-blue-600', 'text-white', 'shadow-md');
        b.classList.add('bg-slate-100', 'text-slate-700', 'hover:bg-slate-200');
        b.setAttribute('aria-selected', 'false');
      });

      btn.classList.add('bg-blue-600', 'text-white', 'shadow-md');
      btn.classList.remove('bg-slate-100', 'text-slate-700', 'hover:bg-slate-200');
      btn.setAttribute('aria-selected', 'true');

      // Filter cards
      moduleCards.forEach(card => {
        if (targetModule === 'all' || card.dataset.module === targetModule) {
          card.classList.remove('opacity-25', 'grayscale', 'scale-98');
          card.classList.add('opacity-100', 'scale-100');
          card.style.display = '';
        } else {
          card.classList.add('opacity-25', 'grayscale', 'scale-98');
          card.classList.remove('opacity-100', 'scale-100');
        }
      });
    });
  });
}

/* ==========================================================================
   7. DIGITAL EVIDENCE CHAIN INTERACTION
   ========================================================================== */
function initEvidenceChainInteraction() {
  const chainNodes = document.querySelectorAll('.chain-step-card');
  const chainSummary = document.getElementById('chainDynamicSummary');

  if (!chainNodes.length || !chainSummary) return;

  const nodeDetails = {
    'task': {
      title: 'Task Entity #TG-7402',
      detail: 'Generated via supervisor QR code at Bay 4. Work item: BS EN 1090-2 Execution Class 3 structural girder weld.',
      badge: 'QR-Linked Work Order'
    },
    'worker': {
      title: 'Worker ID #W-894 (T. Evans)',
      detail: 'CSCS Gold Card certified | ISO 9606-1 Qualified Welder (MIG/MAG 135) | Medical & Safety Induction Valid.',
      badge: 'Skill-Verified Labour'
    },
    'location': {
      title: 'Location & Work Environment',
      detail: 'West Pier Pierhead Fabrication Yard, Sector B | GPS & Indoor Beacon Tagged | Monitored Hot-Work Zone.',
      badge: 'Geo-Anchored Asset'
    },
    'date': {
      title: 'Timestamp & Duration Record',
      detail: 'Shift Allocated: 28-09-2026 07:45 | Work Commenced: 08:15 | Sign-Off: 14:30 | Offline Local Cache Validated.',
      badge: 'Immutable Timeline'
    },
    'evidence': {
      title: 'Unified Compliance Pack Output',
      detail: 'Macro weld photographs, 100% MPI visual inspection pass, signed RAMS sheet, plant inspection logs combined into one audit record.',
      badge: '100% Audit-Proof Chain'
    }
  };

  const updateCard = (stepKey, node) => {
    const data = nodeDetails[stepKey];
    if (data) {
      chainNodes.forEach(n => n.classList.remove('ring-2', 'ring-blue-600', 'bg-blue-50/50'));
      node.classList.add('ring-2', 'ring-blue-600', 'bg-blue-50/50');
      chainSummary.innerHTML = `
        <div class="flex items-center justify-between gap-3 mb-2 flex-wrap">
          <span class="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-blue-100 text-blue-800">${data.badge}</span>
          <span class="text-xs text-slate-400">Live Chain Connection: ACTIVE</span>
        </div>
        <h4 class="font-bold text-white text-base mb-1">${data.title}</h4>
        <p class="text-sm text-slate-300 leading-relaxed">${data.detail}</p>
      `;
    }
  };

  chainNodes.forEach(node => {
    node.addEventListener('mouseenter', () => {
      const stepKey = node.dataset.step;
      updateCard(stepKey, node);
    });
    node.addEventListener('click', () => {
      const stepKey = node.dataset.step;
      updateCard(stepKey, node);
    });
  });
}

/* ==========================================================================
   8. FAQ ACCORDION (Accessible & Smooth)
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');
    const icon = item.querySelector('.faq-icon');

    if (!trigger || !content) return;

    trigger.addEventListener('click', () => {
      const isOpen = !content.classList.contains('hidden');

      // Close all others for a tidy accordion
      faqItems.forEach(otherItem => {
        const otherContent = otherItem.querySelector('.faq-content');
        const otherIcon = otherItem.querySelector('.faq-icon');
        const otherTrigger = otherItem.querySelector('.faq-trigger');
        if (otherContent && otherContent !== content) {
          otherContent.classList.add('hidden');
          if (otherIcon) otherIcon.classList.remove('rotate-180');
          if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
          otherItem.classList.remove('border-blue-500', 'bg-blue-50/30');
        }
      });

      // Toggle current
      if (isOpen) {
        content.classList.add('hidden');
        if (icon) icon.classList.remove('rotate-180');
        trigger.setAttribute('aria-expanded', 'false');
        item.classList.remove('border-blue-500', 'bg-blue-50/30');
      } else {
        content.classList.remove('hidden');
        if (icon) icon.classList.add('rotate-180');
        trigger.setAttribute('aria-expanded', 'true');
        item.classList.add('border-blue-500', 'bg-blue-50/30');
      }
    });
  });
}

/* ==========================================================================
   9. REQUEST A PILOT MODAL & LOCALSTORAGE ENGINE
   ========================================================================== */
const STORAGE_KEY = 'traceguard_pilot_submissions';

function initPilotModal() {
  const modal = document.getElementById('pilotModal');
  const openButtons = document.querySelectorAll('.open-pilot-modal');
  const closeButtons = document.querySelectorAll('.close-pilot-modal');
  const form = document.getElementById('pilotForm');
  const successBox = document.getElementById('pilotSuccessBox');
  const formBox = document.getElementById('pilotFormBox');
  const resetBtn = document.getElementById('pilotSubmitAnotherBtn');

  if (!modal || !form) return;

  const openModal = (contextPlan = '') => {
    modal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');

    const contextInput = document.getElementById('formInterestedModule');
    if (contextInput && contextPlan) {
      contextInput.value = contextPlan;
    }

    if (formBox) formBox.classList.remove('hidden');
    if (successBox) successBox.classList.add('hidden');

    // Auto-focus first input
    const firstInput = document.getElementById('fullName');
    if (firstInput) {
      setTimeout(() => firstInput.focus(), 100);
    }
  };

  const closeModal = () => {
    modal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  };

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const plan = btn.getAttribute('data-plan') || '';
      openModal(plan);
    });
  });

  closeButtons.forEach(btn => {
    btn.addEventListener('click', closeModal);
  });

  // Click outside backdrop to close
  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.classList.contains('modal-backdrop')) {
      closeModal();
    }
  });

  // Escape key to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });

  // Handle Form Submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const fullNameInput = document.getElementById('fullName');
    const phoneNumberInput = document.getElementById('phoneNumber');
    const emailInput = document.getElementById('email');
    const orgInput = document.getElementById('organisationName');

    const fullName = fullNameInput ? fullNameInput.value.trim() : '';
    const phoneNumber = phoneNumberInput ? phoneNumberInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const organisationName = orgInput ? orgInput.value.trim() : '';

    if (!fullName || !phoneNumber || !email || !organisationName) {
      alert('Please fill in all required fields.');
      return;
    }

    const submissionDateTime = new Date().toISOString();

    const newSubmission = {
      fullName,
      phoneNumber,
      email,
      organisationName,
      submissionDateTime
    };

    // Store submissions in browser localStorage array (never overwrite)
    try {
      let existing = [];
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          existing = JSON.parse(stored);
          if (!Array.isArray(existing)) existing = [];
        } catch (err) {
          existing = [];
        }
      }

      existing.push(newSubmission);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));

      // Display polished success view
      if (formBox) formBox.classList.add('hidden');
      if (successBox) successBox.classList.remove('hidden');

      const summaryElem = document.getElementById('submissionSummaryText');
      if (summaryElem) {
        summaryElem.textContent = `Thank you, ${fullName}. Your pilot request for ${organisationName} has been received. Our team will contact you shortly via ${email}.`;
      }

      form.reset();
    } catch (err) {
      console.error('Storage error:', err);
      alert('Could not record submission. Please check your browser storage settings.');
    }
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (successBox) successBox.classList.add('hidden');
      if (formBox) formBox.classList.remove('hidden');
      const firstInput = document.getElementById('fullName');
      if (firstInput) firstInput.focus();
    });
  }
}
