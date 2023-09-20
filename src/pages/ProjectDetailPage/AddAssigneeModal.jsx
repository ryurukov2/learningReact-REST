import React from "react";
export function AddAssigneeModal({
  setAddAssigneeBtn,
  id,
  assigneeEmail,
  token,
  setAssigneeEmail,
  URL,
}) {
  function handleAddAssignee(e) {
    e.preventDefault();
    console.log(assigneeEmail);
    let email = {
      user_email: assigneeEmail,
    };
    let headers_to_use = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };
    fetch(`${URL}/api/projects/${id}/add_assignee`, {
      method: "PUT",
      headers: headers_to_use,
      body: JSON.stringify(email),
    })
      .then((r) => {
        if (r.status === 200) {
          setAddAssigneeBtn(false);
        } else {
          return r.json();
        }
      })
      .then((data) => {
        throw Error(`${data.detail}`);
      })
      .catch((e) => {
        console.error(e);
      });
  }

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-80 flex items-center justify-center z-50"
      onClick={() => setAddAssigneeBtn(false)}
    >
      <div
        className="relative rounded-2xl p-8 w-fit h-fit border-2 bg-gray-700 flex bg-opacity-100 justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <form
          onSubmit={(e) => {
            handleAddAssignee(e);
          }}
        >
          Asignee email:
          <input
            type="text"
            name="asigneeEmail"
            onChange={(e) => {
              setAssigneeEmail(e.target.value);
            }}
          />
          <button type="submit" className="btn-primary">
            Add
          </button>
        </form>
      </div>
    </div>
  );
}
