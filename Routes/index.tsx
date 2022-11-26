// Auth Routes*

export const authRoutes = [
  {
    name: 'EHR',
    to: '/dashboard/EHR',
    height: '18px',
    width: '18px',
    activeIcon: '/assets/dashboard/sidebar/ehr_active.svg',
    inactiveIcon: '/assets/dashboard/sidebar/ehr_inactive.svg'
  },
  {
    name: 'Telechat',
    to: '/dashboard/telechat',
    height: '20px',
    width: '20px',
    activeIcon: '/assets/dashboard/sidebar/telechat_active.svg',
    inactiveIcon: '/assets/dashboard/sidebar/telechat_inactive.svg'
  },
  {
    name: 'Pharmacy',
    to: '/dashboard/pharmacy',
    height: '20px',
    width: '18px',
    activeIcon: '/assets/dashboard/sidebar/pharmacy_active.svg',
    inactiveIcon: '/assets/dashboard/sidebar/pharmacy_inactive.svg'
  },
  {
    name: 'Patients',
    to: '/dashboard/patients',
    height: '16px',
    width: '22px',
    activeIcon: '/assets/dashboard/sidebar/patients_active.svg',
    inactiveIcon: '/assets/dashboard/sidebar/patients_inactive.svg'
  }
];

export const userRoutes = [
  {
    name: 'Profile',
    to: '/dashboard/profile',
    height: '20px',
    width: '16px',
    activeIcon: '/assets/dashboard/sidebar/profile_active.svg',
    inactiveIcon: '/assets/dashboard/sidebar/profile_inactive.svg'
  },
  {
    name: 'Subscription & payment',
    to: '/dashboard/payments',
    height: '16px',
    width: '20px',
    activeIcon: '/assets/dashboard/sidebar/subscription_active.svg',
    inactiveIcon: '/assets/dashboard/sidebar/subscription_inactive.svg'
  }
];
