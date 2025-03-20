import React from "react";
import { Table, Button } from "antd";

const LinkTable = ({ data, onDelete }) => {
  const columns = [
    { title: "URL", dataIndex: "url", key: "url" },
    { title: "Child Levels", dataIndex: "childLevels", key: "childLevels" },
    { title: "Exclude Keywords", dataIndex: "excludeKeywords", key: "excludeKeywords" },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button type="link" onClick={() => onDelete(record.id)}>
          Delete
        </Button>
      ),
    },
  ];

  return <Table dataSource={data} columns={columns} rowKey={(record, index) => record.id || index} style={{ marginTop: 20 }} />;
};

export default LinkTable;
