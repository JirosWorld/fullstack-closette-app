import React, {useEffect, useState} from 'react';
import styles from './Slider.module.css';

function Slider({register, labelId, yes, no, filterAttribute, inputName, children}) {
    const [firstMount, toggleFirstMount] = useState(false);
    const [isChecked, toggleIsChecked] = useState(false);

    const handleOnChange = () => {
        toggleIsChecked(!isChecked);
        console.log("Status van de checkbox na klik:");
        console.log(inputName + ": " +  !isChecked);
    }

    useEffect(() => {
        if(firstMount) {
            console.log("Status van de checkbox update:");
            console.log(isChecked);
        }
    }, [isChecked]);

    return (
        <>
            <div className={styles["slider-container"]}>

                <span className={styles["filter-attribute"]}>{filterAttribute}</span>

                <p className={styles["switch-label"]}>
                    {no}
                </p>

                <span className={styles["switch-wrapper"]}>
        <input
            type="checkbox"
            className={styles.switch}
            id={labelId}
            checked={isChecked}
            name={inputName}
            {...register(inputName)}
            onChange={handleOnChange}
        />

        <label
            htmlFor={labelId}
            className={styles["switch-btn"]}
        >

      </label>
      </span>
                <p className={styles["switch-label"]}>
                    {yes}
                </p>
                <span className={styles["extra-label-info"]}>
                {children}
            </span>
            </div>
            <div className="result">
                Checkbox: {isChecked ? "checked" : "not-checked"}.
            </div>
        </>
    );
}

export default Slider;
