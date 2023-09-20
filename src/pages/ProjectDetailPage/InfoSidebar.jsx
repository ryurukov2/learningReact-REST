import { Suspense, useEffect, useState } from "react";
import { Loading } from "../../components/Loading";
import { AddAssigneeModal } from "./AddAssigneeModal";
export function InfoSidebar({
  setAddAssigneeBtn,
  addAssigneeBtn,
  id,
  token,
  URL,
}) {
  const [assigneeEmail, setAssigneeEmail] = useState(false);
  const [projectOwner, setProjectOwner] = useState([]);
  const [projectAssigned, setProjectAssigned] = useState([]);
  const fetchOwnerAndAssigned = () => {
    console.log("fetching");
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
          console.log(data);
          throw Error(`${data.detail}`);
        }
      })
      .catch((e) => console.error(e));

    fetch(`${URL}/api/projects/${id}/retrieve_assigned`, {
      headers: headers_to_use,
    })
      .then((r) => {
        console.log(r)
        return r.json();
      })
      .then((data) => {
            console.log(data);
        if (data.status === 200) {
          setProjectOwner(data.owner);
        } else {
          console.log(data);
          throw Error(`${data.detail}`);
        }
      })
      .catch((e) => console.error(e));
  };

  useEffect(() => {
    fetchOwnerAndAssigned();
  }, []);

  return (
    <div className="base-border h-fit max-h-fit sticky top-4 text-right z-0">
      <div className="grid grid-cols-[min-content,1fr] place-content-center justify-items-start items-center gap-2 p-4 max-w-fit max-h-fit">
        {/* <div className="flex gap-2 justify-center place-items-center"> */}
        <div className="">Owner: </div>
        <div> {projectOwner}</div>
        {/* </div> */}
        {/* <div className=""> */}
        {/* <div className="grid grid-col gap-2 justify-center place-items-center"> */}
        <div>Assigned:</div>
        <div className="justify-items-start text-left">
          <div className="">asd</div>
          <div>asd</div>
          <div>asd</div>
          <div>asdasd</div>
          {/* </div> */}
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
              assigneeEmail={assigneeEmail}
              token={token}
              setAssigneeEmail={setAssigneeEmail}
              URL={URL}
            />
          </Suspense>
        )}
      </div>
    </div>
  );
}
