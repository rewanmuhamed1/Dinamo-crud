import { Table } from "antd";

export default function DataTable({dataSource , columns}:any) {
  return (
   <div>
   <Table dataSource={dataSource} columns={columns} scroll={{ x: 300 }} />;

   </div>
  );
}