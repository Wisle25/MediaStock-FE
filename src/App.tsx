import type { Component, ParentProps } from "solid-js";
import Header from "./Layouts/Header";

const App: Component<ParentProps> = (props) => {
  return (
    <>
      <Header />

      {/* Page Layout */}
      <div class="flex mt-16 h-[calc(100vh-4rem)] w-screen">
          {props.children}
      </div>
    </>
  );
};

export default App;
