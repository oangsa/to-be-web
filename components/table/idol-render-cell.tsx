import { User } from "@nextui-org/react";
import React from "react";


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
                    <span>{user.isDrug ? "✅" : "❌"}</span>
                </div>
            </div>
        );

    default:
      return cellValue;
  }
};
