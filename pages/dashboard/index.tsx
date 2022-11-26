import { useEffect } from "react";
import { useRouter } from "next/router";
import { attemptLoginAdmin } from "../../services/restService";
import { getCredentials, redirectTo } from "../../services/localService";
import { MoonLoader } from "react-spinners";
const Index = () => {
  const { push } = useRouter();

  useEffect(() => {
    const credentials = getCredentials();
    if (credentials) {
      attemptLogin(credentials.email, credentials.password);
    } else {
      push("/auth/login");
    }
  }, []);

  const attemptLogin = async (email: any, password: any) => {
    try {
      await attemptLoginAdmin({ user_email_phone: email, password });

      const path: any = redirectTo();

      if (path) {
        push(path);
      } else {
        push("/dashboard/EHR");
      }
    } catch (error) {
      console.log(error);

      push("/auth/login");
    }
  };

  return (
    <div className='flex items-center justify-center h-100vh'>
      <MoonLoader color='#0055d2' />
    </div>
  );
};

export default Index;
