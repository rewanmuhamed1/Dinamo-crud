import React, { useState } from "react";
import CustomModal from "../shard-component/custom-modal";
import { Button, Form, Input,message , Alert} from 'antd';


const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },
  };
  interface PostModalProps {
    setPosts: React.Dispatch<React.SetStateAction<any[] | null>>;
    posts: any[] | null;
  }
const PostModal:React.FC<PostModalProps> = ({ setPosts, posts }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  



  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  
    const onFinish =async  (values: any) => {
      //  console.log("values", values);
try{
const response = await fetch('https://jsonplaceholder.typicode.com/posts',{
  method: "POST",
  body: JSON.stringify(values),

});
if (response.ok) {
  const newPost = {...values , id : posts!.length+1};
  message.success("Post added successfully!");
  setPosts([{ ...newPost }, ...(posts || [])]);
  setIsModalOpen(false);
  form.resetFields(); 
  
}else{
  message.error('Faild to Submit');
}
}catch{
  message.error('Faild to Submit');
}
     
        
      };


  return (
    <>
      <Button type="primary" onClick={showModal} style={{ marginBottom: 16 }}>
        Add Post
      </Button>
      <CustomModal
        title="Add Post"
        isOpen={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >

        <Form
      {...formItemLayout}
      form={form}
      style={{ maxWidth: 600 }}
      initialValues={{ variant: 'filled' }}
      onFinish={onFinish}
    >
     
      <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Title is Required!' }]}>
        <Input />
      </Form.Item>

      <Form.Item
        label="Body"
        name="body"
        rules={[{ required: true, message: 'Body is Required!' }]}
      >
        <Input.TextArea />
      </Form.Item>


      
      <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
       
      </CustomModal>
    </>
  );
};

export default PostModal;
