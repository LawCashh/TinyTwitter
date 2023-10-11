import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Posts from "./Posts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import Login from "./Login";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const loginHandler = () => {
    setLoggedIn((state) => !state);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Header loggedIn={loggedIn} />
        <Routes>
          <Route index element={<Posts />} />
          <Route
            path="/login"
            element={<Login changeLoginState={loginHandler} />}
          />
          <Route path="/user/:id" element={<h1>Korisnik</h1>} />
          <Route path="/register" element={<h1>registracija</h1>} />
          <Route path="/logout" element={<h1>logout</h1>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
