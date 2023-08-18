import React, { useContext, useState, createContext } from "react";
import { LowButtonComponent } from "./Low/button";
import { Mid1Component } from "./Mid/mid1";
import { Mid2Component } from "./Mid/mid2";

export type UnContext<T> = T extends React.Context<infer U> ? U : T;
type NonUndefined<T> = T extends undefined ? never : T;
type Partial<T> = {
  [P in keyof T]?: T[P];
};

const withContextPropsInjection =
  <P extends object, ContextType extends React.Context<any>>(
    Component: React.ComponentType<P>,
    context: ContextType
  ) =>
  <ParticalP extends Partial<P>>(
    transformer: (props: NonUndefined<UnContext<ContextType>>) => ParticalP
  ) =>
  (_props: Omit<P, keyof ParticalP>) => {
    const contextValue = useContext(context);
    if (!contextValue) return <></>;

    const props = { ...transformer(contextValue), ..._props } as unknown as P;

    return <Component {...props} />;
  };

type SampleContextType = {
  inputs: Record<string, string>;
  onChange: (id: string, value: string) => void;
  onLogin: () => void;
};

const SampleContext = createContext<SampleContextType | undefined>(undefined);

const useInputState = () => {
  const [inputs, setInputs] = useState<Record<string, string>>({});

  const onChange = (id: string, value: string) => {
    setInputs((v) => ({
      ...v,
      [id]: value,
    }));
  };

  return { inputs, onChange };
};

const useLogin = ({
  id,
  pw,
  check,
}: {
  id: string;
  pw: string;
  check: boolean;
}) => {
  const login = () => {
    if (check === false) {
      alert("약관에 동의하세요");
      return null;
    }
    if (id === "hello" && pw === "world") {
      return {
        user: "shin",
      };
    }
    alert("id: hello, pw:world");
    return null;
  };

  return { login };
};

export const SampleComponent = ({
  customText,
  onLogin,
}: {
  customText: string;
  onLogin: (payload: string) => void;
}) => {
  const { inputs, onChange } = useInputState();
  const { login } = useLogin({
    id: inputs["id"],
    pw: inputs["pw"],
    check: inputs["check"] === "checked",
  });

  const _onLogin = () => {
    const result = login();
    if (result?.user) {
      onLogin(result.user);
    }
  };

  return (
    <SampleContext.Provider value={{ inputs, onChange, onLogin: _onLogin }}>
      <InjectedMid1 />
      <InjectedMid2 />

      <InjectedButton children={customText} />
    </SampleContext.Provider>
  );
};

const InjectedMid1 = withContextPropsInjection(
  Mid1Component,
  SampleContext
)((state) => ({
  inputs: state.inputs,
  onChange: state.onChange,
}));

const InjectedMid2 = withContextPropsInjection(
  Mid2Component,
  SampleContext
)((state) => ({
  inputs: state.inputs,
  onChange: state.onChange,
}));

const InjectedButton = withContextPropsInjection(
  LowButtonComponent,
  SampleContext
)((state) => ({
  onClick: state.onLogin,
}));
