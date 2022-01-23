import React, {useEffect, useState} from 'react';
import styles from './Slider.module.css';

//  Module van maken omdat dit de enige checkboxes mogen zijn met een slider stijl
//  Alle andere checkboxes mogen in default stijl

function Slider({register, labelId, yes, no, filterAttribute, inputName, children}) {
    const [checkedState, toggleCheckedState] = useState();
    // const [firstMount, toggleFirstMount] = useState(false);


    function toggleCheckbox() {
        if (checkedState === false && checkedState === null) {
            console.log("Status van de checkbox:");
            console.log(checkedState);
            toggleCheckedState(true);
        } else {
            console.log("Status van de checkbox na klik:");
            console.log(checkedState);
            toggleCheckedState(false);
        }
    }

    // useEffect(() => {
    //     toggleFirstMount(false);
    // }, []);

    // useEffect(() => {
    //     if(firstMount) {
    //         toggleCheckbox();
    //     }
    // }, [checkedState]);

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
            value={checkedState}
            onChange={() => toggleCheckedState(!checkedState)}
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
