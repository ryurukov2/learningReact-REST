import React, { useState } from "react";
export function AddAssigneeModal({
  setAddAssigneeBtn,
  id,
  token,
  URL,
  fetchOwnerAndAssigned
}) {
  const [errorMessage, setErrorMessage] = useState(null)
  const [assigneeEmail, setAssigneeEmail] = useState([])
  const [isFocused, setIsFocused] = useState(false)
  const stylesForError = `${isFocused?'h-0 opacity-20':'h-fit opacity-100'} transition-all delay-150`
  const o1= 'opacity-10'
  const o2 = 'opacity-100'
  function handleAddAssignee(e) {
    e.preventDefault();
    console.log(assigneeEmail);
    let email = {
      username: assigneeEmail,
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
      .then(async (r) => {
        if (r.status === 200) {
          setAddAssigneeBtn(false);
          fetchOwnerAndAssigned();
          
        } else {
          // return r.json();
          const data = await r.json();
          setErrorMessage(data.detail)
          setIsFocused(false)
          throw new Error(`${data.detail}`);
        }
      })
      // .then((data) => {
      //   console.log(data)
      //   throw new Error(`${data.detail}`);
      // })
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
        className="relative rounded-2xl p-8 w-fit h-fit border-2 bg-gray-700 flex flex-col text-center bg-opacity-100 justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <form
          onSubmit={(e) => {
            handleAddAssignee(e);
          }}
        >
          Asignee username:
          <input
            type="text"
            name="asigneeEmail"
            onChange={(e) => {
              setAssigneeEmail(e.target.value);
            }}
            onFocus={() => {
              setIsFocused(true)
            }}
            required
          />
          <button type="submit" className="btn-primary">
            Add
          </button>
        </form>
        {/* {errorMessage && */}

          <div className={`${isFocused?o1:o2} delay-150 duration-200 transition-all`}>{errorMessage}</div>
        {/* } */}
      </div>
    </div>
  );
}
