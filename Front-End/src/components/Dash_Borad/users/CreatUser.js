import React from "react";
import Form from "../../Re-usable_components/Form";

export default function Creatusser() {
  return (
    <>
      <Form
        endpoint={"user/create"}
        email={""}
        name={""}
        operations={"CreatUser"}
        naviGate={"/dashborad/user"}
        hasLocalStorge={false}
      />
    </>
  );
}
