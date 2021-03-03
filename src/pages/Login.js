import React from "react";
import axios from "axios";
import { withRouter, Link } from "react-router-dom";

function Login(props) {
  const emailRef = React.createRef();
  const passwordRef = React.createRef();

  const loginUser = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    axios
      .post("http://52.67.60.183:3000/user/auth", {
        email,
        password,
      })
      .then((response) => {
        localStorage.setItem("CC_Token", response.data.token);
        // alert(response.data);
        props.history.push("/");
        props.setupSocket();
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  return (
    <>
      <div class="bg-white m-10 shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
        <div class="mb-4">
          <label
            class="block text-grey-darker text-sm font-bold mb-2"
            for="username"
          >
            Email
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
            name="email"
            id="email"
            placeholder="email"
            ref={emailRef}
          />
        </div>
        <div class="mb-6">
          <label
            class="block text-grey-darker text-sm font-bold mb-2"
            for="password"
          >
            Senha
          </label>
          <input
            class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            ref={passwordRef}
            placeholder="******************"
          />
          <p class="text-red text-xs italic">Coloque uma senha</p>
        </div>
        <div class="flex items-center justify-between">
          <button
            class="bg-green-300 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"
            type="button"
            onClick={loginUser}
          >
            Entrar
          </button>

          <Link
            class="bg-green-300 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"
            type="button"
            to="/register"
          >
            Registrar
          </Link>
        </div>
      </div>
    </>
  );
}

export default withRouter(Login);
