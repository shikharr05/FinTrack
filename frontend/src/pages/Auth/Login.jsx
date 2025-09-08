import React, { useContext, useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/inputs/Input";
import { validateEmail, validatePassword } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);

  const navigate = useNavigate();

  //handleLogin
  const handlelogin = async (e) => {
    e.preventDefault();

    if(!validateEmail(email)){
        setError("Please Enter a valid email address.");
        return;
    }

    const result = validatePassword(password); 
      if(!result.valid){
          setError(result.message);
          return;
      }

    setError("");

    //login api call
    try{
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, { // those interceptors setup by us will run automatically
        email,
        password
      });

      const { token, user } = response.data;
      if(token){
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch(err) {
      if(err.response && err.response.data.message){
        setError(err.response.data.message);
      } else{
        setError("Something Went Wrong! Please try again.");
      }
    }
  };
  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Please enter your details to login
        </p>

        <form onSubmit={handlelogin}>
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="john@example.com"
            type="text"
          />

          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Min 8 Characters"
            type="password"
          />

          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

          <button type="submit" className="btn-primary">LOGIN</button>

          <p className="text-[13px] text-slate-800 mt-3">Don't have an account?{" "}
            <Link className="font-medium text-primary underline" to="/signup">SignUp</Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
