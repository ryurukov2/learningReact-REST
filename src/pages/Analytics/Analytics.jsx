import { useContext, useEffect, useState } from "react";
import { LoggedInContext, BASE_URL } from "../../App";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { DashboardHome } from "../../components/Dashboard";

import { Pie } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

export function AnalyticsPage({}) {
  const URL = useContext(BASE_URL);
  const token = localStorage.getItem("authorizationToken");
  const isLoggedIn = useContext(LoggedInContext);
  const [chartData, setChartData] = useState({});
  console.log(chartData);

  const fetchData = async () => {
    let headers_to_use = {
      "Content-Type": "application/json",

      Authorization: `Token ${token}`,
    };

    fetch(`${URL}/api/projects/analytics`, {
      headers: headers_to_use,
    })
      .then((r) => {
        if (r.status === 200) {
          return r.json();
        } else if (r.status === 401) {
          throw Error("Not logged in.");
        } else {
          throw Error(r.status);
        }
      })
      .then((rdata) => {
        // Object.values(rdata).map((cData, _) => {
        //   rdata[Object.keys(rdata)[_]] = standardizeChartData(cData);
        // });

        setChartData(rdata);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex gap-10 text-center flex-wrap flex-row-reverse justify-center w-full">
      <div>
        <DashboardHome isLoggedIn={isLoggedIn} hideModal={true} />
      </div>
      <div className="basis-3/4">
        Analytics
        <div className="grid grid-cols-1 md:grid-cols-2 w-full">
          {/* <div className="flex flex-row flex-wrap"> */}
          {Object.keys(chartData).length > 0 &&
            Object.values(chartData).map((chartD, _) => (
              <div key={_} className="">
                {chartD.datasets[0].label}
                <Pie data={chartD} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

// const standardOptions = {
//   backgroundColor: [
//     "rgba(255, 99, 132, 0.2)",
//     "rgba(153, 102, 255, 0.2)",
//     "rgba(153, 102, 100, 0.2)",
//     "rgba(28, 168, 112, 0.8)",
//     "rgba(153, 255, 0, 0.2)",
//   ],
//   borderColor: [
//     "rgba(255, 99, 132, 1)",
//     "rgba(54, 162, 235, 1)",
//     "rgba(153, 102, 100, 0.2)",
//     "rgba(153, 102, 0, 0.2)",
//     "rgba(153, 255, 0, 0.2)",
//   ],
//   borderWidth: 1,
// };
// const standardizeChartData = (rawData) => {
//   return {
//     labels: rawData.labels,
//     datasets: rawData.datasets.map((dataset) => ({
//       ...dataset,
//       backgroundColor: standardOptions.backgroundColor,
//       borderColor: standardOptions.borderColor,
//       borderWidth: standardOptions.borderWidth,
//     })),
//   };
// };
