import { useRef } from "react";
import Image from "next/image";
import { Button } from "../../../../components/dashboard";

const Step3 = ({ styles, setCurrentStep }: any) => {
  const Ref: any = useRef();

  const onButtonClick = () => {
    Ref.current.click();
  };

  return (
    <form >
      <div className={styles.setup_form_header}>
        <h4>Are you eligible to operate an online pharmacy in your country?</h4>
      </div>
      <label>If YES, upload suporting document</label>

      <div className={styles.form_input_container}>
        <div className={styles.upload_doc}>
          <input type='file' ref={Ref} style={{ display: "none" }} />

          <div onClick={onButtonClick}>
            <Image
              src={"/assets/dashboard/doc.svg"}
              width={"16px"}
              height={"20px"}
            />
            <p>Upload a document</p>
          </div>
        </div>
      </div>

      <div className={styles.continue}>
        <Button
          onClick={() => setCurrentStep("Step4")}
          className='btn_primary w-full'
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

export default Step3;
