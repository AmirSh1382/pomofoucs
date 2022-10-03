import React from "react";

// Styles
import styles from "./Input.module.css"

const Input = ({ setValue, value, label }) => {

  return (
    <div className="grow">
      <div className="relative flex flex-col items-center">
        <label
          className={`${styles.label} ${styles.active}`}
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
        />
      </div>
    </div>
  );
};

export default Input;