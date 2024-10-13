import styled from "styled-components";
import { useState } from "react";
import TroupeDetail from "./components/troupeDetail";
import EditTroupe from "./components/\beditTroupe";

const ManageTroupe = () => {
  const [isEditTroupe, setIsEditTroupe] = useState(false);

  const handleEditTroupe = () => {
    setIsEditTroupe(true);
  };

  return (
    <ManageTroupeContainer>
      {!isEditTroupe && <TroupeDetail onClick={handleEditTroupe} />}
      {isEditTroupe && <EditTroupe />}
    </ManageTroupeContainer>
  );
};

export default ManageTroupe;

const ManageTroupeContainer = styled.div``;
