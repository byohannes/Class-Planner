import React from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { Link } from "react-router-dom";
import "./Home.scss";

const Home = () => {
  return (
    <div className="Home_Body">
      <Header />
      <div className="Home_Main">
        <div>
          <img className="Home_CYF_Img" src="../files/Home.png" alt="CYF" />
        </div>
        <div>
          <p>
            We are a non-profit organization supporting refugees and
            disadvantaged individuals with the dream of becoming developers. In
            their journey of interrupted lives, unfinished studies and
            integration challenges, many of these individuals yearn to update
            their tech skills, but lack learning opportunities.
          </p>
          <div>
            <Link className="Home_Link" to="/upcomingclass/admin">
              <p>Admin</p>
            </Link>
            <Link className="Home_Link" to="/upcomingclass">
              <p>Volunteer</p>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
