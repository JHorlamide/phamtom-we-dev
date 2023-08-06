import React from 'react';
import { useEffect, useState } from "react";
import styles from "../../styles/auth/Auth.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { Input, Button } from "../../components/dashboard";
import { resetPassword } from "../../services/restService";
import { removeCred } from "../../services/localService";
import { setAdmin } from "../../redux/actions/admin";
import { MoonLoader } from "react-spinners";
import { toast } from "react-toastify";
import Image from "next/image";


const ResetPassword = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { token } = router.query;
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [inputFields, setInputFields] = useState({
    password: "",
    confirmPassword: "",
    userType: "",
  });


  useEffect(() => {
    removeCred();
    setInputFields({ ...inputFields, userType: "ADMIN", });
    dispatch(setAdmin({}));
  }, []);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e: any) => {
    setError(false);
    setInputFields({
      ...inputFields,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordReset = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await resetPassword({...inputFields, passwordToken: token})
        .then((response) => response?.data)
        .then(res => {
          if (res?.status === "Success") {
            toast.success(res?.message)
            router.push("/auth/login");
          } else {
            toast.error(res?.data)
          }
        })
    } catch (err: any) {
      setError(true);
      const errors = err?.response?.data?.errors;
      const error = err?.response?.data?.error;

      if (errors && errors[0].toLowerCase().includes("invalid email")) {
        // setErrorMessage("Incorrect email or password");
        toast.error("Incorrect password")
      } else if (error && error.toLowerCase().includes("password")) {
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
          <h1>Reset Your Password</h1>
          <div className={styles.input_container}>
            <div>
              <label className={styles.label} htmlFor='password'>
                Password
              </label>
              <Input
                name='password'
                required
                id='password'
                autoComplete='on'
                placeholder='Enter your new password'
                styles='input_primary'
                img='/assets/login/eye.svg'
                width='22px'
                height='15px'
                layout='fixed'
                error={error}
                type={showPassword ? "text" : "password"}
                onChange={handleChange}
                value={inputFields.password}
                handleImageChange={handleShowPassword}
              />
            </div>

            <div>
              <label className={styles.label} htmlFor='password'>
                Confirm Password
              </label>
              <Input
                // allow auto fill'
                name='confirmPassword'
                required
                id='confirmPassword'
                autoComplete='on'
                placeholder='Please re-enter your password'
                styles='input_primary'
                img='/assets/login/eye.svg'
                width='22px'
                height='15px'
                layout='fixed'
                error={error}
                type={showPassword ? "text" : "password"}
                onChange={handleChange}
                value={inputFields.confirmPassword}
                handleImageChange={handleShowPassword}
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
                <div>
                  <Button
                    className='btn_primary w-full'
                    onClick={handlePasswordReset}
                    disabled={
                      inputFields.password === "" ||
                      inputFields.confirmPassword === "" ||
                      isLoading ||
                      error
                    }
                  >
                    Reset Password
                  </Button>
                </div>
              )}
          </>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;