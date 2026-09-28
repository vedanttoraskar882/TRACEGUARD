/**
 * TRACEGUARD - Unified Weld-Quality and Site-Safety Evidence Platform
 * Frontend Controller (Vanilla JavaScript)
 * Strictly client-side, zero backend / zero database
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initFaqAccordion();
  initPilotModal();
  initHeroPreviewToggle();
  initPlatformTabs();
  initEvidenceChainInteraction();
  initSubmissionsViewer();
});

/* ==========================================================================
   1. MOBILE NAVIGATION
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
  };

  const closeMenu = () => {
    mobileMenu.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  };

  menuBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

/* ==========================================================================
   2. FAQ ACCORDION
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

      // Close all other items for clean accordion effect
      faqItems.forEach(otherItem => {
        const otherContent = otherItem.querySelector('.faq-content');
        const otherIcon = otherItem.querySelector('.faq-icon');
        if (otherContent && otherContent !== content) {
          otherContent.classList.add('hidden');
          if (otherIcon) {
            otherIcon.classList.remove('rotate-180');
          }
          otherItem.classList.remove('border-blue-600', 'bg-blue-50/40');
        }
      });

      // Toggle current
      if (isOpen) {
        content.classList.add('hidden');
        if (icon) icon.classList.remove('rotate-180');
        item.classList.remove('border-blue-600', 'bg-blue-50/40');
      } else {
        content.classList.remove('hidden');
        if (icon) icon.classList.add('rotate-180');
        item.classList.add('border-blue-600', 'bg-blue-50/40');
      }
    });
  });
}

/* ==========================================================================
   3. HERO VISUAL PREVIEW TOGGLE (Quality vs Safety Lane)
   ========================================================================== */
function initHeroPreviewToggle() {
  const toggleQuality = document.getElementById('heroToggleQuality');
  const toggleSafety = document.getElementById('heroToggleSafety');
  const viewQuality = document.getElementById('heroViewQuality');
  const viewSafety = document.getElementById('heroViewSafety');

  if (!toggleQuality || !toggleSafety || !viewQuality || !viewSafety) return;

  toggleQuality.addEventListener('click', () => {
    toggleQuality.classList.add('bg-blue-600', 'text-white', 'shadow-sm');
    toggleQuality.classList.remove('text-slate-400', 'hover:text-white');

    toggleSafety.classList.remove('bg-blue-600', 'text-white', 'shadow-sm');
    toggleSafety.classList.add('text-slate-400', 'hover:text-white');

    viewQuality.classList.remove('hidden');
    viewSafety.classList.add('hidden');
  });

  toggleSafety.addEventListener('click', () => {
    toggleSafety.classList.add('bg-blue-600', 'text-white', 'shadow-sm');
    toggleSafety.classList.remove('text-slate-400', 'hover:text-white');

    toggleQuality.classList.remove('bg-blue-600', 'text-white', 'shadow-sm');
    toggleQuality.classList.add('text-slate-400', 'hover:text-white');

    viewSafety.classList.remove('hidden');
    viewQuality.classList.add('hidden');
  });
}

/* ==========================================================================
   4. PLATFORM MODULES FILTER / TABS
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
      });

      btn.classList.add('bg-blue-600', 'text-white', 'shadow-md');
      btn.classList.remove('bg-slate-100', 'text-slate-700', 'hover:bg-slate-200');

      // Filter or highlight cards
      moduleCards.forEach(card => {
        if (targetModule === 'all' || card.dataset.module === targetModule) {
          card.classList.remove('opacity-25', 'grayscale', 'scale-95');
          card.classList.add('opacity-100', 'scale-100');
          card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
          card.classList.add('opacity-25', 'grayscale', 'scale-95');
          card.classList.remove('opacity-100', 'scale-100');
        }
      });
    });
  });
}

/* ==========================================================================
   5. DIGITAL EVIDENCE CHAIN INTERACTION
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

  chainNodes.forEach(node => {
    node.addEventListener('mouseenter', () => {
      const stepKey = node.dataset.step;
      const data = nodeDetails[stepKey];
      if (data) {
        chainNodes.forEach(n => n.classList.remove('ring-2', 'ring-blue-600', 'bg-blue-50/50'));
        node.classList.add('ring-2', 'ring-blue-600', 'bg-blue-50/50');
        chainSummary.innerHTML = `
          <div class="flex items-center justify-between gap-3 mb-2 flex-wrap">
            <span class="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-blue-100 text-blue-800">${data.badge}</span>
            <span class="text-xs text-slate-400">Live Chain Connection: ACTIVE</span>
          </div>
          <h4 class="font-bold text-slate-900 text-base mb-1">${data.title}</h4>
          <p class="text-sm text-slate-600 leading-relaxed">${data.detail}</p>
        `;
      }
    });
  });
}

/* ==========================================================================
   6. REQUEST A PILOT MODAL & LOCALSTORAGE ENGINE
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
    
    // Optionally pre-select context note
    const contextInput = document.getElementById('formInterestedModule');
    if (contextInput && contextPlan) {
      contextInput.value = contextPlan;
    }
    
    // Ensure form is visible, success box hidden
    if (formBox) formBox.classList.remove('hidden');
    if (successBox) successBox.classList.add('hidden');
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

    const fullName = document.getElementById('fullName').value.trim();
    const phoneNumber = document.getElementById('phoneNumber').value.trim();
    const email = document.getElementById('email').value.trim();
    const organisationName = document.getElementById('organisationName').value.trim();

    // Basic client validation
    if (!fullName || !phoneNumber || !email || !organisationName) {
      alert('Please fill in all required fields.');
      return;
    }

    // Submission Date/Time
    const now = new Date();
    const submissionDateTime = now.toISOString();

    const newSubmission = {
      fullName,
      phoneNumber,
      email,
      organisationName,
      submissionDateTime
    };

    // Save to localStorage strictly adhering to instructions:
    // - Store submissions inside browser localStorage.
    // - Save multiple submissions.
    // - Never overwrite previous submissions.
    // - Add every new submission into an array.
    try {
      let existing = [];
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          existing = JSON.parse(stored);
          if (!Array.isArray(existing)) {
            existing = [];
          }
        } catch (err) {
          console.warn('Could not parse existing submissions, resetting to fresh array', err);
          existing = [];
        }
      }

      existing.push(newSubmission);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));

      // Show success screen
      if (formBox) formBox.classList.add('hidden');
      if (successBox) successBox.classList.remove('hidden');

      // Populate success readout
      const summaryElem = document.getElementById('submissionSummaryText');
      if (summaryElem) {
        summaryElem.textContent = `Recorded for ${organisationName} (${fullName}) at ${new Date(submissionDateTime).toLocaleString('en-GB')}. Stored locally in browser.`;
      }

      form.reset();
      updateSubmissionsDrawerUI();
    } catch (err) {
      console.error('Storage error:', err);
      alert('Could not write to localStorage. Please check browser storage permissions.');
    }
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (successBox) successBox.classList.add('hidden');
      if (formBox) formBox.classList.remove('hidden');
    });
  }
}

/* ==========================================================================
   7. LOCAL STORAGE SUBMISSIONS VIEWER (Verification & Inspection Drawer)
   ========================================================================== */
function initSubmissionsViewer() {
  const toggleBtn = document.getElementById('toggleStorageViewerBtn');
  const drawer = document.getElementById('storageViewerDrawer');
  const closeBtn = document.getElementById('closeStorageViewerBtn');
  const clearBtn = document.getElementById('clearStorageBtn');

  if (!drawer) return;

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      drawer.classList.toggle('hidden');
      updateSubmissionsDrawerUI();
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      drawer.classList.add('hidden');
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to clear all pilot submissions stored in this browser?')) {
        localStorage.removeItem(STORAGE_KEY);
        updateSubmissionsDrawerUI();
      }
    });
  }

  updateSubmissionsDrawerUI();
}

function updateSubmissionsDrawerUI() {
  const outputElem = document.getElementById('storageViewerOutput');
  const countBadge = document.getElementById('storageCountBadge');
  if (!outputElem) return;

  let submissions = [];
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      submissions = JSON.parse(stored);
    } catch (e) {
      submissions = [];
    }
  }

  if (countBadge) {
    countBadge.textContent = submissions.length;
  }

  if (submissions.length === 0) {
    outputElem.innerHTML = `
      <div class="p-6 text-center text-slate-400">
        <svg class="w-8 h-8 mx-auto mb-2 text-slate-400 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
        </svg>
        <p class="text-sm">No pilot requests stored yet.</p>
        <p class="text-xs text-slate-400 mt-1">Submit the "Request a Pilot" form to see live entries populate here.</p>
      </div>
    `;
    return;
  }

  outputElem.innerHTML = `
    <pre class="bg-slate-900 text-emerald-400 p-4 rounded-lg text-xs overflow-x-auto font-mono max-h-80 leading-relaxed">${JSON.stringify(submissions, null, 2)}</pre>
  `;
}
