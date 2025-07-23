import React, { useState } from 'react';
import '../../styles/user/ReportForm.css';

const ContentReportForm = ({ isOpen, onClose, onSubmit }) => {
  const [selectedReason, setSelectedReason] = useState('');
  const [customReason, setCustomReason] = useState('');

  const reportReasons = [
    { id: 'spam', label: '스팸 또는 광고입니다' },
    { id: 'inappropriate', label: '욕설, 비방 또는 혐오 발언입니다' },
    { id: 'sensitive', label: '선정적이거나 불쾌한 콘텐츠입니다' },
    { id: 'fake', label: '잘못된 정보 또는 허위사실입니다' },
    { id: 'other', label: '기타 (직접 작성)' }
  ];

  const handleReasonChange = (reasonId) => {
    setSelectedReason(reasonId);
  };

  const handleSubmit = () => {
    if (!selectedReason) {
      alert('신고 사유를 선택해주세요.');
      return;
    }

    if (selectedReason === 'other' && !customReason.trim()) {
      alert('기타 사유를 작성해주세요.');
      return;
    }

    const finalReason = selectedReason === 'other'
      ? customReason.trim()
      : reportReasons.find(r => r.id === selectedReason)?.label;

    if (finalReason) {
      onSubmit(finalReason); // ✅ 외부에서 처리 (Recipe.jsx에서 Axios 요청 등)
    }

    handleClose();
  };

  const handleClose = () => {
    setSelectedReason('');
    setCustomReason('');
    onClose(); // ✅ 모달 닫기
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
            <div className="reportIcon">⚠️</div>
            <h2 className="reportTitle">신고하기</h2>
          </div>
          <button className="closeButton" onClick={handleClose}>×</button>
        </div>

        <div className="headerDivider"></div>

        <div className="reportQuestion">
          <p>신고 사유를 선택해주세요.</p>
        </div>

        <div className="reasonsList">
          {reportReasons.map((reason) => (
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
          <button type="button" onClick={handleClose} className="cancelButton">취소</button>
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
            ⚠️ 신고하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContentReportForm;
