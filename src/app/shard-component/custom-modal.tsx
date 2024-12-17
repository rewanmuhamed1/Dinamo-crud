
import {  Modal } from 'antd';


type ModelProp = {
    title: string;
    isOpen: boolean;
    onOk: () => void;
    onCancel: () => void;
    children: React.ReactNode;
  };

  const CustomModal :React.FC<ModelProp> =({ title, isOpen, onOk, onCancel, children })=> {
  return (
    <Modal title={title} open={isOpen} onOk={onOk} onCancel={onCancel}>
    {children}
  </Modal>
  );
}
export default CustomModal;