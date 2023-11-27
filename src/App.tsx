import { Suspense, lazy, useEffect, useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import "./App.css";

const Main = lazy(() => import("./routes/Main"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Main />
      </Suspense>
    ),
  },
]);

const GlobalStyles = createGlobalStyle`
${reset};
*{
  box-sizing: border-box;
}
body{
  background-color:#f0f0f0;
}
`;

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`;

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const init = async () => {
    setIsLoading(false);
  };

  useEffect(() => {
    init();
  }, []);
  return (
    <Wrapper>
      <GlobalStyles></GlobalStyles>
      {isLoading ? <></> : <RouterProvider router={router} />}
    </Wrapper>
  );
}

export default App;
