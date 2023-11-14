import { Tooltip, User } from "@nextui-org/react";
import React from "react";
import { DeleteIcon } from "../icons/table/delete-icon";
import idolDeleteUser from "@/libs/user/deleteIdolUser";


export const IdolRenderCell = ({ user, columnKey }: any) => {
  // @ts-ignore
  const cellValue = user.student[columnKey] === undefined? user[columnKey] : user.student[columnKey];
  // console.log(columnKey)
  switch (columnKey) {
    case "studentId":
      return (
        <User
          avatarProps={{
            src: user.student.image,
          }}
          name={cellValue}
        >
        </User>
      );
    case "class":
        return (
            <div>
              <div>
                  <span>ม. {user.student.yearClass}/{user.student.Class}</span>
              </div>
            </div>
        );
    
    case "isDrug":
        return (
            <div>
                <div>
                    <span className="flex items-center">{user.isDrug ? "✅" : "❌"}</span>
                </div>
            </div>
    );

    case "actions":
      return (
        <div className="flex items-center">
          <div>
            <Tooltip
              content={"Delete"}
              color="danger"
            >
              <button onClick={() => idolDeleteUser(user.student.studentId)}>
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
