import Image from "next/image";
import { useState } from "react";
import styles from '../../../styles/dashboard/SelectInput.module.scss';

interface inputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    placeholder: string;
    options?: any;
    selectChange?: any;
    arrayType?: string;
  }

const SelectInput: React.FC<inputProps> = ({placeholder, options, selectChange, arrayType}) => {
    const [selected, setSelected] = useState(placeholder);
    const [showOptions, setShowOptions] = useState(false);
    
    return(
        <div className={styles.select}>
            <div className={styles.select_box} onClick={()=>setShowOptions(!showOptions)}>{arrayType==="incomeFilter"?placeholder:selected}</div>
                { showOptions &&
                    <div className={styles.select_options}>
                        {
                            arrayType === "countryObject" ?
                            options?.map((item: any, idx: any)=>(
                                <p 
                                    className={selected===item.name? styles.select_options_selected:""} 
                                    key={idx} 
                                    onClick={()=>{
                                        setSelected(item.name); 
                                        setShowOptions(false); 
                                        selectChange(item.name, item.id)
                                    }}
                                >
                                    {item.name}
                                </p>
                            )) :
                            options.map((item: any, idx: any)=>(
                                <p 
                                    className={selected===item? styles.select_options_selected:""} 
                                    key={idx} 
                                    onClick={()=>{
                                        setSelected(item);
                                        setShowOptions(false); 
                                        selectChange(item)
                                    }}
                                >
                                    {item}
                                </p>
                            )) 
                        }
                    </div>
                }
            {/* <img src={selectArrow} alt="arrow" className="select_arrow" /> */}
            <div className={styles.select_arrow}>
                <Image
                    src={'/assets/dashboard/select-arrow.svg'}
                    width={'10px'}
                    height={'14px'}
                />  
            </div>
            
        </div>
    )
}

export default SelectInput;