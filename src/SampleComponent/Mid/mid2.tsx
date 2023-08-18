import { LowCheckboxComponent } from "../Low/checkbox";

type MidProps = {
  inputs: Record<string, string>;
  onChange: (id: string, value: string) => void;
};

export const Mid2Component = ({ inputs, onChange }: MidProps) => {
  return (
    <>
      <LowCheckboxComponent
        disabled={false}
        checked={inputs["check"] === "checked"}
        onChange={(checked) => {
          onChange("check", checked ? "checked" : "not-checked");
        }}
      >
        약관 동의
      </LowCheckboxComponent>
    </>
  );
};
