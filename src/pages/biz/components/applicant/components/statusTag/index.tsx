import styled from 'styled-components';

interface StateTagProps {
  status: string;
}

const StatusTag = ({ status }: StateTagProps) => {
  const parseApplyStatus = (status: string) => {
    switch (status) {
      case 'APPLY':
        return '미열람';
      case 'OPEN':
        return '열람';
      case 'PASS':
        return '서류합격';
      case 'WIN':
        return '최종합격';
      case 'LOSE':
        return '불합격';
      case 'CANCELED':
        return '지원취소';
    }
  };

  return <StatusTagContainer $status={status}>{parseApplyStatus(status)}</StatusTagContainer>;
};

export default StatusTag;

const StatusTagContainer = styled.div<{ $status: string }>`
  height: 24px;
  border-radius: 4px;
  padding: 4px 9px;
  font-weight: var(--font-medium);
  font-size: 12px;
  letter-spacing: 2.52%;
  line-height: 133.4%;
  letter-spacing: 2.52%;
  background-color: ${({ $status }) => {
    if ($status === 'APPLY') {
      return '#37383C47';
    } else if ($status === 'OPEN') {
      return '#f8f8f8';
    } else if ($status === 'PASS') {
      return '#FFFCF7';
    } else if ($status === 'WIN') {
      return '#f1fff6';
    } else if ($status === 'LOSE') {
      return '#fffafa';
    } else if ($status === 'CANCELED') {
      return '#fffafa';
    }
  }};
  color: ${({ $status }) => {
    if ($status === 'APPLY') {
      return '#171719';
    } else if ($status === 'PASS') {
      return '#FF9200';
    } else if ($status === 'WIN') {
      return '#00BF40';
    } else if ($status === 'LOSE') {
      return '#FF4242';
    } else if ($status === 'CANCELED') {
      return '#fffafa';
    }
  }};
`;
