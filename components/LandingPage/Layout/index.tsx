import { useState } from 'react';
import { Navbar, Sidebar, Footer } from '../index';

const Layout = ({ children }: any) => {
  const [openNavbar, setOpenNavbar] = useState(false);

  return (
    <div>
      <Navbar setOpenNavbar={setOpenNavbar} openNavbar={openNavbar} />

      {openNavbar && (
        <aside className='sidebar_container'>
          <Sidebar setOpenSidebar={setOpenNavbar} />
        </aside>
      )}

      <div>{children}</div>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
