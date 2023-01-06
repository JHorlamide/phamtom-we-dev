// Auth Routes*

export const authRoutes = [
  {
    name: 'EHR',
    to: '/dashboard/EHR',
    height: '18px',
    width: '18px',
    activeIcon: '/assets/dashboard/sidebar/ehr_active.svg',
    inactiveIcon: '/assets/dashboard/sidebar/ehr_inactive.svg',
    alt: ''
  },
  {
    name: 'Staffs',
    to: '/dashboard/staffs',
    height: '20px',
    width: '20px',
    activeIcon: '/assets/dashboard/sidebar/patients_active.svg',
    inactiveIcon: '/assets/dashboard/sidebar/patients_inactive.svg',
    alt: ''
  },
  {
    name: 'Pharmacy',
    to: '/dashboard/pharmacy',
    height: '20px',
    width: '18px',
    activeIcon: '/assets/dashboard/sidebar/pharmacy_active.svg',
    inactiveIcon: '/assets/dashboard/sidebar/pharmacy_inactive.svg',
    alt: '/dashboard/pharmacy/products'
  },
  {
    name: 'Patients',
    to: '/dashboard/patients',
    height: '16px',
    width: '22px',
    activeIcon: '/assets/dashboard/sidebar/patients_active.svg',
    inactiveIcon: '/assets/dashboard/sidebar/patients_inactive.svg',
    alt: ''
  }
];

export const userRoutes = [
  {
    name: 'Profile',
    to: '/dashboard/profile',
    height: '20px',
    width: '16px',
    activeIcon: '/assets/dashboard/sidebar/profile_active.svg',
    inactiveIcon: '/assets/dashboard/sidebar/profile_inactive.svg',
    alt: ''
  },
  {
    name: 'Subscription',
    to: '/dashboard/payments',
    height: '16px',
    width: '20px',
    activeIcon: '/assets/dashboard/sidebar/subscription_active.svg',
    inactiveIcon: '/assets/dashboard/sidebar/subscription_inactive.svg',
    alt: ''
  }
];
