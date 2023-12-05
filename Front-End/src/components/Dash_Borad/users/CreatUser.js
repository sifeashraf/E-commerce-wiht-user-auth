import React from "react";
import Form from "../../Re-usable_components/Form";

export default function CreatUser() {
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
