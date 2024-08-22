import React from "react";
import styled from "styled-components";

interface ButtonProps {
  children: React.ReactNode;
  variation: "solid" | "outlined" | "text" | "floating";
  type: "primary" | "secondary" | "assistive";
  size?: "large" | "medium" | "small" | "manual";
  width?: number;
  height?: number;
  disabled?: boolean;
  fontSize?: number;
  padding?: string;
}

const Button = ({
  children,
  variation,
  type,
  size = "manual",
  disabled = false,
  width = 97,
  height = 48,
  fontSize = 16,
  padding = "12px 28px",
}: ButtonProps) => {
  return (
    <ButtonContainer
      $variation={variation}
      $type={type}
      $size={size}
      disabled={disabled}
      $width={width}
      $height={height}
      $fontSize={fontSize}
      $padding={padding}
    >
      {children}
    </ButtonContainer>
  );
};

export default Button;

const ButtonContainer = styled.button<{
  $variation: "solid" | "outlined" | "text" | "floating";
  $type: "primary" | "secondary" | "assistive";
  $size: "large" | "medium" | "small" | "manual";
  $width: number;
  $height: number;
  $fontSize: number;
  $padding: string;
}>`
  cursor: pointer;
  border-radius: 10px;
  display: flex;
  font-weight: var(--font-semibold);
  font-size: 16px;
  line-height: 150%;
  letter-spacing: 0.57%;
  justify-content: center;
  align-items: center;

  /* variation & type */
  border: ${({ $variation, $type }) => {
    if ($variation === "solid" && $type === "primary") {
      return "none";
    } else if ($variation === "outlined" && $type === "primary") {
      return "1px solid var(--color-blue)";
    } else if ($variation === "outlined" && $type === "secondary") {
      return "1px solid var(--color-gray)";
    } else if ($variation === "outlined" && $type === "assistive") {
      return "1px solid var(--color-gray)";
    } else if ($variation === "text") {
      return "none";
    }
  }};

  background-color: ${({ $variation, $type }) => {
    if ($variation === "solid" && $type === "primary") {
      return "var(--color-blue)";
    } else if ($variation === "outlined" && $type === "primary") {
      return "var(--color-white)";
    } else if ($variation === "outlined" && $type === "secondary") {
      return "var(--color-white)";
    } else if ($variation === "outlined" && $type === "assistive") {
      return "var(--color-white)";
    } else if ($variation === "text") {
      return "none";
    }
  }};

  color: ${({ $variation, $type }) => {
    if ($variation === "solid" && $type === "primary") {
      return "var(--color-white)";
    } else if ($variation === "outlined" && $type === "primary") {
      return "var(--color-blue)";
    } else if ($variation === "outlined" && $type === "secondary") {
      return "var(--color-blue)";
    } else if ($variation === "outlined" && $type === "assistive") {
      return "var(--color-black)";
    } else if ($variation === "text" && $type === "primary") {
      return "var(--color-blue)";
    } else if ($variation === "text" && $type === "assistive") {
      return "var(--color-blue)";
    }
  }};

  /* disabled */
  &:disabled {
    border: ${({ $variation, $type }) => {
      if ($variation === "solid" && $type === "primary") {
        return "none";
      } else if ($variation === "outlined" && $type === "primary") {
        return "1px solid var(--color-gray2)";
      } else if ($variation === "outlined" && $type === "secondary") {
        return "1px solid var(--color-gray2)";
      } else if ($variation === "outlined" && $type === "assistive") {
        return "1px solid var(--color-gray2)";
      } else if ($variation === "text") {
        return "none";
      }
    }};

    background-color: ${({ $variation, $type }) => {
      if ($variation === "solid" && $type === "primary") {
        return "var(--color-gray2)";
      } else if ($variation === "outlined" && $type === "primary") {
        return "var(--color-white)";
      } else if ($variation === "outlined" && $type === "secondary") {
        return "var(--color-white)";
      } else if ($variation === "outlined" && $type === "assistive") {
        return "var(--color-white)";
      } else if ($variation === "text") {
        return "none";
      }
    }};

    color: ${({ $variation, $type }) => {
      if ($variation === "solid" && $type === "primary") {
        return "var(--color-gray)";
      } else if ($variation === "outlined" && $type === "primary") {
        return "var(--color-gray2)";
      } else if ($variation === "outlined" && $type === "secondary") {
        return "var(--color-gray2)";
      } else if ($variation === "outlined" && $type === "assistive") {
        return "var(--color-gray2)";
      } else if ($variation === "text" && $type === "primary") {
        return "var(--color-gray2)";
      } else if ($variation === "text" && $type === "assistive") {
        return "var(--color-gray2)";
      }
    }};
  }

  /* hovered */
  &:hover {
    border: ${({ $variation, $type }) => {
      if ($variation === "solid" && $type === "primary") {
        return "none";
      } else if ($variation === "outlined" && $type === "primary") {
        return "1px solid var(--color-blue)";
      } else if ($variation === "outlined" && $type === "secondary") {
        return "1px solid var(--color-gray5)";
      } else if ($variation === "outlined" && $type === "assistive") {
        return "1px solid var(--color-gray5)";
      } else if ($variation === "text") {
        return "none";
      }
    }};

    background-color: ${({ $variation, $type }) => {
      if ($variation === "solid" && $type === "primary") {
        return "var(--color-blue)";
      } else if ($variation === "outlined" && $type === "primary") {
        return "var(--color-blue2)";
      } else if ($variation === "outlined" && $type === "secondary") {
        return "var(--color-gray4)";
      } else if ($variation === "outlined" && $type === "assistive") {
        return "var(--color-gray4)";
      } else if ($variation === "text" && $type === "primary") {
        return "var(--color-blue2)";
      } else if ($variation === "text" && $type === "assistive") {
        return "var(--color-gray4)";
      }
    }};

    color: ${({ $variation, $type }) => {
      if ($variation === "solid" && $type === "primary") {
        return "var(--color-white)";
      } else if ($variation === "outlined" && $type === "primary") {
        return "var(--color-blue)";
      } else if ($variation === "outlined" && $type === "secondary") {
        return "var(--color-blue)";
      } else if ($variation === "outlined" && $type === "assistive") {
        return "var(--color-black2)";
      } else if ($variation === "text" && $type === "primary") {
        return "var(--color-blue)";
      } else if ($variation === "text" && $type === "assistive") {
        return "var(--color-gray9)";
      }
    }};
  }

  /* focused */
  &:focus {
    border: ${({ $variation, $type }) => {
      if ($variation === "solid" && $type === "primary") {
        return "none";
      } else if ($variation === "outlined" && $type === "primary") {
        return "1px solid var(--color-blue)";
      } else if ($variation === "outlined" && $type === "secondary") {
        return "1px solid var(--color-gray5)";
      } else if ($variation === "outlined" && $type === "assistive") {
        return "1px solid var(--color-gray5)";
      } else if ($variation === "text" && $type === "primary") {
        return "none";
      } else if ($variation === "text" && $type === "assistive") {
        return "none";
      }
    }};

    background-color: ${({ $variation, $type }) => {
      if ($variation === "solid" && $type === "primary") {
        return "var(--color-blue3)";
      } else if ($variation === "outlined" && $type === "primary") {
        return "var(--color-blue4)";
      } else if ($variation === "outlined" && $type === "secondary") {
        return "var(--color-gray7)";
      } else if ($variation === "outlined" && $type === "assistive") {
        return "var(--color-gray7)";
      } else if ($variation === "text" && $type === "primary") {
        return "var(--color-blue4)";
      } else if ($variation === "text" && $type === "assistive") {
        return "var(--color-gray7)";
      }
    }};

    color: ${({ $variation, $type }) => {
      if ($variation === "solid" && $type === "primary") {
        return "var(--color-white)";
      } else if ($variation === "outlined" && $type === "primary") {
        return "var(--color-blue)";
      } else if ($variation === "outlined" && $type === "secondary") {
        return "var(--color-blue)";
      } else if ($variation === "outlined" && $type === "assistive") {
        return "var(--color-black2)";
      } else if ($variation === "text" && $type === "primary") {
        return "var(--color-blue)";
      } else if ($variation === "text" && $type === "assistive") {
        return "var(--color-gray2)";
      }
    }};
  }

  /* pressed */
  &:active {
    border: ${({ $variation, $type }) => {
      if ($variation === "solid" && $type === "primary") {
        return "none";
      } else if ($variation === "outlined" && $type === "primary") {
        return "1px solid var(--color-blue)";
      } else if ($variation === "outlined" && $type === "secondary") {
        return "1px solid var(--color-gray5)";
      } else if ($variation === "outlined" && $type === "assistive") {
        return "1px solid var(--color-gray5)";
      } else if ($variation === "text") {
        return "none";
      }
    }};

    background-color: ${({ $variation, $type }) => {
      if ($variation === "solid" && $type === "primary") {
        return "var(--color-blue5)";
      } else if ($variation === "outlined" && $type === "primary") {
        return "var(--color-blue4)";
      } else if ($variation === "outlined" && $type === "secondary") {
        return "var(--color-gray8)";
      } else if ($variation === "outlined" && $type === "assistive") {
        return "var(--color-gray8)";
      } else if ($variation === "text" && $type === "primary") {
        return "var(--color-blue6)";
      } else if ($variation === "text" && $type === "assistive") {
        return "var(--color-gray8)";
      }
    }};

    color: ${({ $variation, $type }) => {
      if ($variation === "solid" && $type === "primary") {
        return "var(--color-gray6)";
      } else if ($variation === "outlined" && $type === "primary") {
        return "var(--color-blue)";
      } else if ($variation === "outlined" && $type === "secondary") {
        return "var(--color-blue)";
      } else if ($variation === "outlined" && $type === "assistive") {
        return "var(--color-black2)";
      } else if ($variation === "text" && $type === "primary") {
        return "var(--color-blue)";
      } else if ($variation === "text" && $type === "assistive") {
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
