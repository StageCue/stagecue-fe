import styled from "styled-components";
import CheckboxSVG from "@assets/icons/checkbox.svg?react";
import CheckboxCheckedSVG from "@assets/icons/checkbox_checked.svg?react";

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
  label?: string;
}

const Checkbox = ({ checked, onChange, label }: CheckboxProps) => {
  return (
    <CheckboxInputWrapper onClick={onChange}>
      {checked ? <CheckboxCheckedSVG /> : <CheckboxSVG />}
      {label && <CheckboxLabel>{label}</CheckboxLabel>}
    </CheckboxInputWrapper>
  );
};

export default Checkbox;

const CheckboxInputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1px;
  cursor: pointer;
`;

const CheckboxLabel = styled.label`
  cursor: pointer;
  user-select: none;
  font-weight: var(--font-regular);
  font-size: 14px;
  line-height: 142.9%;
  letter-spacing: 1.45%;
  color: #171719;
  height: 18px;
`;
