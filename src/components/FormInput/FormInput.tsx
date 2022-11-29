import React, { ReactNode } from "react";

interface Props {
  value: string;
  visited?: boolean;
  name?: string;
  header?: string;
  placeholder?: string;
  type?: string;
  rows?: number;
  onChange: (e: any) => void;
  onBlur?: (e: any) => void;
}

const FormInput = (props: Props) => {
  const { header, visited, ...others } = props;
  const { onChange, onBlur } = props;

  return (
    <label className="form-input_label">
      {header}
      {others.type ? (
        <input
          {...others}
          onChange={(e) => onChange(e)}
          onBlur={(e) => onBlur!(e)}
          data-visited={visited!}
          minLength={1}
          required
        />
      ) : (
        <textarea {...others} onChange={(e) => onChange(e)} />
      )}
      <span>Can't be empty</span>
    </label>
  );
};

export default FormInput;
