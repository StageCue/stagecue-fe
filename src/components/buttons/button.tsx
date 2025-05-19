import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  children: React.ReactNode;
  variation: 'solid' | 'outlined' | 'text' | 'floating';
  btnClass: 'primary' | 'secondary' | 'assistive';
  size?: 'large' | 'medium' | 'small' | 'manual';
  type?: 'button' | 'submit' | 'reset' | undefined;
  width?: number;
  height?: number;
  disabled?: boolean;
  fontSize?: number;
  fontWeight?: string;
  lineHeight?: number;
  letterSpacing?: number;
  padding?: string;
  borderRadius?: string;
  justifyContent?: string;

  onClick?: (event?: React.MouseEvent) => void;
}

const Button = ({
  children,
  variation,
  btnClass,
  type,
  size = 'manual',
  disabled = false,
  width = 97,
  height = 48,
  fontSize = 16,
  fontWeight = `var(--font-semibold)`,
  padding = '12px 28px',
  borderRadius = '10px',
  justifyContent = 'center',
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
      $fontWeight={fontWeight}
      $letterSpacing={letterSpacing}
      $lineHeight={lineHeight}
      $padding={padding}
      $borderRadius={borderRadius}
      $justifyContent={justifyContent}
      onClick={onClick}
    >
      {children}
    </ButtonContainer>
  );
};

export default Button;

const ButtonContainer = styled.button<{
  $variation: 'solid' | 'outlined' | 'text' | 'floating';
  $btnClass: 'primary' | 'secondary' | 'assistive';
  $size: 'large' | 'medium' | 'small' | 'manual';
  $width: number;
  $height: number;
  $fontSize: number;
  $fontWeight: string;
  $letterSpacing: number;
  $lineHeight: number;
  $padding: string;
  $borderRadius: string;
  $justifyContent: string;
}>`
  white-space: nowrap;
  cursor: pointer;
  border-radius: ${({ $borderRadius }) => `${$borderRadius}`};
  display: flex;
  font-weight: ${({ $fontWeight }) => $fontWeight};
  font-size: ${({ $fontSize }) => $fontSize};
  line-height: ${({ $lineHeight }) => `${$lineHeight}%`};
  letter-spacing: ${({ $letterSpacing }) => `${$letterSpacing}%`};
  justify-content: ${({ $justifyContent }) => `${$justifyContent}`};
  align-items: center;
  padding: ${({ $padding }) => `${$padding}`};

  /* variation & type */

  /* default */
  border: ${({ $variation, $btnClass }) => {
    if ($variation === 'solid' && $btnClass === 'primary') {
      return 'none';
    } else if ($variation === 'outlined' && $btnClass === 'primary') {
      return '1px solid #B81716';
    } else if ($variation === 'outlined' && $btnClass === 'secondary') {
      return '1px solid #e0e0e2';
    } else if ($variation === 'outlined' && $btnClass === 'assistive') {
      return '1px solid #e0e0e2';
    } else if ($variation === 'text') {
      return 'none';
    }
  }};

  background-color: ${({ $variation, $btnClass }) => {
    if ($variation === 'solid' && $btnClass === 'primary') {
      return '#B81716';
    } else if ($variation === 'outlined' && $btnClass === 'primary') {
      return 'white';
    } else if ($variation === 'outlined' && $btnClass === 'secondary') {
      return 'white';
    } else if ($variation === 'outlined' && $btnClass === 'assistive') {
      return 'white';
    } else if ($variation === 'text') {
      return 'transparent';
    }
  }};

  color: ${({ $variation, $btnClass }) => {
    if ($variation === 'solid' && $btnClass === 'primary') {
      return 'white';
    } else if ($variation === 'outlined' && $btnClass === 'primary') {
      return '#B81716';
    } else if ($variation === 'outlined' && $btnClass === 'secondary') {
      return '#B81716';
    } else if ($variation === 'outlined' && $btnClass === 'assistive') {
      return '#171719';
    } else if ($variation === 'text' && $btnClass === 'primary') {
      return '#B81716';
    } else if ($variation === 'text' && $btnClass === 'assistive') {
      return '#858688';
    }
  }};

  /* disabled */
  &:disabled {
    cursor: default;
    border: ${({ $variation, $btnClass }) => {
      if ($variation === 'solid' && $btnClass === 'primary') {
        return 'none';
      } else if ($variation === 'outlined' && $btnClass === 'primary') {
        return '#e0e0e2';
      } else if ($variation === 'outlined' && $btnClass === 'secondary') {
        return '#e0e0e2';
      } else if ($variation === 'outlined' && $btnClass === 'assistive') {
        return '#e0e0e2';
      } else if ($variation === 'text') {
        return 'none';
      }
    }};

    background-color: ${({ $variation, $btnClass }) => {
      if ($variation === 'solid' && $btnClass === 'primary') {
        return '#f4f4f5';
      } else if ($variation === 'outlined' && $btnClass === 'primary') {
        return 'white';
      } else if ($variation === 'outlined' && $btnClass === 'secondary') {
        return 'white';
      } else if ($variation === 'outlined' && $btnClass === 'assistive') {
        return 'var(--color-white)';
      } else if ($variation === 'text') {
        return 'none';
      }
    }};

    color: ${({ $variation, $btnClass }) => {
      if ($variation === 'solid' && $btnClass === 'primary') {
        return '#bfbfc1';
      } else if ($variation === 'outlined' && $btnClass === 'primary') {
        return '#dfdfe0';
      } else if ($variation === 'outlined' && $btnClass === 'secondary') {
        return '#dfdfe0';
      } else if ($variation === 'outlined' && $btnClass === 'assistive') {
        return '#dfdfe0';
      } else if ($variation === 'text' && $btnClass === 'primary') {
        return '#DFDFE0';
      } else if ($variation === 'text' && $btnClass === 'assistive') {
        return '#dfdfe0';
      }
    }};
  }

  /* disabled+hover */
  &:disabled:hover {
    cursor: default;
    border: ${({ $variation, $btnClass }) => {
      if ($variation === 'solid' && $btnClass === 'primary') {
        return 'none';
      } else if ($variation === 'outlined' && $btnClass === 'primary') {
        return '#e0e0e2';
      } else if ($variation === 'outlined' && $btnClass === 'secondary') {
        return '#e0e0e2';
      } else if ($variation === 'outlined' && $btnClass === 'assistive') {
        return '#e0e0e2';
      } else if ($variation === 'text') {
        return 'none';
      }
    }};

    background-color: ${({ $variation, $btnClass }) => {
      if ($variation === 'solid' && $btnClass === 'primary') {
        return '#f4f4f5';
      } else if ($variation === 'outlined' && $btnClass === 'primary') {
        return 'white';
      } else if ($variation === 'outlined' && $btnClass === 'secondary') {
        return 'white';
      } else if ($variation === 'outlined' && $btnClass === 'assistive') {
        return 'var(--color-white)';
      } else if ($variation === 'text') {
        return 'none';
      }
    }};

    color: ${({ $variation, $btnClass }) => {
      if ($variation === 'solid' && $btnClass === 'primary') {
        return '#bfbfc1';
      } else if ($variation === 'outlined' && $btnClass === 'primary') {
        return '#dfdfe0';
      } else if ($variation === 'outlined' && $btnClass === 'secondary') {
        return '#dfdfe0';
      } else if ($variation === 'outlined' && $btnClass === 'assistive') {
        return '#dfdfe0';
      } else if ($variation === 'text' && $btnClass === 'primary') {
        return '#DFDFE0';
      } else if ($variation === 'text' && $btnClass === 'assistive') {
        return '#dfdfe0';
      }
    }};
  }

  /* hovered */
  &:hover {
    border: ${({ $variation, $btnClass }) => {
      if ($variation === 'solid' && $btnClass === 'primary') {
        return 'none';
      } else if ($variation === 'outlined' && $btnClass === 'primary') {
        return '1px solid #B81716';
      } else if ($variation === 'outlined' && $btnClass === 'secondary') {
        return '1px solid #e0e0e2';
      } else if ($variation === 'outlined' && $btnClass === 'assistive') {
        return '1px solid #e0e0e2';
      } else if ($variation === 'text') {
        return 'none';
      }
    }};

    background-color: ${({ $variation, $btnClass }) => {
      if ($variation === 'solid' && $btnClass === 'primary') {
        return '#b81716';
      } else if ($variation === 'outlined' && $btnClass === 'primary') {
        return '#f2f7ff';
      } else if ($variation === 'outlined' && $btnClass === 'secondary') {
        return '#f6f6f6';
      } else if ($variation === 'outlined' && $btnClass === 'assistive') {
        return '#f6f6f6';
      } else if ($variation === 'text' && $btnClass === 'primary') {
        return '#fcf3f3';
      } else if ($variation === 'text' && $btnClass === 'assistive') {
        return '#f6f6f6';
      }
    }};

    color: ${({ $variation, $btnClass }) => {
      if ($variation === 'solid' && $btnClass === 'primary') {
        return '#f6f6f6';
      } else if ($variation === 'outlined' && $btnClass === 'primary') {
        return '##0066ff';
      } else if ($variation === 'outlined' && $btnClass === 'secondary') {
        return '##B81716';
      } else if ($variation === 'outlined' && $btnClass === 'assistive') {
        return 'var(--color-black2)';
      } else if ($variation === 'text' && $btnClass === 'primary') {
        return '#B81716';
      } else if ($variation === 'text' && $btnClass === 'assistive') {
        return '#858688';
      }
    }};
  }

  /* focused
  &:focus {
    border: ${({ $variation, $btnClass }) => {
      if ($variation === 'solid' && $btnClass === 'primary') {
        return 'none';
      } else if ($variation === 'outlined' && $btnClass === 'primary') {
        return '#a91d28';
      } else if ($variation === 'outlined' && $btnClass === 'secondary') {
        return '#d4d4d6';
      } else if ($variation === 'outlined' && $btnClass === 'assistive') {
        return '#d4d4d6';
      } else if ($variation === 'text' && $btnClass === 'primary') {
        return 'none';
      } else if ($variation === 'text' && $btnClass === 'assistive') {
        return 'none';
      }
    }};

    background-color: ${({ $variation, $btnClass }) => {
      if ($variation === 'solid' && $btnClass === 'primary') {
        return '#ac1716';
      } else if ($variation === 'outlined' && $btnClass === 'primary') {
        return '#eaf3ff';
      } else if ($variation === 'outlined' && $btnClass === 'secondary') {
        return '#f1f1f1';
      } else if ($variation === 'outlined' && $btnClass === 'assistive') {
        return '#f1f1f1';
      } else if ($variation === 'text' && $btnClass === 'primary') {
        return '#f9ecec';
      } else if ($variation === 'text' && $btnClass === 'assistive') {
        return '#f1f1f1';
      }
    }};

    color: ${({ $variation, $btnClass }) => {
      if ($variation === 'solid' && $btnClass === 'primary') {
        return '#EEEEEE';
      } else if ($variation === 'outlined' && $btnClass === 'primary') {
        return '#0066ff';
      } else if ($variation === 'outlined' && $btnClass === 'secondary') {
        return '#AD1716';
      } else if ($variation === 'outlined' && $btnClass === 'assistive') {
        return '#333334';
      } else if ($variation === 'text' && $btnClass === 'primary') {
        return '#b81716';
      } else if ($variation === 'text' && $btnClass === 'assistive') {
        return '#7e7f81';
      }
    }};
  } */

  /* pressed */
  &:active {
    border: ${({ $variation, $btnClass }) => {
      if ($variation === 'solid' && $btnClass === 'primary') {
        return 'none';
      } else if ($variation === 'outlined' && $btnClass === 'primary') {
        return '#a22033';
      } else if ($variation === 'outlined' && $btnClass === 'secondary') {
        return '#ceced0';
      } else if ($variation === 'outlined' && $btnClass === 'assistive') {
        return '#ceced0';
      } else if ($variation === 'text') {
        return 'none';
      }
    }};

    background-color: ${({ $variation, $btnClass }) => {
      if ($variation === 'solid' && $btnClass === 'primary') {
        return '#9b1716';
      } else if ($variation === 'outlined' && $btnClass === 'primary') {
        return '#dfedff';
      } else if ($variation === 'outlined' && $btnClass === 'secondary') {
        return '#eaeaea';
      } else if ($variation === 'outlined' && $btnClass === 'assistive') {
        return '#eaeaea';
      } else if ($variation === 'text' && $btnClass === 'primary') {
        return '#f6e3e3';
      } else if ($variation === 'text' && $btnClass === 'assistive') {
        return '#eaeaea';
      }
    }};

    color: ${({ $variation, $btnClass }) => {
      if ($variation === 'solid' && $btnClass === 'primary') {
        return '#d5d5d6';
      } else if ($variation === 'outlined' && $btnClass === 'primary') {
        return '##0066ff';
      } else if ($variation === 'outlined' && $btnClass === 'secondary') {
        return '#B81716';
      } else if ($variation === 'outlined' && $btnClass === 'assistive') {
        return '#171719';
      } else if ($variation === 'text' && $btnClass === 'primary') {
        return '#B81716';
      } else if ($variation === 'text' && $btnClass === 'assistive') {
        return '#7b7c7e';
      }
    }};
  }

  /* size */
  padding: ${({ $size, $padding }) => {
    switch ($size) {
      case 'large':
        return '12px 28px';
      case 'medium':
        return '11p 20px';
      case 'small':
        return '8px 14px';
      default:
        return `${$padding}px`;
    }
  }};

  font-size: ${({ $size, $fontSize }) => {
    switch ($size) {
      case 'large':
        return '16px';
      case 'medium':
        return '15px';
      case 'small':
        return '13px';
      default:
        return `${$fontSize}px`;
    }
  }};

  width: ${({ $size, $width }) => {
    switch ($size) {
      case 'large':
        return '149px';
      case 'medium':
        return '125px';
      case 'small':
        return '102px';
      default:
        return `${$width}px`;
    }
  }};
  height: ${({ $size, $height }) => {
    switch ($size) {
      case 'large':
        return '48px';
      case 'medium':
        return '40px';
      case 'small':
        return '32px';
      default:
        return `${$height}px`;
    }
  }};
`;
