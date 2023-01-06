import React from 'react';

interface CheckBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onChange: (e: any) => void;
}
const Checkbox = ({ onChange, ...props }: CheckBoxProps) => {
  return (
    <>
      <input type='checkbox' id='slider_input' onChange={onChange} {...props} />
      <label htmlFor='slider_input' id='slider_label'>
        Toggle
      </label>
    </>
  );
};

export default Checkbox;
