import { ReactNode } from 'react';

type ModalProps = {
  isOpen: boolean;
  children: ReactNode;
};

const Modal = ({ isOpen, children }: ModalProps) => {
  return (
    isOpen && (
      <div className="z-10 fixed inset-0 bg-black/80 bg-opacity-75 flex items-center justify-center p-4">
        <div className="bg-background rounded-lg max-w-3xl w-full max-h-[90vh] overflow-hidden">
          {children}
        </div>
      </div>
    )
  );
};

export default Modal;
