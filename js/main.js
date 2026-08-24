/* ============================================================================
   STEVENS FITNESS — Site behavior
   Reads values from js/config.js (loaded first) and renders them into the page.
   ========================================================================= */

(function () {
  'use strict';

  const cfg = window.SITE || {};

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    highlightCurrentNav();
    setupMobileNav();
    setupReveal();
    renderRoster();
    renderSchedule();
    renderPricing();
    renderContactDetails();
    setupForm();
    setYear();
  }

  /* ------------------------------------------------------------------------
     Nav: mark the current page
     --------------------------------------------------------------------- */
  function highlightCurrentNav() {
    const path = window.location.pathname.replace(/\/$/, '') || '/index.html';
    const current = path.split('/').pop() || 'index.html';

    document.querySelectorAll('.nav__link, .mobile-nav__list a').forEach((link) => {
      const href = (link.getAttribute('href') || '').split('/').pop();
      if (href && href === current) link.setAttribute('aria-current', 'page');
    });
  }

  /* ------------------------------------------------------------------------
     Mobile nav toggle
     --------------------------------------------------------------------- */
  function setupMobileNav() {
    const toggle = document.querySelector('.nav-toggle');
    const panel  = document.getElementById('mobile-nav');
    if (!toggle || !panel) return;

    toggle.addEventListener('click', () => {
      const open = !panel.hidden;
      panel.hidden = open;
      toggle.setAttribute('aria-expanded', String(!open));
      toggle.setAttribute('aria-label', open ? 'Open menu' : 'Close menu');
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !panel.hidden) {
        panel.hidden = true;
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }

  /* ------------------------------------------------------------------------
     Scroll reveal
     --------------------------------------------------------------------- */
  function setupReveal() {
    let els = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
    if (!els.length) return;

    const showAll = function () {
      els.forEach(function (el) { el.classList.add('is-visible'); });
      els = [];
    };

    // Anyone who prefers reduced motion just gets the content.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      showAll();
      return;
    }

    // Simple rect check — no IntersectionObserver quirks, works everywhere.
    let ticking = false;
    const check = function () {
      ticking = false;
      const limit = window.innerHeight - 40;
      els = els.filter(function (el) {
        if (el.getBoundingClientRect().top < limit) {
          el.classList.add('is-visible');
          return false;
        }
        return true;
      });
      if (!els.length) teardown();
    };

    const onScroll = function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(check);
    };

    function teardown() {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    check();

    // Safety net: a visitor must never be left staring at a blank section.
    // If anything is still hidden shortly after load, just show it.
    window.addEventListener('load', function () {
      setTimeout(function () { if (els.length) check(); }, 300);
    });
  }

  /* ------------------------------------------------------------------------
     Roster status  —  "7 / 12 spots filled"
     --------------------------------------------------------------------- */
  function renderRoster() {
    const host = document.querySelector('[data-roster]');
    if (!host || !cfg.roster) return;

    const { filled, total } = cfg.roster;
    const isFull = filled >= total;

    // Any "12" printed in copy stays in sync with the config
    document.querySelectorAll('[data-roster-total]').forEach(function (el) {
      el.textContent = total;
    });

    host.innerHTML = isFull
      ? '<b>Full</b> — join the waitlist'
      : '<b>' + filled + '</b> / ' + total + ' spots filled';

    // Swap the CTA copy when the roster is full
    document.querySelectorAll('[data-roster-cta]').forEach((el) => {
      if (isFull) el.textContent = 'Join the waitlist';
    });
  }

  /* ------------------------------------------------------------------------
     Schedule  —  builds slot chips from config
     --------------------------------------------------------------------- */
  function renderSchedule() {
    if (!Array.isArray(cfg.schedule)) return;

    const host = document.querySelector('[data-schedule]');
    if (host) host.innerHTML = cfg.schedule.map(function (group) {
      const chips = group.slots.map(function (slot) {
        const open = Math.max(0, slot.capacity - slot.taken);
        const full = open === 0;
        return '' +
          '<div class="slot' + (full ? ' slot--full' : '') + '">' +
            '<span class="slot__time">' + esc(slot.time) + '</span>' +
            '<span class="slot__spots">' +
              (full ? 'Full' : open + (open === 1 ? ' spot open' : ' spots open')) +
            '</span>' +
          '</div>';
      }).join('');

      return '' +
        '<div class="slot-group">' +
          '<p class="slot-group__day">' + esc(group.day) +
            (group.note ? ' · ' + esc(group.note) : '') +
          '</p>' +
          '<div class="slots">' + chips + '</div>' +
        '</div>';
    }).join('');

    // Also fill the contact form's time-block dropdown
    const select = document.querySelector('[data-slot-options]');
    if (select) {
      const opts = ['<option value="">Select a time…</option>'];
      cfg.schedule.forEach(function (group) {
        group.slots.forEach(function (slot) {
          const open = Math.max(0, slot.capacity - slot.taken);
          opts.push(
            '<option value="' + esc(slot.time) + '">' +
              esc(slot.time) + (open === 0 ? ' (waitlist)' : '') +
            '</option>'
          );
        });
      });
      opts.push('<option value="flexible">I\'m flexible</option>');
      select.innerHTML = opts.join('');
    }
  }

  /* ------------------------------------------------------------------------
     Pricing
     --------------------------------------------------------------------- */
  function renderPricing() {
    if (!cfg.pricing) return;

    document.querySelectorAll('[data-price]').forEach(function (el) {
      el.textContent = '$' + cfg.pricing.amount;
    });
    document.querySelectorAll('[data-price-period]').forEach(function (el) {
      el.textContent = cfg.pricing.period;
    });
    document.querySelectorAll('[data-price-note]').forEach(function (el) {
      el.textContent = cfg.pricing.note;
    });

    const list = document.querySelector('[data-price-includes]');
    if (list && Array.isArray(cfg.pricing.includes)) {
      list.innerHTML = cfg.pricing.includes
        .map(function (item) { return '<li>' + esc(item) + '</li>'; })
        .join('');
    }
  }

  /* ------------------------------------------------------------------------
     Contact details sprinkled through the footer / contact page
     --------------------------------------------------------------------- */
  function renderContactDetails() {
    document.querySelectorAll('[data-email]').forEach(function (el) {
      el.textContent = cfg.email || '';
      if (el.tagName === 'A') el.href = 'mailto:' + (cfg.email || '');
    });
    document.querySelectorAll('[data-phone]').forEach(function (el) {
      el.textContent = cfg.phone || '';
      if (el.tagName === 'A') el.href = 'tel:' + String(cfg.phone || '').replace(/[^\d+]/g, '');
    });
    document.querySelectorAll('[data-instagram]').forEach(function (el) {
      el.textContent = '@' + (cfg.instagram || '');
      if (el.tagName === 'A') el.href = 'https://instagram.com/' + (cfg.instagram || '');
    });
    document.querySelectorAll('[data-response-time]').forEach(function (el) {
      el.textContent = cfg.responseTime || '';
    });
  }

  /* ------------------------------------------------------------------------
     Inquiry form
     ------------------------------------------------------------------------
     Right now this validates and shows a confirmation, but does NOT send.
     To make it send for real:
       1. Create a free form at https://formspree.io
       2. Put your endpoint on the <form> as action="https://formspree.io/f/XXXX"
          and method="POST"
       3. Delete the e.preventDefault() line below.
     --------------------------------------------------------------------- */
  function setupForm() {
    const form = document.querySelector('[data-inquiry-form]');
    if (!form) return;

    const status = form.querySelector('[data-form-status]');

    form.addEventListener('submit', function (e) {
      e.preventDefault();   // <-- remove this once a real endpoint is wired up

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const name = (form.querySelector('#name') || {}).value || 'there';

      if (status) {
        status.hidden = false;
        status.innerHTML =
          '<strong>Thanks, ' + esc(name.split(' ')[0]) + '.</strong> ' +
          'Your inquiry is ready to send — but the form isn\'t connected to an ' +
          'email service yet. See the setup note in <code>js/main.js</code>.';
        status.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

  /* ------------------------------------------------------------------------
     Helpers
     --------------------------------------------------------------------- */
  function setYear() {
    document.querySelectorAll('[data-year]').forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  function esc(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

})();
