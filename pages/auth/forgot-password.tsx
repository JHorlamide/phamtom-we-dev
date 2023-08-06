import { useState } from "react";
import styles from "../../styles/auth/Auth.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import { Input, Button } from "../../components/dashboard";
import { forgotPassword } from "../../services/restService";
import { MoonLoader } from "react-spinners";
import { toast } from "react-toastify";
import Image from "next/image";

const ForgotPassword = () => {
  const { push } = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inputFields, setInputFields] = useState({
    email: "",
    userType: "ADMIN"
  });
  const [error, setError] = useState(false);

  const handleChange = (e: any) => {
    setError(false);
    setInputFields({ ...inputFields, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await forgotPassword(inputFields)
        .then((response) => response?.data)
        .then(res => {
          if (res?.status === "Success") {
            toast.success(res?.message)
            push("/auth/confirmation");
          } else {
            toast.error(res?.data)
          }
        })
    } catch (err: any) {
      setError(true);
      const errors = err?.response?.data?.errors;

      if (errors && errors[0].toLowerCase().includes("invalid email")) {
        // setErrorMessage("Incorrect email or password");
        toast.error("Incorrect email or password")
      } else {
        // setErrorMessage("Connection timeout. Please try again later.");
        toast.error("Connection timeout. Please try again later.")
      }
    } finally {
      setIsLoading(false);
    }
  };

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
          <h1>Forgot Password</h1>
          <div className={styles.input_container}>
            <div>
              <label className={styles.label} htmlFor='email'>
                Email
              </label>
              <Input
                autoComplete='on'
                id='email'
                name='email'
                required={true}
                placeholder='Enter your email'
                type='email'
                styles='input_primary'
                error={error}
                onChange={handleChange}
                value={inputFields.email}
              />
            </div>
          </div>

          <>
            {isLoading
              ? (
                <div className={styles.isLoading}>
                  <MoonLoader color='#0055d2' size={30} />
                </div>
              )
              : (
                <>
                  {" "}
                  <div>
                    <Button
                      onClick={handleSubmit}
                      disabled={
                        inputFields.email === "" ||
                        isLoading ||
                        error
                      }
                      className='btn_primary w-full'
                    >
                      Continue
                    </Button>
                  </div>
                  <div className={styles.sign_up}>
                    <p>
                      <Link href={"/auth/login"}>
                        <a className={styles.sign_up_link}>Login</a>
                      </Link>
                    </p>
                  </div>
                </>
              )}
          </>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
