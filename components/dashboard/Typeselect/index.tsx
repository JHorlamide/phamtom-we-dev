import { useEffect, useState } from "react";
import styles from '../../../styles/dashboard/SelectInput.module.scss';
import Image from "next/image";

interface inputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    placeholder: string;
    options?: any;
    selectChange?: any;
    arrayType?: string;
    filled: any,
    isDisabled?: boolean
  }

const TypeSelect: React.FC<inputProps> =  ({placeholder, options, selectChange, arrayType, filled, isDisabled}) => {
    const [selected, setSelected] = useState("");
    const [showOptions, setShowOptions] = useState(false);
    const [filtering, setFiltering] = useState([]);

    useEffect(()=>{
        setFiltering(options)
    },[options])

    const filterItems = (value: any) => {
        if (value) { 
            const filteredList = options.filter((item: any) => item.name.toString().toLowerCase().startsWith(value.toLowerCase()));
            setFiltering(filteredList)
        } else (
            setFiltering(options)
        )
    }

    return(
        <div className={styles.select}>
            <div className={styles.select_inputSelect}>
                <input onClick={()=>setShowOptions(!showOptions)} 
                    onChange={(e) => {
                        setSelected(e.target.value);
                        setShowOptions(true);
                        filterItems(e.target.value);
                    }}
                    value={selected} 
                    placeholder={placeholder} 
                    disabled={isDisabled ? isDisabled : false}
                    // style={!filled ? {borderColor:'#FDA29B'}:{borderColor:'#C4C4C4'}}
                    className='input_primary'
                />
            </div>
            
            { showOptions &&
                <div className={styles.select_options}>
                    {
                        arrayType === "countryObject" && filtering.length ?
                        filtering?.map((item: any, idx: any)=>(
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
                        ))
                    }
                </div>
            }
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

export default TypeSelect;