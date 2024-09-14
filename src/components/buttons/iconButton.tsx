import React from "react";
import styled from "styled-components";

interface IconButtonProps {
  children: React.ReactNode;
  size: number;
  variation: "normal" | "background" | "outlined" | "solid";
  disabled?: boolean;
  pushBadge?: boolean;
}

const IconButton = ({
  children,
  size,
  variation = "normal",
  disabled = false,
}: IconButtonProps) => {
  return (
    <IconButtonContainer
      $size={size}
      $variation={variation}
      disabled={disabled}
    >
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
  $variation: "normal" | "background" | "outlined" | "solid";
}>`
  padding: 8px;

  /* with Badge */
  position: relative;

  /* type */
  background-color: ${({ $variation }) => {
    if ($variation === "normal") {
      return "var(--color-white)";
    } else if ($variation === "background") {
      return "var(--color-gray13)";
    } else if ($variation === "outlined") {
      return "var(--color-white)";
    } else if ($variation === "solid") {
      return "var(--color-blue7)";
    }
  }};

  border: ${({ $variation }) => {
    if ($variation === "normal") {
      return "none";
    } else if ($variation === "background") {
      return "none";
    } else if ($variation === "outlined") {
      return "1px solid var(--color-gray13)";
    } else if ($variation === "solid") {
      return "none";
    }
  }};

  /* size */
  width: ${({ $size }) => `${$size}px`};
  height: ${({ $size }) => `${$size}px`};

  /* disabled */
  &:disabled {
    svg {
      stroke: ${({ $variation }) => {
        if ($variation === "normal") {
          return "var(--color-gray14)";
        } else if ($variation === "background") {
          return "var(--color-gray12)";
        } else if ($variation === "outlined") {
          return "1px solid var(--color-gray13)";
        } else if ($variation === "solid") {
          return "none";
        }
      }};
    }

    background-color: ${({ $variation }) => {
      if ($variation === "normal") {
        return "none";
      } else if ($variation === "background") {
        return "var(--color-gray15)";
      } else if ($variation === "outlined") {
        return "none";
      } else if ($variation === "solid") {
        return "var(--color-gray17)";
      }
    }};
  }

  /* hovered */
  &:hover {
    background-color: ${({ $variation }) => {
      if ($variation === "normal") {
        return "var(--color-gray12)";
      } else if ($variation === "background") {
        return "var(--color-gray13)";
      } else if ($variation === "outlined") {
        return "var(--color-gray13)";
      } else if ($variation === "solid") {
        return "var(--color-blue7)";
      }
    }};
  }

  /* focused */
  &:focus {
    background-color: ${({ $variation }) => {
      if ($variation === "normal") {
        return "var(--color-gray13)";
      } else if ($variation === "background") {
        return "var(--color-gray13)";
      } else if ($variation === "outlined") {
        return "var(--color-gray13)";
      } else if ($variation === "solid") {
        return "var(--color-blue7)";
      }
    }};
  }

  /* pressed */
  &:active {
    background-color: ${({ $variation }) => {
      if ($variation === "normal") {
        return "var(--color-gray12)";
      } else if ($variation === "background") {
        return "var(--color-gray13)";
      } else if ($variation === "outlined") {
        return "var(--color-gray13)";
      } else if ($variation === "solid") {
        return "var(--color-blue7)";
      }
    }};
  }
`;
