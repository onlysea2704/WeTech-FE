/**
 * QuocGiaInput – Reusable "Quốc gia" text input.
 *
 * Props:
 *   - name          (string)  form field name
 *   - defaultValue  (string)  initial value, falls back to "Việt Nam"
 *   - styles        (object)  CSS-module styles from the parent form
 *   - style         (object)  optional inline-style override for the wrapper
 */
export default function QuocGiaInput({
    name,
    defaultValue,
    styles = {},
    style = {},
}) {
    return (
        <div className={styles.formGroup} style={{ marginTop: "8px", ...style }}>
            <label className={styles.label}>Quốc gia:</label>
            <input
                type="text"
                className={styles.input}
                name={name}
                defaultValue={defaultValue ?? "Việt Nam"}
            />
        </div>
    );
}
