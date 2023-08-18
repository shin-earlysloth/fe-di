import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { SampleComponent } from "./SampleComponent/SampleComponent";

function App() {
  return (
    <>
      <div>
        <SampleComponent
          customText={"로그인 하세요"}
          onLogin={(user) => {
            alert(`로그인성공: ${user}`);
          }}
        />
      </div>
    </>
  );
}

export default App;
