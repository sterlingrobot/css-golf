import React from 'react';

import Prism from 'prismjs';
import 'prismjs/components/prism-scss';
import 'prismjs/themes/prism.css';

const SCSSvariables = () => {
  return (
    <pre style={{ fontSize: '2rem', columns: 2 }}>
      <code
        language="css"
        dangerouslySetInnerHTML={{
          __html: Prism.highlight(
            `$color-red-10: #f8eae8;
$color-red-20: #f5dfdc;
$color-red-120: #912012;
$color-red-base: #bc2a18;
$color-gold-20: #ffe8c0;
$color-gold-base: #ffc040;
$color-green-10: #e2f2e2;
$color-green-20: #d3ead3;
$color-green-50: #3c9064;
$color-green-base: #0b733d;
$color-blue-10: #edf2fe;
$color-blue-20: #e3ebfc;
$color-blue-50: #4270d7;
$color-blue-120: #2a51a7;
$color-blue-base: #3665cd;
$color-gray-50: #565f6b;
$color-gray-base: #4a525e;
$color-silver-10: #f7f7f9;
$color-silver-20: #f2f2f4;
$color-silver-50: #cdd3dc;
$color-silver-base: #a1acbd;
$color-white-base: #fdfdff;
$color-white-pure: #ffffff;
$color-black-base: #2c323a;
$color-black-pure: #000000;

$layout-spacing-micro: 0.5rem;
$layout-spacing-extra-small: 1rem;
$layout-spacing-small: 1.5rem;
$layout-spacing-regular: 2rem;
$layout-spacing-medium: 2.5rem;
$layout-spacing-large: 3rem;
`,
            Prism.languages.scss
          )
        }}
      />
    </pre>
  );
};

export default SCSSvariables;
