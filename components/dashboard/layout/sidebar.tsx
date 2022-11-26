import { useRef } from 'react';
import styles from '../../../styles/dashboard/Sidebar.module.scss';
import { setAdmin } from '../../../redux/actions/admin';
import { useDispatch } from 'react-redux';
import { removeToken } from '../../../services/localService';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { authRoutes, userRoutes } from '../../../Routes';

const Sidebar = () => {
  const { pathname, push } = useRouter();
  const Ref: any = useRef();
  const dispatch = useDispatch();

  const handleLogout = () => {
    removeToken();
    dispatch(setAdmin({}));
    push('/auth/login');
  };

  return (
    <aside
      ref={Ref}
      id='SIDEBAR_CONTAINER'
      className={styles.sidebar_container}
    >
      <div className={styles.logo}>
        <Image
          src='/assets/navbar/logo.svg'
          alt='logo'
          width={'152.67px'}
          height={'40px'}
        />
      </div>

      <div className={styles.routes_container}>
        <ul className={styles.routes}>
          {authRoutes.map((route: any, index: any) => (
            <li
              key={index}
              className={
                pathname === route.to
                  ? styles.active_route
                  : styles.inactive_route
              }
            >
              <Link href={route.to}>
                <a>
                  <>
                    {
                      // eslint-disable-next-line multiline-ternary
                      pathname === route.to ? (
                        <Image
                          src={route.activeIcon}
                          alt='icon'
                          width={route.width}
                          height={route.height}
                        />
                      ) : (
                        <Image
                          src={route.inactiveIcon}
                          alt='icon'
                          width={route.width}
                          height={route.height}
                        />
                      )
                    }
                  </>

                  <p>{route.name}</p>
                </a>
              </Link>
            </li>
          ))}
        </ul>

        <hr />
        <ul className={styles.routes}>
          {userRoutes.map((route: any, index: any) => (
            <li
              key={index}
              className={
                pathname === route.to
                  ? styles.active_route
                  : styles.inactive_route
              }
            >
              <Link href={route.to}>
                <a>
                  <>
                    {
                      // eslint-disable-next-line multiline-ternary
                      pathname === route.to ? (
                        <Image
                          src={route.activeIcon}
                          alt='icon'
                          width={route.width}
                          height={route.height}
                        />
                      ) : (
                        <Image
                          src={route.inactiveIcon}
                          alt='icon'
                          width={route.width}
                          height={route.height}
                        />
                      )
                    }
                  </>

                  <span>{route.name}</span>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div onClick={handleLogout} className={styles.logout}>
        <Image
          src='/assets/dashboard/sidebar/logout.svg'
          width={'20px'}
          height={'18px'}
          layout='fixed'
        />

        <p>Log out</p>
      </div>
    </aside>
  );
};

export default Sidebar;
