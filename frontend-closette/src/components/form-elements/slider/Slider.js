import React, {useEffect, useState} from 'react';
import styles from './Slider.module.css';

//  Module van maken omdat dit de enige checkboxes mogen zijn met een slider stijl
//  Alle andere checkboxes mogen in default stijl

function Slider({register, labelId, yes, no, filterAttribute, inputName, children}) {
    const [checked, toggleChecked] = useState();
    const [firstMount, toggleFirstMount] = useState(false);


    function toggleCheckbox() {
        if (checked === false) {
            toggleChecked(true);
        } else {
            toggleChecked(false);
        }
    }

    useEffect(() => {
        toggleFirstMount(true);
    }, []);

    useEffect(() => {
        if(firstMount) {
            toggleCheckbox();
        }
    }, [checked]);

    return (
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
            value={checked}
            onChange={() => toggleChecked(!checked)}
            {...register(inputName)}
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
    );
}

export default Slider;
