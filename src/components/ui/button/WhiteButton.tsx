"use client";

const WhiteButton = ({ label }: W_BtnType) => {
  return (
    <button>{label}</button>
  );
};

type W_BtnType = {
  label: string;
};

export default WhiteButton;
