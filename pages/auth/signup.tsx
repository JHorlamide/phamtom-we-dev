import { useState } from "react";
import styles from "../../styles/auth/Auth.module.scss";
import Link from "next/link";
import { Input, Button } from "../../components/dashboard";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { registerAdmin } from "../../services/restService";
import { saveCredentials } from "../../services/localService";
import { useRouter } from "next/router";
import { MoonLoader } from "react-spinners";
import { toast } from "react-toastify";
import Image from "next/image";

const Signup = () => {
  const { push } = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [inputFields, setInputFields] = useState({
    email: "",
    name_of_institution: "",
    address: "3rd street",
    phone_number: "",
    password: "",
    registration_number: ""
  });

  const handleChange = (e: any) => {
    setInputFields({ ...inputFields, [e.target.name]: e.target.value });

    // setIsValid(true);
    setEmailError("");
    setPasswordError("");
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validate = (e: any) => {
    e.preventDefault();
    let isValidPassword = true;
    let isValidEmail = true;

    // email validation
    if (!inputFields.email.match(/\S+@\S+\.\S+/)) {
      setEmailError("Please input a valid email address");

      isValidEmail = false;
    } else {
      isValidEmail = true;
    }

    // password validation
    if (inputFields.password.length < 5) {
      setPasswordError("Password must be at least 5 characters long");

      isValidPassword = false;
    } else {
      isValidPassword = true;
    }

    if (isValidEmail && isValidPassword) handleSubmit(e);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      registerAdmin(inputFields)
      .then((response) => response?.data)
      .then(res => {
        if(res?.status === "Success"){
          toast.success(res?.message)
          saveCredentials(inputFields.email, inputFields.password);
          setTimeout(() => {
           push("/auth/login");
          }, 1500);
        }else{
          toast.error(res?.message)
        }
      })

      // setInputFields({
      //   email: "",
      //   name_of_institution: "",
      //   address: "3rd street",
      //   phone_number: "",
      //   password: "",
      //   registration_number: ""
      // });      
    } catch (err) {
      console.log(err);
      toast.error("error")
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
          <h1>Sign up</h1>

          <div className={styles.input_container}>
            <div>
              <label className={styles.label} htmlFor='email'>
                Email
              </label>

              <Input
                required
                id='email'
                placeholder='Enter your email'
                type='email'
                styles='input_primary'
                name='email'
                onChange={handleChange}
                value={inputFields.email}
                error={Boolean(emailError)}
                errorMessage={emailError}
              />
            </div>

            <div>
              <label className={styles.label} htmlFor='institution'>
                Name of Institution
              </label>
              <Input
                required
                id='institution'
                placeholder='Name of institution'
                type='text'
                styles='input_primary'
                name='name_of_institution'
                onChange={handleChange}
                value={inputFields.name_of_institution}
              />
            </div>

            <div>
              <label className={styles.label} htmlFor='email'>
                Phone
              </label>
              <PhoneInput
                country={"ng"}
                containerClass='phone_input_container'
                placeholder='Phone number'
                onChange={(phone: any) => {
                  setInputFields({ ...inputFields, phone_number: phone });
                }}
                value={inputFields.phone_number}
              />
            </div>

            <div>
              <label className={styles.label} htmlFor='password'>
                Create your password
              </label>
              <Input
                // allow auto fill'
                required
                name='password'
                id='password'
                autoComplete='on'
                placeholder='Enter your password'
                type={showPassword ? "text" : "password"}
                styles='input_primary'
                onChange={handleChange}
                img='/assets/login/eye.svg'
                width='22px'
                height='15px'
                layout='fixed'
                handleImageChange={handleShowPassword}
                value={inputFields.password}
              />
            </div>

            <div>
              <label className={styles.label} htmlFor='reg_no'>
                License Reg No
              </label>
              <Input
                required
                id='reg_no'
                placeholder='License number'
                type='text'
                styles='input_primary'
                onChange={handleChange}
                name='registration_number'
                value={inputFields.registration_number}
              />
            </div>

            <div className={styles.agree_terms}>
              <input type='checkbox' required />
              <label>
                By checking the box, you have agreed to our Term of Service and
                Privacy Policy
              </label>
            </div>
          </div>

          {isLoading
            ? (
            <div className={styles.isLoading}>
              <MoonLoader color='#0055d2' size={30} />
            </div>
              )
            : (
            <>
              <div>
                <Button
                  disabled={
                    isLoading ||
                    !inputFields.email ||
                    !inputFields.name_of_institution ||
                    !inputFields.password ||
                    !inputFields.registration_number ||
                    Boolean(emailError) ||
                    Boolean(passwordError)
                  }
                  onClick={validate}
                  className='btn_primary w-full'
                >
                  Continue
                </Button>
              </div>

              <div className={styles.sign_up}>
                <p>
                  Already have an account?{" "}
                  <Link href={"/auth/login"}>
                    <a className={styles.sign_up_link}>Login</a>
                  </Link>
                </p>
              </div>
            </>
              )}
        </form>
      </div>
    </div>
  );
};

export default Signup;
