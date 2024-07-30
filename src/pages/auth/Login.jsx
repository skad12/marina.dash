import { Form, FormInput, Submit } from "../../components/form";
import "../../css/pages/auth/login.css";
import useAuth from "../../hooks/api/useAuth";
import { loginSchema } from "../../validation/auth";

function Login(props) {
  const { login, isLoading } = useAuth();
  return (
    <div className="login-container">
      <div className="form">
        <h2 className="t-primary">Administration Login</h2>
        <br />
        <br />
        <Form
          onSubmit={login}
          validationSchema={loginSchema}
          initialValues={{ email: "", password: "" }}
        >
          <FormInput placeholder="Email" name="email" />
          <FormInput placeholder="Password" password name="password" />
          <Submit loading={isLoading} title="Login" />
        </Form>
      </div>
    </div>
  );
}

export default Login;
