import React from "react";
import styles from "./Home.module.scss";

export default function Home() {
  return (
    <main className={styles.home}>
      <div className={styles.empty}>
        <p>This board is empty. Create a new column to get started.</p>
        <button> + Add New Column </button>
      </div>
    </main>
  );
}
