
import styles from "../../styles/auth/Auth.module.scss";
import Link from "next/link";
import Image from "next/image";

const ForgotPassword = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left}></div>
      <div className={styles.right}>
        <Link href={'/'}>
          <a>
            <div className={styles.return}>
              <Image
                src='/assets/dashboard/arrow_left.svg'
                alt='logo'
                width={'15px'}
                height={'19px'}
              />
              <p>Return to Homepage</p>
            </div>
          </a>
        </Link>

        <form className={styles.form}>
          <h1>Email confirmation</h1>
          {" "}
          <p>We have just sent a confirmation email to your email address. Tap on the link to reset your password</p>
          <>
            {" "}
            <Link href={"/auth/forgot-password"}>
              <div className='btn_primary w-full' style={{ justifyContent: "center", display: "flex" }}>
                <a className={styles.sign_up_link}>Go back</a>
              </div>
            </Link>
            <div className={styles.sign_up}>
              <p>
                <Link href={"/auth/login"}>
                  <a className={styles.sign_up_link}>Login</a>
                </Link>
              </p>
            </div>
          </>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
