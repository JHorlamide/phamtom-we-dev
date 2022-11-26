import styles from '../../../styles/dashboard/Navbar.module.scss';
import Image from 'next/image';
import useScreenSize from '../../useScreenSize';
const Navbar = () => {
  const screenSize = useScreenSize();

  const handleOpenSidebar = () => {
    const sidebar: any = document.getElementById(
      'SIDEBAR_CONTAINER'
    ) as HTMLElement;
    sidebar.classList.add('open_sidebar');
  };

  return (
    <nav className={styles.navbar_container}>
      {screenSize.width <= 921 && (
        <div onClick={handleOpenSidebar}>
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

      <div className={styles.flex_end}>
        <div>
          <Image
            src='/assets/dashboard/bell.svg'
            alt='logo'
            width={'19.94px'}
            height={'19.94px'}
          />
        </div>

        <div>
          <Image
            src='/assets/dashboard/avatar.svg'
            alt='user'
            width={'40px'}
            height={'40px'}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
