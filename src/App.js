import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import Movies from "./Components/Movies/Movies";
import TVShows from "./Components/TVShows/TVShows";
import About from "./Components/About/About";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Footer from "./Components/Footer/Footer";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import Moviedetails from "./Components/Moviedetails/Moviedetails";
import Tvdetails from "./Components/Tvdetails/Tvdetails";

function App() {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      getUserData();
    }
  }, []);
  let navigator = useNavigate();

  function getUserData() {
    let userToken = localStorage.getItem("userToken");
    let decodedToken = jwtDecode(userToken);

    setUserData(decodedToken);
  }

  function logOut() {
    localStorage.removeItem("userToken");
    setUserData(null);
    navigator("/login");
  }

  // useEffect(() => {
  //   console.log(userData);
  // }, [userData]);

  function ProtectedRoute({ children }) {
    if (!localStorage.getItem("userToken")) {
      return <Navigate to="/login" />;
    } else {
      return children;
    }
  }

  return (
    <>
      <Navbar userData={userData} logout={logOut} />
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="movies"
            element={
              <ProtectedRoute>
                <Movies />
              </ProtectedRoute>
            }
          />
          <Route
            path="tvshows"
            element={
              <ProtectedRoute>
                <TVShows />
              </ProtectedRoute>
            }
          />
          <Route
            path="about"
            element={
              <ProtectedRoute>
                <About />
              </ProtectedRoute>
            }
          />
          <Route
            path="moviedetails"
            element={
              <ProtectedRoute>
                <Moviedetails />
              </ProtectedRoute>
            }
          >
            <Route
              path=":id"
              element={
                <ProtectedRoute>
                  <Moviedetails />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route
            path="tvdetails"
            element={
              <ProtectedRoute>
                <Tvdetails />
              </ProtectedRoute>
            }
          >
            <Route
              path=":id"
              element={
                <ProtectedRoute>
                  <Tvdetails />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login userData={getUserData} />} />
          <Route path="*" element={<h2>Error 404</h2>} />
        </Routes>

        <Footer />
      </div>
    </>
  );
}

export default App;
