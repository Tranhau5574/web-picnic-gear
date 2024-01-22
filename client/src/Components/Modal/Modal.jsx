// ErrorModal.jsx
import React from 'react';
import Modal from 'react-modal';
import { X } from 'phosphor-react';

const ErrorModal = ({ isOpen, onClose, errorMessage }) => {
  const customStyles = {
    content: {
      width: 'auto',
      height: 'auto',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
    errorHeader: {
      textAlign: 'right',
      marginBottom: '10px',
      position: 'absolute',
      top: '10px',
      right: '10px',
      fontWeight: 'bold',
    },
    errorContent: {
      textAlign: 'center',
    },
    closeButton: {
      textAlign: 'center',
      marginTop: '40px',
      marginRight: '90px',

    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Error Modal"
      style={customStyles}
    >
      <div style={customStyles.errorHeader}>
        <X onClick={onClose} size={35} weight="fill" />
      </div>
      <h2 style={customStyles.errorContent}>Error</h2>
      <p style={customStyles.errorContent}>{errorMessage}</p>
      <div style={customStyles.closeButton}>
        <button onClick={onClose}>Close</button>
      </div>
    </Modal>
  );
};

export default ErrorModal;
