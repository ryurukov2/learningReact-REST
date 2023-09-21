import { Suspense, useEffect, useState } from "react";
import { Loading } from "../../components/Loading";
import { AddAssigneeModal } from "./AddAssigneeModal";
export function InfoSidebar({
  setAddAssigneeBtn,
  addAssigneeBtn,
  id,
  token,
  URL,
  created_on,
}) {
  const [projectOwner, setProjectOwner] = useState([]);
  const [projectAssigned, setProjectAssigned] = useState([]);
  const created = new Date(created_on);
  const fetchOwnerAndAssigned = () => {
    const headers_to_use = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };

    fetch(`${URL}/api/projects/${id}/retrieve_owner`, {
      headers: headers_to_use,
    })
      .then((r) => {
        return r.json();
      })
      .then((data) => {
        if (data.status === 200) {
          //   console.log(data.owner);
          setProjectOwner(data.owner);
        } else {
          throw new Error(`${data.detail}`);
        }
      })
      .catch((e) => console.error(e));

    fetch(`${URL}/api/projects/${id}/list_assigned`, {
      headers: headers_to_use,
    })
      .then(async (response) => {
        if (response.ok) {
          const data = await response.json();
          setProjectAssigned(data.results);
        } else {
          const data_1 = await response.json();
          throw new Error(data_1.detail || "Something went wrong");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchOwnerAndAssigned();
  }, []);

  return (
    <div className="base-border h-fit max-h-fit sticky top-4 text-right z-0">
      <div className="grid grid-cols-[min-content,1fr] place-content-center justify-items-start text-start items-center gap-2 p-4 max-w-fit max-h-fit">
        <div className="">Owner: </div>
        <div> {projectOwner}</div>
        <div>Assigned:</div>
        <div className="justify-items-start text-left">
          {projectAssigned.map((assigned) => (
            <div key={assigned.id}>{assigned.username}</div>
          ))}
        </div>
        <div>Created on:</div>
        <div>
          {created.toDateString()} {created.toTimeString().split(" ")[0]}
        </div>
      </div>
      <button
        className="btn-primary justify-self-end text-right"
        onClick={() => setAddAssigneeBtn(true)}
      >
        Add Assignee
      </button>
      <div className="">
        {addAssigneeBtn === true && (
          <Suspense fallback={<Loading />}>
            <AddAssigneeModal
              setAddAssigneeBtn={setAddAssigneeBtn}
              id={id}
              token={token}
              URL={URL}
              fetchOwnerAndAssigned={fetchOwnerAndAssigned}
            />
          </Suspense>
        )}
      </div>
    </div>
  );
}
