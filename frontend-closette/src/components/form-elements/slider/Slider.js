import React, { useState } from 'react';
import styles from './Slider.module.css';

//  Module van maken omdat dit de enige checkboxes mogen zijn met een slider stijl
//  Alle andere checkboxes mogen in default stijl

function Slider() {
  const [checked, toggleChecked] = useState(false);

  return (
    <div className={styles["slider-container"]}>
      Weergeven in

      <p className={styles["switch-label"]}>
        wel
      </p>

      <span className={styles["switch-wrapper"]}>
        <input
          type="checkbox"
          className={styles.switch}
          id="metric-system"
          value={checked}
          onChange={() => toggleChecked(!checked)}
        />

        <label
          htmlFor="metric-system"
          className={styles["switch-btn"]}
        />
      </span>

      <p className={styles["switch-label"]}>
        niet
      </p>
    </div>
  );
}

export default Slider;
