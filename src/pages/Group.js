import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Group(props) {
  const [group, setGroup] = React.useState([]);
  const groupRef = React.createRef();

  const getGroups = async () => {
    axios.get("http://localhost:3333/", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("CC_Token"),
        },
      })
      .then((response) => {
        setGroup(response.data);
      })
      .catch((err) => {
        // setTimeout(getGroups, 30000)
      });
  };

  const createGroup = async () => {
    const name = groupRef.current.value;

    try {
      const response = await axios.post("http://localhost:3333/", {
        name,
      });
      setGroup([response]);
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    getGroups();
  }, [group]);
  return (
    <>
      <div class="bg-white m-10 shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col ">
        <div class="mb-4">
          <label
            class="block text-grey-darker text-sm font-bold mb-2"
            for="username"
          >
            Nome do grupo
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
            name="name"
        id="name"
        placeholder="nome do grupo"
        ref={groupRef}
          />
        </div>
        <div class="flex items-center justify-between">
          <button
            class="bg-green-300 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"
            type="button"
            onClick={createGroup}
          >
            Criar grupo
          </button>
        </div>
      </div>

<table class="rounded-t-lg m-1 w-5/6 mx-auto bg-white text-gray-800 mb-20">
  <tr class="text-left border-b-2 border-gray-300">
    <th class="px-4 py-3">Grupos</th>
  </tr>
  {group.map((group) => {
     return <tr class="bg-gray-100 border-b border-gray-200" key={group._id}>
    <td class="px-4 py-3">{group.name}</td>
    <td class="px-1 py-3 bg-green-300 rounded text-center text-white">
        <Link to={"/chat/" + group._id}>Entrar</Link>
        </td>
  </tr> 
  })}
  

</table>
      {group.map((group) => (
        <div>
          <div></div>
          
        </div>
      ))}
    </>
  );
}

export default Group;
