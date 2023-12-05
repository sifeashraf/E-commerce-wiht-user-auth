// import Components
import Form from "../Re-usable_components/Form";
import Header from "../Re-usable_components/Header";
//import css
import "./Signup.css";
export default function SignUp() {
  return (
    <>
      <Header />
      <Form
        operations={"Register"}
        endpoint={"register"}
        email={""}
        name={""}
        hasLocalStorge={true}
        styleRegister={true}
      />
    </>
  );
}
