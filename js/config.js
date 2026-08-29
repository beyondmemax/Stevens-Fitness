/* ============================================================================
   S.S STRENGTH & CONDITIONING CLUB — Site configuration
   ----------------------------------------------------------------------------
   THIS IS THE ONLY FILE YOU NEED TO EDIT FOR DAY-TO-DAY UPDATES.
   Change a number here and it updates everywhere on the site automatically.
   ========================================================================= */

const SITE = {

  /* --- Business basics --------------------------------------------------- */
  name:  'S.S Strength & Conditioning Club',
  email: 'sjszwejkowski24@gmail.com',
  phone: 'REPLACE-PHONE-NUMBER',         // e.g. '(555) 555-5555'
  instagram: 'REPLACE-INSTAGRAM-HANDLE', // handle only, no @
  responseTime: 'Usually respond within a day.',

  /* --- Roster ------------------------------------------------------------ */
  // The scarcity pitch. `total` is the business's hard cap on clients.
  // `filled` is NOT set here — it's calculated automatically in main.js by
  // adding up every slot's `taken` value below, so the roster bar can never
  // drift out of sync with the actual schedule. Update a slot's `taken`
  // count and this number updates itself everywhere on the site.
  roster: {
    total: 12,
  },

  /* --- Pricing ----------------------------------------------------------- */
  pricing: {
    amount: 250,
    period: '/mo',
    note:   'Billed monthly · No long-term contract',
    includes: [
      'Recurring weekly time slot, held for you',
      'Semi-private coaching, max 3 clients per session',
      'Programming adjusted to your goals',
      'Cancel anytime, no long-term contract',
    ],
  },

  /* --- Schedule ---------------------------------------------------------- */
  // capacity = seats in that session. taken = how many are currently filled.
  schedule: [
    {
      day: 'Monday – Friday',
      note: 'Morning block',
      slots: [
        { time: '10:00 – 11:00 AM', capacity: 3, taken: 0 },
        { time: '11:00 – 12:00 PM', capacity: 3, taken: 0 },
        { time: '12:00 – 1:00 PM',  capacity: 3, taken: 0 },
      ],
    },
    {
      day: 'Monday – Friday',
      note: 'Evening session',
      slots: [
        { time: '7:00 – 8:00 PM', capacity: 3, taken: 0 },
      ],
    },
  ],
};

// Make it available to main.js
window.SITE = SITE;
