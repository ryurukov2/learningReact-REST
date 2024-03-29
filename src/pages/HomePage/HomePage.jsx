import { DashboardHome } from '../../components/Dashboard';
import { LeftSideHome } from "./LeftSideHome";
import { useEffect, useState, useContext } from "react";
import { BASE_URL } from "../../App";
const HomePage = ({ isLoggedIn }) => {
  const [latestProject, setLatestProject] = useState([]);
  const token = localStorage.getItem("authorizationToken");
  const URL = useContext(BASE_URL);
  let headers_to_use = {
    "Content-Type": "application/json",
    Authorization: `Token ${token}`,
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
    } else {
      setLatestProject([]);
    }
  }, [isLoggedIn]);

  return (
    <div className="flex gap-10 justify-center max-xl:flex-wrap-reverse">
      
      <div className="grow">

        <LeftSideHome isLoggedIn={isLoggedIn} latestProject={latestProject} />
      </div>
      <div className="w-fit shrink-0">
       <DashboardHome isLoggedIn={isLoggedIn} hideModal={false}/>
      </div>

    </div>
  );
};

export default HomePage;
