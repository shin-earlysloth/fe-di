type MidProps = {
  inputs: Record<string, string>;
  onChange: (id: string, value: string) => void;
};

export const Mid1Component = ({ inputs, onChange }: MidProps) => {
  return (
    <>
      id:
      <input
        value={inputs["id"]}
        onChange={(event) => {
          onChange("id", event.target.value);
        }}
      />
      pw:
      <input
        value={inputs["pw"]}
        onChange={(event) => {
          onChange("pw", event.target.value);
        }}
      />
    </>
  );
};
