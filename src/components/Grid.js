import React, { useEffect, useRef, useState } from "react"
import "../App.css"

const constructGrid = (rows, cols, gen) => {
    const grid = []
    for (let i = 0; i < rows; i++) {
        const row = []
        for (let j = 0; j < cols; j++) {
            row.push(0)
        }
        grid.push(row)
    }
    let checkDuplicate = []
    for (let k = 0; k < gen; k++) {
        let rand1 = Math.floor(Math.random() * (rows))
        let rand2 = Math.floor(Math.random() * (cols))
        var concatRand = `${rand1}${rand2}`
        //check if cell is alive
        if (!checkDuplicate.includes(concatRand)) {
            checkDuplicate.push(concatRand)
            grid[rand1][rand2] = 1
        }
        //remove cell alive if the grid cell is alive
        else if (checkDuplicate.includes(concatRand))
            k--
    }
    return grid
}

const positions = [
    [0, 1],
    [0, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
    [-1, -1],
    [1, 0],
    [-1, 0],
]

function Grid(props) {
    const { generation, horizontal, vertical } = props
    const [grid, setGrid] = useState()
    const [start, setStart] = useState(false)
    const startRef = useRef(start)
    useEffect(() => {
        setGrid(constructGrid(horizontal, vertical, generation))
    }, [])
    function runSimulation() {
        if (!startRef.current) {
            return
        }
        setGrid((g) => {
            const nextGrid = g.map((row, i) => {
                return row.map((cell, j) => {
                    let sum = 0
                    positions.forEach((position) => {
                        const x = i + position[0]
                        const y = j + position[1]
                        if (x >= 0 && x < horizontal && y >= 0 && y < vertical) {
                            sum += g[x][y]
                        }
                    })
                    if (sum < 2 || sum > 3) {
                        return 0
                    }
                    if (sum === 3) {
                        return 1
                    }
                    return g[i][j]
                })
            })
            return nextGrid
        })
    }

    return (
        <>
            <div className="menuGrid">
                <button
                    style={{ marginRight: "20px" }}
                    onClick={() => {
                        setStart(!start)
                        if (!start) {
                            startRef.current = true
                        }
                        setInterval(() => {
                            runSimulation(grid)
                        }, 1000)
                    }}                >
                    {start ? "Stop" : "Play"}
                </button>
                <button
                    style={{ marginLeft: "2px" }}
                    onClick={() => setGrid(constructGrid(horizontal, vertical, generation))}
                >
                    Reset
                </button>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                {grid &&
                    grid.map((rows, i) =>
                        <li key={i} style={{ listStyle: 'none', margin: "20px 0px 10px 20px" }}>{
                            rows.map((col, k) => (
                                <div key={k} style={{ fontSize: "20px", fontWeight: "bold" }}>{grid[i][k] ? '*' : '.'}</div>
                            ))}
                        </li>
                    )}
            </div>
        </>
    )
}

export default Grid