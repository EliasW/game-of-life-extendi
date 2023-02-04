import React, { useEffect, useState } from "react"
import "./App.css"
import Grid from "./components/Grid"

import inputfile from "./input.txt"
import axios from "axios"

const fetchData = async () => {
  let resp = await axios.get(inputfile)
  let final = await resp.data
  var lines = final.split("\r\n");
  var cols = lines[0].split(" ")[1]
  var rows = lines[1].split(" ")[1]
  var generation = lines[2].split(" ")[1]

  var result = {
    horizontal: cols,
    vertical: rows,
    generation: generation
  };
  return result
}

function App() {
  const [props, setProps] = useState([])
  const [grid, setGrid] = useState(false)

  //read the initial setting (generation, grid size) of the game
  useEffect(() => {
    const data = fetchData();
    data.then((res) => {
      setProps(res)
      setGrid(true)
    })

  }, [])

  const { vertical, horizontal, generation } = props

  if (grid && (vertical * horizontal >= generation)) return (<Grid {...props} />)
  else if (grid && (vertical * horizontal < generation)) return (<> <div style={{ margin: "30px" }}>initial generation is out of grid </div> </>)
  else return (<> <div style={{ margin: "30px" }}> initial setting not loaded correctly </div> </>)
}

export default App