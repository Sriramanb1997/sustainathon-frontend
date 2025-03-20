import React, { useState } from "react";
import { Layout, Splitter, Button, Checkbox, Form, Input, Modal, InputNumber, message, Table  } from "antd";
import ChatHistory from "../components/ChatHistory";
import ChatPane from "../components/ChatPane";
import ChatInput from "../components/ChatInput";
import axios from "axios";

const url = "http://127.0.0.1:5000"

const AddLink = ({ refreshData }) => {
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [form] = Form.useForm();

      const showModal = () => {
        setIsModalOpen(true);
      };

      const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
      };

      const handleSubmit = async (values) => {
        try {
          await axios.post(`${url}/link`, values);
          message.success("Submitted successfully");
          setIsModalOpen(false);
          refreshData();
          form.resetFields();
        } catch (error) {
          message.error("Submission failed");
        }
      };


    return (
        <div style={{ padding: 20 }}>
          <Button type="primary" onClick={showModal}>
            Add URL
          </Button>
          <Modal
            title="Enter Details"
            open={isModalOpen}
            onCancel={handleCancel}
            footer={null}
          >
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
            >
              <Form.Item
                name="url"
                label="URL"
                rules={[
                  { required: true, message: "Please enter a URL" },
                  { type: "url", message: "Enter a valid URL" },
                ]}
              >
                <Input placeholder="Enter URL" />
              </Form.Item>

              <Form.Item
                name="childLevels"
                label="Child Levels"
                rules={[{ required: false, message: "Please enter a number", default: 1 }]}
              >
                <InputNumber style={{ width: "100%" }} min={1} placeholder="Enter number" />
              </Form.Item>

              <Form.Item name="excludeKeywords" label="Exclude Keywords">
                <Input placeholder="Enter keywords (comma separated)" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </div>
    );
};

export default AddLink;

