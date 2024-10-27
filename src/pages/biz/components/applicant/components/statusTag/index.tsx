import styled from "styled-components";

interface StateTagProps {
  status: string;
}

const StatusTag = ({ status }: StateTagProps) => {
  const parseApplyStatus = (status: string) => {
    switch (status) {
      case "APPLIED":
        return "지원완료";
      case "DOCUMENT_PASSED":
        return "서류합격";
      case "FINAL_ACCEPTED":
        return "최종합격";
      case "REJECTED":
        return "불합격";
      case "CANCELED":
        return "지원취소";
    }
  };

  return (
    <StatusTagContainer $status={status}>
      {parseApplyStatus(status)}
    </StatusTagContainer>
  );
};

export default StatusTag;

const StatusTagContainer = styled.div<{ $status: string }>`
  width: 61px;
  height: 24px;
  border-radius: 4px;
  padding: 4px 9px;
  font-weight: var(--font-medium);
  font-size: 12px;
  letter-spacing: 2.52%;
  line-height: 133.4%;
  letter-spacing: 2.52%;
  background-color: ${({ $status }) => {
    if ($status === "APPLIED") {
      return "#f8f8f8";
    } else if ($status === "DOCUMENT_PASSED") {
      return "#FFFCF7";
    } else if ($status === "FINAL_ACCEPTED") {
      return "#f1fff6";
    } else if ($status === "REJECTED") {
      return "#fffafa";
    } else if ($status === "CANCELED") {
      return "#fffafa";
    }
  }};
  color: ${({ $status }) => {
    if ($status === "APPLIED") {
      return "#171719";
    } else if ($status === "DOCUMENT_PASSED") {
      return "#FF9200";
    } else if ($status === "FINAL_ACCEPTED") {
      return "#00BF40";
    } else if ($status === "REJECTED") {
      return "#FF4242";
    } else if ($status === "CANCELED") {
      return "#fffafa";
    }
  }};
`;
