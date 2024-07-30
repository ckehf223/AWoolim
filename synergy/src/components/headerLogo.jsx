import React from "react";

function Logo() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 150">
      <defs>
        <path id="textPath" d="M 50 100 C 100 50, 200 50, 250 100" />
      </defs>
      <text font-size="48" fill="#007bff">
        <textPath xlink:href="#textPath">어울림</textPath>
      </text>
    </svg>
  );
}

export default Logo;
