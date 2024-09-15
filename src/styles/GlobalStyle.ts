import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`

${reset}


html, body {
    width: 100%;
    height: 100%;
}

* {
    box-sizing: border-box;
}

:root {

/* font */

/* color */
--color-white: #ffffff;

--color-black: #000000;
--color-black2: #161819;

--color-blue: #0166FF;
--color-blue2: #f2f7ff;
--color-blue3: #0260ee;
--color-blue4: #ebf3ff;
--color-blue5: #0657d6;
--color-blue6: #e0edff;
--color-blue7: #0066FF;
--color-blue8: #055ce3;
--color-blue9: #eaf2fe;

--color-gray: #858688;
--color-gray2: #f4f4f5;
--color-gray3: #e3e3e3;
--color-gray4: #f6f6f6;
--color-gray5: #D4D4D6;
--color-gray6: #d5d5d6;
--color-gray7: #f1f1f1;
--color-gray8: #eaeaea;
--color-gray9: #818284;
--color-gray10: #7E7F81;
--color-gray11: #7B7C7E;
--color-gray12: #171719;
--color-gray13: #70737C;
--color-gray14: #37383C;
--color-gray15: #f8f8f8;
--color-gray16: #f4f4f5;
--color-gray17: #d6d6d8;
--color-gray18: #bfc0c2;
--color-gray19: #DCDCDC;


--font-bold: 700;
--font-regular: 400;
--font-medium: 500;
--font-semibold: 600;


}




`;

export default GlobalStyle;
