import styles from '../../../styles/dashboard/Navbar.module.scss';
import Image from 'next/image';
import useScreenSize from '../../useScreenSize';
import { useSelector } from 'react-redux';
import Link from 'next/link';
const Navbar = () => {
  const screenSize = useScreenSize();
  const { admin } = useSelector((state: any) => state.adminReducer);
  const handleOpenSidebar = () => {
    const sidebar: any = document.getElementById(
      'SIDEBAR_CONTAINER'
    ) as HTMLElement;
    sidebar.classList.add('open_sidebar');
  };

  var getInitials = function (data : string) {
    var names = data?.split(' '),
        initials = names?.[0]?.substring(0, 1).toUpperCase();
    
    if (names?.length > 1) {
        initials += names?.[names?.length - 1]?.substring(0, 1).toUpperCase();
    }
    return initials;
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
          <Link href='profile'>
            {
              admin?.profile_image ?
              <Image
                src={admin?.profile_image}
                width={'40px'}
                height={'40px'}
              />
              :
              <div className={styles.flex_end_initials}>
                <p>{getInitials(`${admin?.name_of_institution}`)}</p>
              </div>
            }
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
