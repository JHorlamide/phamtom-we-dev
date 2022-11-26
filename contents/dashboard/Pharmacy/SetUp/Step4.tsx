import { useRouter } from "next/router";
import Image from "next/image";
import { Button } from "../../../../components/dashboard";

const Step4 = ({ styles, setCurrentStep }: any) => {
  const { push } = useRouter();

  return (
    <form className={styles.completed_container}>
      <div className={styles.completed}>
        <Image
          src={"/assets/dashboard/success.svg"}
          width='50.72px'
          height='53.33px'
          layout='fixed'
        />

        <div>
          <h4>Set up in Progress</h4>
          <p>
            Your pharmacy application is currently being reviewed. We will get
            back to you shortly.
          </p>
        </div>
      </div>

      <div className={styles.goHome}>
        <Button onClick={(e:any) => {
          e.preventDefault();
          push("/dashboard/EHR");
        }} className='btn_primary'>
          Go home
        </Button>
      </div>
    </form>
  );
};

export default Step4;
