import React, { useEffect } from "react";
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
    setPosts: React.Dispatch<React.SetStateAction<any[] | null>>
    posts: any[] | null,
    setIsEditModalOpen : React.Dispatch<React.SetStateAction<boolean>>,
    isEditModalOpen : boolean,
    postId: number
  }
const EditModal:React.FC<PostModalProps> = ({ setPosts, posts , isEditModalOpen ,setIsEditModalOpen , postId}) => {
  const [form] = Form.useForm();
  

  useEffect(() => {
    async function fetchPost() {
     
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
        const data = await response.json();
        form.setFieldsValue({
          title: data.title,
          body: data.body,
        });
      } catch (error) {
        message.error("Failed to fetch post data!");
      } 
    }

    if (isEditModalOpen) fetchPost(); // Fetch data only when modal is visible
  }, [postId, isEditModalOpen, form]);


  const handleOk = () => {
    setIsEditModalOpen(false);
  };

  const handleCancel = () => {
    setIsEditModalOpen(false);
  };

  
    const onFinish =async  (values: any) => {
      //  console.log("values", values);
try{
const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`,{
  method: "PUT",
  body: JSON.stringify(values ),

});
if (response.ok) {
    message.success("Post edit successfully!");
    const newData = posts ?[...posts]:null;
    const index = newData!.findIndex((post) => postId === post.id);
    const item = newData![index];
    newData!.splice(index, 1, {
      ...item,
      ...values,
    });
    setPosts(newData);

  setIsEditModalOpen(false);
  form.resetFields(); 
  
}else{
  message.error('Faild to edit');
}
}catch{
  message.error('Faild to edit');
}
     
        
      };


  return (
    <>
      <CustomModal
        title="Edit Post"
        isOpen={isEditModalOpen}
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
          Save
        </Button>
      </Form.Item>
    </Form>
       
      </CustomModal>
    </>
  );
};

export default EditModal;
