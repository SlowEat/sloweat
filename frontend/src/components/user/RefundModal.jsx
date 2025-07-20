import React, { useState } from 'react';
import '../../styles/user/ReportForm.css';

const RefundModal = ({ isOpen, onClose, onSubmit }) => {
  const [selectedReason, setSelectedReason] = useState('');
  const [customReason, setCustomReason] = useState('');

  const refundReasons = [
     { id: 'service_dissatisfaction', label: '서비스 불만족' },
     { id: 'duplicate_payment', label: '중복 결제' },
     { id: 'payment_error', label: '결제 오류' },
     { id: 'other', label: '기타 (직접 작성)' }
   ];
  const handleReasonChange = (reasonId) => {
    setSelectedReason(reasonId);
  };

  const handleSubmit = () => {
    if (!selectedReason) {
      alert('환불 사유를 선택해주세요.');
      return;
    }

    if (selectedReason === 'other' && !customReason.trim()) {
      alert('기타 사유를 작성해주세요.');
      return;
    }

    const finalReason = selectedReason === 'other'
      ? customReason
      : refundReasons.find(r => r.id === selectedReason)?.label;

    onSubmit(finalReason);
    handleClose();
  };

  const handleClose = () => {
    setSelectedReason('');
    setCustomReason('');
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="reportFormContainer" onClick={handleBackdropClick}>
      <div className="reportFormWrapper">
        <div className="reportHeader">
          <div className="headerLeft">
            <div className="reportIcon"></div>
            <h2 className="reportTitle">환불하기</h2>
          </div>
          <button className="closeButton" onClick={handleClose}>×</button>
        </div>

        <div className="headerDivider"></div>

        <div className="reportQuestion">
          <p>
            <span className="questionMark"></span>
            환불 사유를 선택해주세요.
          </p>
        </div>

        <div className="reasonsList">
          {refundReasons.map((reason) => (
            <label key={reason.id} className="reasonOption">
              <input
                type="radio"
                name="reportReason"
                value={reason.id}
                checked={selectedReason === reason.id}
                onChange={() => handleReasonChange(reason.id)}
                className="reasonRadio"
              />
              <span className="reasonLabel">{reason.label}</span>
            </label>
          ))}
        </div>

        {selectedReason === 'other' && (
          <div className="customReasonWrapper">
            <textarea
              className="customReasonInput"
              placeholder="기타 사유를 작성해주세요..."
              value={customReason}
              onChange={(e) => setCustomReason(e.target.value)}
              rows={3}
            />
          </div>
        )}

        <div className="buttonGroup">
          <button
            type="button"
            onClick={handleClose}
            className="cancelButton"
          >
            취소
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className={`submitButton ${
              selectedReason && (selectedReason !== 'other' || customReason.trim())
                ? 'enabled'
                : 'disabled'
            }`}
            disabled={!selectedReason || (selectedReason === 'other' && !customReason.trim())}
          >
            환불하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default RefundModal;
