import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { useScreenSize } from '../index';

const Navbar = ({ setOpenNavbar, openNavbar }: any) => {
  const screenSize = useScreenSize();

  const handleOpenNavbar = () => {
    const navbar = document.querySelector(
      '.navbar-toggler-icon'
    ) as HTMLElement;
    navbar.classList.toggle('active');
    setOpenNavbar(!openNavbar);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const navbar = document.querySelector(
        '.navbar-toggler-icon'
      ) as HTMLElement;

      if (!openNavbar && navbar.classList.contains('active')) {
        navbar.classList.remove('active');
      }
    }
  }, [openNavbar]);

  const navLinks = [
    { name: 'Pricing', to: '/pricing' },
    { name: 'About', to: '/about' },
    { name: 'Login', to: 'auth/login' }
  ];

  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 999 }}>
      <nav className='navbar_container'>
        {/* :::  logo  :::: */}
        <div>
          <Link href={'/'}>
            <a>
              <Image
                src='/assets/navbar/logo.svg'
                width={'152.67'}
                height={'40'}
              />
            </a>
          </Link>
        </div>

        {/*  eslint-disable-next-line multiline-ternary */}
        {screenSize.width > 820 ? (
          <>
            <ul>
              {navLinks.map((link: any, index: number) => (
                <Link key={index} href={link.to}>
                  <a className={link.name === 'Login' ? 'login' : ''}>
                    <li>{link.name}</li>
                  </a>
                </Link>
              ))}
              <Link href='auth/signup'>
                <a className='signup'>
                  <li>Sign up for free</li>
                </a>
              </Link>
            </ul>
          </>
        ) : (
          <div onClick={handleOpenNavbar}>
            <button
              className='navbar-toggler collapsed'
              type='button'
              data-toggle='collapse'
              data-target='#navbarContent'
              aria-expanded='false'
            >
              <span className='navbar-toggler-icon'></span>
            </button>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
