import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Posts from "./Posts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import Login from "./Login";
import Profile from "./Profile";
import Register from "./Register";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  const loginHandler = () => {
    setLoggedIn((state) => !state);
  };

  const setUsernameHandler = (username) => {
    setUsername(username);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Header loggedIn={loggedIn} changeLoginState={loginHandler} />
        <Routes>
          <Route index element={<Posts />} />
          <Route
            path="/login"
            element={
              <Login
                changeLoginState={loginHandler}
                setUsername={setUsernameHandler}
              />
            }
          />
          <Route path="/profile" element={<Profile username={username} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
