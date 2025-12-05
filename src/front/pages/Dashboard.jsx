import React from "react";
import Sidebar from "../components/Sidebar.jsx";
import Header from "../components/Header.jsx";
import StatsGrid from "../components/StatsGrid.jsx";
import MatchesAvailable from "../components/MatchesAvailable.jsx";
import NearbyCourts from "../components/NearbyCourts.jsx";
import MapCard from "../components/MapCard.jsx";
import PlayedMatches from "../components/PlayedMatches.jsx";


import "../styles/dashboard.css";

const Dashboard = () => {
    return (
        <div className="dashboard-container d-flex">

            <Sidebar />


            <div className="main-content flex-grow-1">
                <Header />

                <div className="container-fluid py-4">

                    <StatsGrid />


                    <div className="row mt-4">

                        <div className="col-md-8">
                            <MatchesAvailable />
                            <NearbyCourts />
                        </div>


                        <div className="col-md-4">
                            <MapCard />
                            <PlayedMatches />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

