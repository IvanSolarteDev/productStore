import { Modal , type ModalProps  } from "../../../shared/components/modal/modal";



export const OpenImage = ({ isOpen, onClose }: ModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <img
        className="h-auto max-h-[85vh] w-auto max-w-[90vw] md:max-w-[40vw]"
        src="https://http2.mlstatic.com/D_Q_NP_774245-MLA115905303252_092026-F.webp"
        alt="Control PlayStation DualSense"
      />
    </Modal>
  );
};
