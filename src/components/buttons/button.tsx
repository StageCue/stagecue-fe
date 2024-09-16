import React from "react";
import styled from "styled-components";

interface ButtonProps {
  children: React.ReactNode;
  variation: "solid" | "outlined" | "text" | "floating";
  btnClass: "primary" | "secondary" | "assistive";
  size?: "large" | "medium" | "small" | "manual";
  type?: "button" | "submit" | "reset" | undefined;
  width?: number;
  height?: number;
  disabled?: boolean;
  fontSize?: number;
  lineHeight?: number;
  letterSpacing?: number;
  padding?: string;

  onClick?: () => void;
}

const Button = ({
  children,
  variation,
  btnClass,
  type,
  size = "manual",
  disabled = false,
  width = 97,
  height = 48,
  fontSize = 16,
  padding = "12px 28px",
  letterSpacing = 0.57,
  lineHeight = 150,
  onClick,
}: ButtonProps) => {
  return (
    <ButtonContainer
      $variation={variation}
      $btnClass={btnClass}
      type={type}
      $size={size}
      disabled={disabled}
      $width={width}
      $height={height}
      $fontSize={fontSize}
      $letterSpacing={letterSpacing}
      $lineHeight={lineHeight}
      $padding={padding}
      onClick={onClick}
    >
      {children}
    </ButtonContainer>
  );
};

export default Button;

const ButtonContainer = styled.button<{
  $variation: "solid" | "outlined" | "text" | "floating";
  $btnClass: "primary" | "secondary" | "assistive";
  $size: "large" | "medium" | "small" | "manual";
  $width: number;
  $height: number;
  $fontSize: number;
  $padding: string;
  $letterSpacing: number;
  $lineHeight: number;
}>`
  cursor: pointer;
  border-radius: 10px;
  display: flex;
  font-weight: var(--font-semibold);
  font-size: ${({ $fontSize }) => $fontSize};
  line-height: ${({ $lineHeight }) => `${$lineHeight}%`};
  letter-spacing: ${({ $letterSpacing }) => `${$letterSpacing}%`};
  justify-content: center;
  align-items: center;
  padding: ${({ $padding }) => `${$padding}`};

  /* variation & type */

  /* default */
  border: ${({ $variation, $btnClass }) => {
    if ($variation === "solid" && $btnClass === "primary") {
      return "none";
    } else if ($variation === "outlined" && $btnClass === "primary") {
      return "1px solid #70737C";
    } else if ($variation === "outlined" && $btnClass === "secondary") {
      return "1px solid var(--color-gray)";
    } else if ($variation === "outlined" && $btnClass === "assistive") {
      return "1px solid var(--color-gray)";
    } else if ($variation === "text") {
      return "none";
    }
  }};

  background-color: ${({ $variation, $btnClass }) => {
    if ($variation === "solid" && $btnClass === "primary") {
      return "#B81716";
    } else if ($variation === "outlined" && $btnClass === "primary") {
      return "var(--color-white)";
    } else if ($variation === "outlined" && $btnClass === "secondary") {
      return "var(--color-white)";
    } else if ($variation === "outlined" && $btnClass === "assistive") {
      return "var(--color-white)";
    } else if ($variation === "text") {
      return "transparent";
    }
  }};

  color: ${({ $variation, $btnClass }) => {
    if ($variation === "solid" && $btnClass === "primary") {
      return "var(--color-white)";
    } else if ($variation === "outlined" && $btnClass === "primary") {
      return "var(--color-blue)";
    } else if ($variation === "outlined" && $btnClass === "secondary") {
      return "#B81716";
    } else if ($variation === "outlined" && $btnClass === "assistive") {
      return "var(--color-black)";
    } else if ($variation === "text" && $btnClass === "primary") {
      return "#B81716";
    } else if ($variation === "text" && $btnClass === "assistive") {
      return "37383C";
    }
  }};

  /* disabled */
  &:disabled {
    border: ${({ $variation, $btnClass }) => {
      if ($variation === "solid" && $btnClass === "primary") {
        return "none";
      } else if ($variation === "outlined" && $btnClass === "primary") {
        return "1px solid var(--color-gray2)";
      } else if ($variation === "outlined" && $btnClass === "secondary") {
        return "1px solid var(--color-gray2)";
      } else if ($variation === "outlined" && $btnClass === "assistive") {
        return "1px solid var(--color-gray2)";
      } else if ($variation === "text") {
        return "none";
      }
    }};

    background-color: ${({ $variation, $btnClass }) => {
      if ($variation === "solid" && $btnClass === "primary") {
        return "var(--color-gray2)";
      } else if ($variation === "outlined" && $btnClass === "primary") {
        return "var(--color-white)";
      } else if ($variation === "outlined" && $btnClass === "secondary") {
        return "var(--color-white)";
      } else if ($variation === "outlined" && $btnClass === "assistive") {
        return "var(--color-white)";
      } else if ($variation === "text") {
        return "none";
      }
    }};

    color: ${({ $variation, $btnClass }) => {
      if ($variation === "solid" && $btnClass === "primary") {
        return "var(--color-gray)";
      } else if ($variation === "outlined" && $btnClass === "primary") {
        return "var(--color-gray2)";
      } else if ($variation === "outlined" && $btnClass === "secondary") {
        return "var(--color-gray2)";
      } else if ($variation === "outlined" && $btnClass === "assistive") {
        return "var(--color-gray2)";
      } else if ($variation === "text" && $btnClass === "primary") {
        return "var(--color-gray2)";
      } else if ($variation === "text" && $btnClass === "assistive") {
        return "var(--color-gray2)";
      }
    }};
  }

  /* hovered */
  &:hover {
    border: ${({ $variation, $btnClass }) => {
      if ($variation === "solid" && $btnClass === "primary") {
        return "none";
      } else if ($variation === "outlined" && $btnClass === "primary") {
        return "1px solid var(--color-blue)";
      } else if ($variation === "outlined" && $btnClass === "secondary") {
        return "1px solid var(--color-gray5)";
      } else if ($variation === "outlined" && $btnClass === "assistive") {
        return "1px solid var(--color-gray5)";
      } else if ($variation === "text") {
        return "none";
      }
    }};

    background-color: ${({ $variation, $btnClass }) => {
      if ($variation === "solid" && $btnClass === "primary") {
        return "var(--color-blue)";
      } else if ($variation === "outlined" && $btnClass === "primary") {
        return "var(--color-blue2)";
      } else if ($variation === "outlined" && $btnClass === "secondary") {
        return "var(--color-gray4)";
      } else if ($variation === "outlined" && $btnClass === "assistive") {
        return "var(--color-gray4)";
      } else if ($variation === "text" && $btnClass === "primary") {
        return "var(--color-blue2)";
      } else if ($variation === "text" && $btnClass === "assistive") {
        return "var(--color-gray4)";
      }
    }};

    color: ${({ $variation, $btnClass }) => {
      if ($variation === "solid" && $btnClass === "primary") {
        return "var(--color-white)";
      } else if ($variation === "outlined" && $btnClass === "primary") {
        return "var(--color-blue)";
      } else if ($variation === "outlined" && $btnClass === "secondary") {
        return "var(--color-blue)";
      } else if ($variation === "outlined" && $btnClass === "assistive") {
        return "var(--color-black2)";
      } else if ($variation === "text" && $btnClass === "primary") {
        return "var(--color-blue)";
      } else if ($variation === "text" && $btnClass === "assistive") {
        return "var(--color-gray9)";
      }
    }};
  }

  /* focused */
  &:focus {
    border: ${({ $variation, $btnClass }) => {
      if ($variation === "solid" && $btnClass === "primary") {
        return "none";
      } else if ($variation === "outlined" && $btnClass === "primary") {
        return "1px solid var(--color-blue)";
      } else if ($variation === "outlined" && $btnClass === "secondary") {
        return "1px solid var(--color-gray5)";
      } else if ($variation === "outlined" && $btnClass === "assistive") {
        return "1px solid var(--color-gray5)";
      } else if ($variation === "text" && $btnClass === "primary") {
        return "none";
      } else if ($variation === "text" && $btnClass === "assistive") {
        return "none";
      }
    }};

    background-color: ${({ $variation, $btnClass }) => {
      if ($variation === "solid" && $btnClass === "primary") {
        return "var(--color-blue3)";
      } else if ($variation === "outlined" && $btnClass === "primary") {
        return "var(--color-blue4)";
      } else if ($variation === "outlined" && $btnClass === "secondary") {
        return "var(--color-gray7)";
      } else if ($variation === "outlined" && $btnClass === "assistive") {
        return "var(--color-gray7)";
      } else if ($variation === "text" && $btnClass === "primary") {
        return "var(--color-blue4)";
      } else if ($variation === "text" && $btnClass === "assistive") {
        return "var(--color-gray7)";
      }
    }};

    color: ${({ $variation, $btnClass }) => {
      if ($variation === "solid" && $btnClass === "primary") {
        return "var(--color-white)";
      } else if ($variation === "outlined" && $btnClass === "primary") {
        return "var(--color-blue)";
      } else if ($variation === "outlined" && $btnClass === "secondary") {
        return "var(--color-blue)";
      } else if ($variation === "outlined" && $btnClass === "assistive") {
        return "var(--color-black2)";
      } else if ($variation === "text" && $btnClass === "primary") {
        return "var(--color-blue)";
      } else if ($variation === "text" && $btnClass === "assistive") {
        return "var(--color-gray2)";
      }
    }};
  }

  /* pressed */
  &:active {
    border: ${({ $variation, $btnClass }) => {
      if ($variation === "solid" && $btnClass === "primary") {
        return "none";
      } else if ($variation === "outlined" && $btnClass === "primary") {
        return "1px solid var(--color-blue)";
      } else if ($variation === "outlined" && $btnClass === "secondary") {
        return "1px solid var(--color-gray5)";
      } else if ($variation === "outlined" && $btnClass === "assistive") {
        return "1px solid var(--color-gray5)";
      } else if ($variation === "text") {
        return "none";
      }
    }};

    background-color: ${({ $variation, $btnClass }) => {
      if ($variation === "solid" && $btnClass === "primary") {
        return "var(--color-blue5)";
      } else if ($variation === "outlined" && $btnClass === "primary") {
        return "var(--color-blue4)";
      } else if ($variation === "outlined" && $btnClass === "secondary") {
        return "var(--color-gray8)";
      } else if ($variation === "outlined" && $btnClass === "assistive") {
        return "var(--color-gray8)";
      } else if ($variation === "text" && $btnClass === "primary") {
        return "var(--color-blue6)";
      } else if ($variation === "text" && $btnClass === "assistive") {
        return "var(--color-gray8)";
      }
    }};

    color: ${({ $variation, $btnClass }) => {
      if ($variation === "solid" && $btnClass === "primary") {
        return "var(--color-gray6)";
      } else if ($variation === "outlined" && $btnClass === "primary") {
        return "var(--color-blue)";
      } else if ($variation === "outlined" && $btnClass === "secondary") {
        return "var(--color-blue)";
      } else if ($variation === "outlined" && $btnClass === "assistive") {
        return "var(--color-black2)";
      } else if ($variation === "text" && $btnClass === "primary") {
        return "var(--color-blue)";
      } else if ($variation === "text" && $btnClass === "assistive") {
        return "var(--color-gray11)";
      }
    }};
  }

  /* size */
  padding: ${({ $size, $padding }) => {
    switch ($size) {
      case "large":
        return "12px 28px";
      case "medium":
        return "11p 20px";
      case "small":
        return "8px 14px";
      default:
        return `${$padding}px`;
    }
  }};

  font-size: ${({ $size, $fontSize }) => {
    switch ($size) {
      case "large":
        return "16px";
      case "medium":
        return "15px";
      case "small":
        return "13px";
      default:
        return `${$fontSize}px`;
    }
  }};

  width: ${({ $size, $width }) => {
    switch ($size) {
      case "large":
        return "149px";
      case "medium":
        return "125px";
      case "small":
        return "102px";
      default:
        return `${$width}px`;
    }
  }};
  height: ${({ $size, $height }) => {
    switch ($size) {
      case "large":
        return "48px";
      case "medium":
        return "40px";
      case "small":
        return "32px";
      default:
        return `${$height}px`;
    }
  }};
`;
