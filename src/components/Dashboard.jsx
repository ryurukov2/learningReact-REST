import { Link } from "react-router-dom";
import { BASE_URL } from "../App";
import { useEffect, useState, useContext } from "react";

export function DashboardHome({ isLoggedIn, hideModal=false }) {
  const [dashboardInfo, setDashboardInfo] = useState([]);
  const URL = useContext(BASE_URL);
  const token = localStorage.getItem("authorizationToken");
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
  useEffect(() => {
    if (isLoggedIn) {
      // fetchLastEdited();
      fetchDashboardInfo();
    } 
  }, [isLoggedIn]);
  return (
    <div className="lg:text-2xl">
        {isLoggedIn ? (
          <div>

            Dashboard
          <div  className="group relative">
            <div className="base-border p-4 gap-2 box-border h-50 flex flex-col">
              <div>Hello, {dashboardInfo.username}!</div>
              <div>
                Owner of <b>{dashboardInfo.owner_of}</b> projects.
              </div>
              <div>
                Assigned to <b>{dashboardInfo.assigned_to}</b> projects.
              </div>
              <div>
                Active Tasks: <b>{dashboardInfo.non_resolved_tasks}</b>
              </div>
              <div>
                To-do tasks: <b>{dashboardInfo.todo_tasks}</b>
              </div>
              <div>
                Resolved Tasks: <b>{dashboardInfo.resolved_tasks}</b>
              </div>
            </div>
  {hideModal!==true &&
            <Link to={`/analytics`}>
            <div
              className="absolute w-full h-full top-0 left-0
              transition-all
              text-center
              opacity-0
              group-hover:opacity-100
              group-hover:text-white
              bg-gray-500
              bg-opacity-80
              group-hover:translate-y-0
              "
              >
              <div className="relative top-1/3 text-xl group-hover:opacity-100">
                Click for mroe detailed analysis
              </div>
            </div>
                </Link>
            }
          </div>
              </div>
        ) : (
          <div className="base-border p-4 box-border">
            Log in to view details.
          </div>
        )}
    </div>
  );
}
