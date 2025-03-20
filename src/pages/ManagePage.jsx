import React, { useState, useEffect } from "react";
import { Layout, Splitter, Button, Checkbox, Form, Input, Modal, InputNumber, message, Table  } from "antd";
import ChatHistory from "../components/ChatHistory";
import LinkTable from "../components/LinkTable";
import AddLink from "../components/AddLink";
import axios from "axios";

const { Content } = Layout;
const url = "http://127.0.0.1:5000"

const ManagePage = () => {
    const [data, setData] = useState([]);
     useEffect(() => {
        fetchLinks();
      }, []);

    const fetchLinks = () => {
      axios.get(`${url}/links`)
        .then(response => {
            setData(response.data.links);
        })
        .catch(error => {
            console.error("Error fetching chat history:", error);
        });
      };
    const handleDelete = (id) => {
      axios.delete(`${url}/link/${id}`)
          .then(() => {
              message.success('Deleted successfully');
              fetchLinks();
          })
          .catch(error => {
              console.error("Error deleting chat:", error);
          });
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
                        <AddLink refreshData={fetchLinks}/>
                    </Splitter.Panel>
                    <Splitter.Panel>
                        <LinkTable data={data} onDelete={handleDelete}/>
                    </Splitter.Panel>
            </Splitter>

            <h2>Table</h2>
        </div>
    );
};

export default ManagePage;
