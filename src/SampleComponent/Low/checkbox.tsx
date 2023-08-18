interface CheckboxProps {
  children: React.ReactNode;
  disabled: boolean;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const LowCheckboxComponent = ({
  children,
  disabled,
  checked,
  onChange,
}: CheckboxProps) => {
  return (
    <label>
      <input
        type="checkbox"
        disabled={disabled}
        checked={checked}
        onChange={({ target: { checked } }) => onChange(checked)}
      />
      {children}
    </label>
  );
};
