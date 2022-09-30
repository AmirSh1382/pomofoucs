import React, { useState } from "react";

// Styles
import styles from "./Input.module.css"

const Input = ({ setValue, value, label }) => {

  const [ isActive, setIsActive ] = useState(true);

  return (
    <div className="grow">
      <div className="relative flex flex-col items-center">
        <label
          className={`${styles.label} ${isActive && styles.active}`}
          htmlFor={label}
        >
          {label}
        </label>

        <input
          id={label}
          type="text"
          value={value}
          className={`${styles.input}`}
          onChange={e => setValue(e.target.value)}
          onFocus={() => setIsActive(true)}
          onBlur={() => !value && setIsActive(false)}
        />
      </div>
    </div>
  );
};

export default Input;