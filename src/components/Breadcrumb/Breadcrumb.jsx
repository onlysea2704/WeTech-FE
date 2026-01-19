import React from "react";
import styles from "./Breadcrumb.module.css";

const Breadcrumb = ({ items = [] }) => {
    return (
        <nav aria-label="breadcrumb" className={styles["breadcrumb-container"]}>
            <ol className={styles["breadcrumb-list"]}>
                {items.map((item, index) => (
                    <React.Fragment key={index}>
                        <li
                            className={`${styles["breadcrumb-item"]} ${index === items.length - 1 ? styles.active : ""}`}
                            aria-current={index === items.length - 1 ? "page" : undefined}
                        >
                            {index === items.length - 1 || !item.link ? (
                                item.label
                            ) : (
                                <a href={item.link}>{item.label}</a>
                            )}
                        </li>

                        {index < items.length - 1 && <li className={styles["breadcrumb-separator"]}>›</li>}
                    </React.Fragment>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumb;
