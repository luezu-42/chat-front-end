import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Group from "./pages/Group";
import IndexPage from "./pages/Index";
import Chat from "./pages/Chat";
import io from "socket.io-client";

function App() {
  const [socket, setSocket] = React.useState(null);

  const setupSocket = async () => {
    const token = localStorage.getItem("CC_Token");
    if (token && !socket) {
      const newSocket = await io("http://localhost:3333/", {
        query: {
          token: localStorage.getItem("CC_Token"),
        },
      });

      newSocket.on("disconnect", () => {
        setSocket(null);
        setTimeout(setupSocket, 3000);
        //makeToast("error", "Socket Disconnected!");
      });

      newSocket.on("connect", () => {
       // makeToast("success", "Socket Connected!");
      });

      setSocket(newSocket);
    }
  };
  
  React.useEffect(() => {
    setupSocket();
    //eslint-disable-next-line
  }, []);
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/Chat/:id" render={() => <Chat socket={socket}/>} exact/>
        <Route path="/login" render={() => <Login setupSocket={setupSocket}/>} exact/>
        <Route path="/group" render={() => <Group socket={socket}/>} exact/>
        <Route path="/register" component={Register} exact/>
        <Route path="/" component={IndexPage} exact/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
