import React, { useState } from "react";
import {
  RiArrowDropDownLine,
  RiEdit2Line,
  RiArrowDropUpLine,
} from "react-icons/ri";
import { IoMdCloseCircleOutline } from "react-icons/io";
import {
  AiFillDelete,
  AiOutlineCheckCircle,
  AiOutlineClose,
} from "react-icons/ai";
import Dialog from "@mui/material/Dialog";

const UserListItem = ({
  user,
  active,
  editMode,
  onAccordionClick,
  onEditClick,
  onSaveClick,
  onCancelClick,
  onDeleteClick,
  onInputChange,
}) => {
  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return `${age} years`;
  };

  const [openDialog, setOpenDialog] = useState(false);
  const [editedAge, setEditedAge] = useState(calculateAge(user.dob));
  const [name, setName] = useState(user.first + " " + user.last);

  const handleAgeChange = (e) => {
    setEditedAge(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const openDialogBox = () => {
    setOpenDialog(true);
  };

  return (
    <div
      className="container"
      style={{ display: "flex", alignItems: "center" }}
    >
      <div className="item" style={{ width: 500 }}>
        <button
          onClick={() => onAccordionClick(user.id)}
          className={`accordion ${active ? "active" : ""}`}
        >
          {editMode ? (
            ""
          ) : (
            <div className="title">
              <img src={user.picture} alt={`${user.first} ${user.last}`} />
              <div
                style={{
                  justifyContent: "space-around",
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  fontSize: 22,
                  marginLeft: -50,
                }}
              >
                {name}
                {active ? (
                  <RiArrowDropUpLine
                    size={50}
                    style={{ marginLeft: "25%", marginRight: -91 }}
                    color="#767679"
                  />
                ) : (
                  <RiArrowDropDownLine
                    size={50}
                    style={{ marginLeft: "25%", marginRight: -91 }}
                    color="#767679"
                  />
                )}
              </div>
            </div>
          )}
        </button>

        {active && (
          <div>
            {editMode ? (
              <div className="title">
                <img src={user.picture} alt={`${user.first} ${user.last}`} />
                <div
                  style={{
                    justifyContent: "space-around",
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    fontSize: 22,
                  }}
                >
                  <input type="text" value={name} onChange={handleNameChange} />
                  {active ? (
                    <RiArrowDropUpLine
                      size={100}
                      style={{ marginLeft: "25%" }}
                      color="#767679"
                    />
                  ) : (
                    <RiArrowDropDownLine
                      size={100}
                      style={{ marginLeft: "25%" }}
                      color="#767679"
                    />
                  )}
                </div>
              </div>
            ) : (
              ""
            )}

            <div className="content" style={{ marginLeft: "3%" }}>
              {editMode ? (
                <div style={{ display: "inline", marginRight: "20%" }}>
                  <p>Age:</p>
                  <input
                    type="text"
                    style={{ borderRadius: 10 }}
                    value={editedAge}
                    onChange={handleAgeChange}
                  />
                </div>
              ) : (
                <div style={{ display: "inline", marginRight: "20%" }}>
                  <p>Age:</p>
                  <p style={{ color: "#1f1f24" }}>{editedAge}</p>
                </div>
              )}
              {editMode ? (
                <div style={{ display: "inline", marginRight: "20%" }}>
                  <p>Gender:</p>
                  <select
                    value={user.gender}
                    onChange={(e) =>
                      onInputChange(user.id, "gender", e.target.value)
                    }
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Transgender">Transgender</option>
                    <option value="Rather not say">Rather not say</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              ) : (
                <div style={{ display: "inline", marginRight: "20%" }}>
                  <p>Gender:</p>
                  <p style={{ color: "#1f1f24" }}>{user.gender}</p>
                </div>
              )}
              {editMode ? (
                <div style={{ display: "inline" }}>
                  <p>Country:</p>
                  <input
                    type="text"
                    value={user.country}
                    onChange={(e) =>
                      onInputChange(user.id, "country", e.target.value)
                    }
                  />
                </div>
              ) : (
                <div style={{ display: "inline" }}>
                  <p>Country:</p>
                  <p style={{ color: "#1f1f24" }}>{user.country}</p>
                </div>
              )}
              {editMode ? (
                <div className="grid-item">
                  <p>Description:</p>
                  <textarea
                    rows={5}
                    cols={62}
                    value={user.description}
                    onChange={(e) =>
                      onInputChange(user.id, "description", e.target.value)
                    }
                  />
                </div>
              ) : (
                <div
                  className="grid-item"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: 10,
                    padding: 4,
                    textAlign: "left",
                  }}
                >
                  <div style={{ display: "inline" }}>
                    <p style={{ display: "flex" }}>Description:</p>
                    <p style={{ color: "#1f1f24" }}>{user.description}</p>
                  </div>
                </div>
              )}
              {editMode ? (
                <div
                  className="grid-item"
                  style={{ marginLeft: "22rem", display: "flex" }}
                >
                  <button onClick={() => onSaveClick(user.id)}>
                    <AiOutlineCheckCircle color="green" size={30} />
                  </button>
                  <button onClick={() => onCancelClick(user.id)}>
                    <IoMdCloseCircleOutline color="red" size={30} />
                  </button>
                </div>
              ) : null}
              {!editMode && (
                <div
                  className="grid-item"
                  style={{ marginLeft: "22rem", display: "flex" }}
                >
                  <button onClick={openDialogBox}>
                    <AiFillDelete color="red" size={30} />
                  </button>
                  <div>
                    <Dialog
                      onClose={handleClose}
                      open={openDialog}
                      className="dialog"
                    >
                      <p className="dialogH3">
                        Are you sure you want to delete?
                        <AiOutlineClose size={25} onClick={handleClose} />
                      </p>
                      <br />
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          gap: 8,
                          marginLeft: "17rem",
                        }}
                      >
                        <button className="cancel" onClick={handleClose}>
                          Cancel
                        </button>
                        <button
                          className="delete"
                          onClick={() => onDeleteClick(user.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </Dialog>
                  </div>
                  <button onClick={() => onEditClick(user.id)}>
                    <RiEdit2Line color="blue" size={30} />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserListItem;
