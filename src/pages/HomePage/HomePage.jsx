import { DashboardHome } from './DashboardHome';
import { LeftSideHome } from "./LeftSideHome";
import { useEffect, useState, useContext } from "react";
import { BASE_URL } from "../../App";
const HomePage = ({ isLoggedIn }) => {
  const [latestProject, setLatestProject] = useState([]);
  const token = localStorage.getItem("authorizationToken");
  const URL = useContext(BASE_URL);
  const [dashboardInfo, setDashboardInfo] = useState([]);
  let headers_to_use = {
    "Content-Type": "application/json",
    Authorization: `Token ${token}`,
  };
  const fetchDashboardInfo = async () => {
    fetch(`${URL}/api/projects/dashboard`, {
      headers: headers_to_use,
    }).then(r => {
      if(r.status===200){
        return r.json()
      }else if(r.status === 401) {
        throw Error("Not logged in.");
      } else {
        throw Error(r.status);
      }
    }).then((data) => {
      setDashboardInfo(data)
    });
  };
  const fetchLastEdited = async () => {
    fetch(`${URL}/api/tasks/last_edited`, {
      headers: headers_to_use,
    })
      .then((r) => {
        if (r.status === 200) {
          return r;
        } else if (r.status === 401) {
          throw Error("Not logged in.");
        } else {
          throw Error(r.status);
        }
      })
      .then((r) => r.json())
      .then((data) => {
        setLatestProject(data);
      })
      .catch((e) => console.error(e));
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchLastEdited();
      fetchDashboardInfo();
    } else {
      setLatestProject([]);
    }
  }, [isLoggedIn]);

  return (
    <div className="flex gap-10 flex-wrap flex-row-reverse justify-center">
      
      <div className="w-fit">
       <DashboardHome dashboardInfo={dashboardInfo} isLoggedIn={isLoggedIn}/>
      </div>
      <div className="grow w-fit">
        <LeftSideHome isLoggedIn={isLoggedIn} latestProject={latestProject} />
      </div>
    </div>
  );
};

export default HomePage;
