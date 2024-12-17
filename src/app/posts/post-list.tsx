'use client'
import React ,{ useState, useEffect } from 'react'
import {Posts} from '../module/posts'
import DataTable from '../shard-component/data-table'
import {  Layout,Popconfirm ,message,Button} from 'antd';
import PostModal from './post-model';
import EditModal from './edit-model';


const {  Content } = Layout;


const PostList :React.FC =()=> {
  const [posts, setPosts] = useState<Posts[] | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [postId, setPostId] = useState<number>(0);
  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts')
      const data = await res.json()
      setPosts(data)
    }
    fetchPosts()
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Remove the deleted post from the table
        const newData = posts?.filter((post) => post.id !== id);
        setPosts(newData||null);

        message.success("Post deleted successfully!");
      } else {
        message.error("Failed to delete the post!");
      }
    } catch {
      message.error("Failed to delete the post!");
    }
  };

  const showEditModal = (id:number) => {
    setPostId(id);
    setIsEditModalOpen(true);

  };

  const columns = [
    {
        title: "#",
        dataIndex: "number",
        key: "number",
        defaultSortOrder: 'ascend',
        sorter: (a:any, b:any) => a.number  - b.number,
      },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Body',
      dataIndex: 'body',
      key: 'body',
      width:'50%'
    },
    {
        title: 'Action',
        dataIndex: '',
        key: 'action',
        
        render: (_:any,record:any) =>
          posts!.length >= 1 ? (
            <>
            <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
            <Button danger type="text">Delete</Button>
          </Popconfirm> |
           <Button type="text" onClick={()=>showEditModal(record.id)} >Edit</Button>
            </>
          
        ) : null,
      
    
        
    
      },
  ];
  //added key because of key error loop 
  const dataSource = posts ? posts.map((post, i ) => ({ ...post, key: post.id , number:i+1 })) : null;

  
  if (!posts) return <div>Loading...</div>
 
  return (
  
  <Content style={{ padding: '30px 48px' }}>
 <PostModal setPosts={setPosts} posts={posts} />
<EditModal setPosts={setPosts} posts={posts} isEditModalOpen={isEditModalOpen} setIsEditModalOpen={setIsEditModalOpen} postId={postId}/>
 <DataTable dataSource = {dataSource}  columns = {columns}/>
    </Content>
   
  
   
  )
}
export default PostList;
