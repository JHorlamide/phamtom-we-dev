import { useEffect } from "react";
import { useRouter } from "next/router";
import { removeRedirectTo } from "../../../services/localService";
import { useSelector } from "react-redux";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import styles from "../../../styles/dashboard/Layout.module.scss";

const DashboardLayout = ({ children }: any) => {
  const { push } = useRouter();
  const { admin } = useSelector((state: any) => state.adminReducer);

  if (Object.keys(admin).length < 1) {
    push("/auth/login");
  }

  const handleCloseSidebar = () => {
    const sidebar: any = document.getElementById(
      "SIDEBAR_CONTAINER"
    ) as HTMLElement;
    if (sidebar.classList.contains("open_sidebar")) {
      sidebar.classList.remove("open_sidebar");
    }
  };

  useEffect(() => {
    removeRedirectTo();
  }, []);

  return (
    <div>
      <Navbar />

      <Sidebar />

      <div
        onClick={handleCloseSidebar}
        className={styles.dashboard_layout_body}
      >
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
