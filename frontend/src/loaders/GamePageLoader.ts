import { defer } from "react-router-dom";

function gamePageLoader({params} : any) {
    const { id } = params;
    console.log(`gamePageLoader with id = ${id}`);
    let response = fetch(`http://localhost:3002/games/${id}`);
    return defer({
      game: response.then(res => res.json())
    })
}

export default gamePageLoader;