/* ============================================================================
   STEVENS FITNESS — Site configuration
   ----------------------------------------------------------------------------
   THIS IS THE ONLY FILE YOU NEED TO EDIT FOR DAY-TO-DAY UPDATES.
   Change a number here and it updates everywhere on the site automatically.
   ========================================================================= */

const SITE = {

  /* --- Business basics --------------------------------------------------- */
  name:  'Stevens Fitness',
  email: 'REPLACE@EMAIL.COM',
  phone: '(555) 555-5555',
  instagram: 'stevensfitness',          // handle only, no @
  responseTime: 'Usually respond within a day.',

  /* --- Roster ------------------------------------------------------------ */
  // The scarcity pitch. Update `filled` as clients join.
  roster: {
    total:  12,
    filled: 7,
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
        { time: '10:00 – 11:00 AM', capacity: 3, taken: 3 },
        { time: '11:00 – 12:00 PM', capacity: 3, taken: 1 },
        { time: '12:00 – 1:00 PM',  capacity: 3, taken: 2 },
      ],
    },
    {
      day: 'Monday – Friday',
      note: 'Evening session',
      slots: [
        { time: '7:00 – 8:00 PM', capacity: 3, taken: 1 },
      ],
    },
  ],
};

// Make it available to main.js
window.SITE = SITE;
