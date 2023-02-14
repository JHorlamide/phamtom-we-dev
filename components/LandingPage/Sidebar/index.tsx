import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
const Sidebar = ({ setOpenSidebar }: any) => {
  const { pathname } = useRouter();

  const navLinks = [
    { name: 'Pricing', to: '/pricing' },
    { name: 'About', to: '/about' },
    { name: 'Login', to: '/auth/login' }
  ];

  return (
    <div className='navlinks_container'>
      <ul>
        {navLinks.map((link: any, index: number) => (
          <Link key={index} href={link.to}>
            <a
              onClick={() => setOpenSidebar(false)}
              className={`${link.name === 'Login' && 'login'} ${
                pathname.includes(link.to) ? 'activeRoute' : ''
              }`}
            >
              <li>{link.name}</li>
            </a>
          </Link>
        ))}
      </ul>
      <Link href='/auth/signup'>
        <a className='signup'>
          <p>Sign up for free</p>
        </a>
      </Link>
    </div>
  );
};

export default Sidebar;
