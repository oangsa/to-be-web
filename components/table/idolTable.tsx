"use client"
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Pagination} from "@nextui-org/react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import getRegList from "@/libs/getRegList";
import { IdolRenderCell } from "./idol-render-cell";
export const revalidate = 60

export const IdolTableWrapper = () => {
  const [data, setData] = useState<any[]>([])
  const test = useCallback(async () => {
    const data:any = await getRegList()
    await setData(data)
  }, [])
  // const isFirstRender = useRef(true);
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    test()
  }, [test]);

  const pages = Math.ceil(data.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return data.slice(start, end);
  }, [page, data]);
  
  const columns = [
    {uid: 'studentId', name: 'เลขประจำตัวนักเรียน'},
    {uid: 'name', name: 'ชื่อ'},
    {uid: 'surname', name: 'นามสกุล'},
    {uid: 'class', name: 'ชั้น/ห้อง'},
    {uid: 'age', name: 'อายุ'},
    {uid: 'Height', name: 'ความสูง'},
    {uid: 'Weight', name: 'น้ำหนัก'},
    {uid: 'Gpax', name: 'เกรดเฉลี่ย'},
    {uid: 'talent', name: 'ความสามารถพิเศษ'},
    {uid: 'isDrug', name: 'มีประวัติยุ่งเกี่ยวกับสารเสพติด'},
    {uid: 'actions', name: 'ลบรายชื่อ'},

  ]


  return (
    <div className=" w-full flex flex-col gap-4">
      <Table aria-label="Example table with custom cells" bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="secondary"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      }
      classNames={{
        wrapper: "min-h-[222px]",
      }}>
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={items}>
          {(item) => (
            <TableRow>
              {(columnKey) => (
                <TableCell>
                  {IdolRenderCell({ user: item, columnKey: columnKey })}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
