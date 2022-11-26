import { useState } from "react";
import Image from "next/image";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";

const SetUpPharmacy = ({ styles }: any) => {
  const [currentStep, setCurrentStep] = useState("Step1");

  return (
    <>
      <div className={styles.setup_container}>
        <div className={styles.details}>
          <Image
            src={"/assets/dashboard/arrow_left.svg"}
            height={"12px"}
            width={"18px"}
          />

          <div className={styles.details_container}>
            <Image
              src={"/assets/dashboard/ehr/medic.svg"}
              height={"194px"}
              width={"144px"}
              layout='fixed'
            />

            <div>
              <h4>Setup your Online Pharmacy</h4>
            </div>

            <ol>
              <li>Sell your product to your patients/customers online</li>
              <li>Set your own price</li>
              <li>Deliver to them easily</li>
            </ol>
          </div>
        </div>

        <div className={styles.setup_form_container}>
          <div className={styles.form}>
            {currentStep === "Step1" && (
              <Step1 styles={styles} setCurrentStep={setCurrentStep} />
            )}

            {currentStep === "Step2" && (
              <Step2 styles={styles} setCurrentStep={setCurrentStep} />
            )}

            {currentStep === "Step3" && (
              <Step3 styles={styles} setCurrentStep={setCurrentStep} />
            )}

            {currentStep === "Step4" && (
              <Step4 styles={styles} setCurrentStep={setCurrentStep} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SetUpPharmacy;
