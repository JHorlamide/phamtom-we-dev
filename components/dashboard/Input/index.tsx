import React from "react";
import Image from "next/image";

interface inputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  styles: string;
  src?: string;
  img?: string;
  width?: string;
  height?: string;
  layout?: any;
  error?: boolean;
  errorMessage?: string;
  handleImageChange?: () => void;
}

const Input: React.FC<inputProps> = ({
  styles,
  src,
  width,
  height,
  img,
  layout,
  error,
  errorMessage,
  handleImageChange,
  ...props
}) => {
  return (
    <>
      <div className={`${error && error ? "input_error" : styles}`}>
        <input {...props} />

        {img && (
          <>
            <Image
              src={img}
              width={width}
              height={height}
              layout={layout}
              onClick={handleImageChange}
            />
          </>
        )}
      </div>
      {error && errorMessage && <p className='error_message'>{errorMessage}</p>}
    </>
  );
};

export default Input;
