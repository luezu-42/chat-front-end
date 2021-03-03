import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Register(props) {
  const nameRef = React.createRef();
  const emailRef = React.createRef();
  const passwordRef = React.createRef();

  const registerUser = async () => {
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    axios
      .post("http://52.67.60.183:3000/user/", {
        name,
        email,
        password,
      })
      .then((response) => {
        props.history.push("/login");
        //alert(response.data.message);
      })
      .catch((response) => {
        //alert(err.response.data.message);
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
            Nome de usário
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
            name="name"
            id="name"
            placeholder="usuário"
            ref={nameRef}
          />
        </div>
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
            placeholder="Email"
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
            onClick={registerUser}
          >
            Registrar
          </button>

          <Link
            class="bg-green-300 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"
            type="button"
            to="/Login"
          >
            Tem uma conta?
          </Link>
        </div>
      </div>
    </>
  );
}

export default Register;
