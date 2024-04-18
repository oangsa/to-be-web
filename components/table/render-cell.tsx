import { User, Tooltip, Chip } from "@nextui-org/react";
import React from "react";
import { DeleteIcon } from "../icons/table/delete-icon";
import { EditIcon } from "../icons/table/edit-icon";
import { EyeIcon } from "../icons/table/eye-icon";
import { confirmDelete } from "../modals/deleteStudent";
import { EditStudentAdmin } from "../modals/editStudentAdmin";

export const RenderCell = ({ user, columnKey }: any) => {
  // @ts-ignore
  const cellValue = user[columnKey];
  const studentId: number = user.studentId
  const del = async () => {
    confirmDelete(user.studentId)
    return setTimeout(() => window.location.reload(), 2020)
  }
  switch (columnKey) {
    case "studentId":
      return (
        <User
          avatarProps={{
            src: user.image,
          }}
          name={cellValue}
        >
        </User>
      );
    case "class":
      return (
        <div>
          <div>
            <span>ม. {user.yearClass}/{user.Class}</span>
          </div>
        </div>
      );

    case "actions":
      return (
        <div className="flex items-center gap-4 ">
          <div>
            <EditStudentAdmin sid={studentId}/>
          </div>
          <div>
            <Tooltip content={"Delete"} color="danger">
              <button onClick={() => del()}>
                <DeleteIcon size={20} fill="#FF0080" />
              </button>
            </Tooltip>
          </div>
        </div>
      );
    default:
      return cellValue;
  }
};
