import React from "react";
import styled from "styled-components";

interface IconButtonProps {
  children: React.ReactNode;
  size: number;
  type: "normal" | "background" | "outlined" | "solid";
  disabled?: boolean;
  pushBadge?: boolean;
}

const IconButton = ({
  children,
  size,
  type = "normal",
  disabled = false,
}: IconButtonProps) => {
  return (
    <IconButtonContainer $size={size} $type={type} disabled={disabled}>
      {children}
      <Badge />
    </IconButtonContainer>
  );
};

export default IconButton;

const Badge = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--color-blue7);
  position: absolute;
  top: -2px;
  right: -2px;
`;

const IconButtonContainer = styled.button<{
  $size: number;
  $type: "normal" | "background" | "outlined" | "solid";
}>`
  padding: 8px;

  /* with Badge */
  position: relative;

  /* type */
  background-color: ${({ $type }) => {
    if ($type === "normal") {
      return "var(--color-white)";
    } else if ($type === "background") {
      return "var(--color-gray13)";
    } else if ($type === "outlined") {
      return "var(--color-white)";
    } else if ($type === "solid") {
      return "var(--color-blue7)";
    }
  }};

  border: ${({ $type }) => {
    if ($type === "normal") {
      return "none";
    } else if ($type === "background") {
      return "none";
    } else if ($type === "outlined") {
      return "1px solid var(--color-gray13)";
    } else if ($type === "solid") {
      return "none";
    }
  }};

  /* size */
  width: ${({ $size }) => `${$size}px`};
  height: ${({ $size }) => `${$size}px`};

  /* disabled */
  &:disabled {
    svg {
      stroke: ${({ $type }) => {
        if ($type === "normal") {
          return "var(--color-gray14)";
        } else if ($type === "background") {
          return "var(--color-gray12)";
        } else if ($type === "outlined") {
          return "1px solid var(--color-gray13)";
        } else if ($type === "solid") {
          return "none";
        }
      }};
    }

    background-color: ${({ $type }) => {
      if ($type === "normal") {
        return "none";
      } else if ($type === "background") {
        return "var(--color-gray15)";
      } else if ($type === "outlined") {
        return "none";
      } else if ($type === "solid") {
        return "var(--color-gray17)";
      }
    }};
  }

  /* hovered */
  &:hover {
    background-color: ${({ $type }) => {
      if ($type === "normal") {
        return "var(--color-gray12)";
      } else if ($type === "background") {
        return "var(--color-gray13)";
      } else if ($type === "outlined") {
        return "var(--color-gray13)";
      } else if ($type === "solid") {
        return "var(--color-blue7)";
      }
    }};
  }

  /* focused */
  &:focus {
    background-color: ${({ $type }) => {
      if ($type === "normal") {
        return "var(--color-gray13)";
      } else if ($type === "background") {
        return "var(--color-gray13)";
      } else if ($type === "outlined") {
        return "var(--color-gray13)";
      } else if ($type === "solid") {
        return "var(--color-blue7)";
      }
    }};
  }

  /* pressed */
  &:active {
    background-color: ${({ $type }) => {
      if ($type === "normal") {
        return "var(--color-gray12)";
      } else if ($type === "background") {
        return "var(--color-gray13)";
      } else if ($type === "outlined") {
        return "var(--color-gray13)";
      } else if ($type === "solid") {
        return "var(--color-blue7)";
      }
    }};
  }
`;
