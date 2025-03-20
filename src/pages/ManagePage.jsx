import React, { useState, useEffect } from "react";
import { Layout, Splitter, Button, Checkbox, Form, Input, Modal, InputNumber, message, Table  } from "antd";
import ChatHistory from "../components/ChatHistory";
import LinkTable from "../components/LinkTable";
import AddLink from "../components/AddLink";
import axios from "axios";

const { Content } = Layout;

const ManagePage = () => {
    const [data, setData] = useState([]);
     useEffect(() => {
        fetchLinks();
      }, []);

    const fetchLinks = async () => {
        try {
          //const response = await axios.get("http://localhost:1234/urls");
          const newData = [
                  { id: '1', url: "abc.com", childLevels: 1, excludeKeywords : "abc" },
                  { id: '2', url: 'xyz.com', childLevels: 2, excludeKeywords : "cbd" },
                ];
          //setData(response.data);
          setData(newData)
        } catch (error) {
          message.error("Failed to load data");
        }
      };
    const handleDelete = (id) => {
      const newData = data.filter((item) => item.id !== id);
      setData(newData);
      message.success('Deleted successfully');
    };


    return (
        <div>
            <Splitter
                style={{
                    height: '100vh',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                }}
                >
                    <Splitter.Panel defaultSize="20%" min="20%" max="70%">
                        <AddLink onSubmit="{fetchLinks}"/>
                    </Splitter.Panel>
                    <Splitter.Panel>
                        <LinkTable data={data} onDelete="{handleDelete}"/>
                    </Splitter.Panel>
            </Splitter>

            <h2>Table</h2>
        </div>
    );
};

export default ManagePage;
