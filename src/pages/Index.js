import React from "react";

function IndexPage(props) {

    React.useEffect(() => {
        const token = localStorage.getItem("CC_Token");
        if(!token){
            props.history.push("/login");
        } else {
            props.history.push("/group");
        }
    }, [])
    return (
        <>
        <div>OI</div>
        </>
    )
}

export default IndexPage;