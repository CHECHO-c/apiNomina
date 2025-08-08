import express from "express";
import "dotenv/config";
import cors from "cors";
import empleado from "./src/empleado.js";


const app = express();


app.use(express.json());
app.use(cors());
app.use("/empleado",empleado)

app.use("/", (req, res) => {
    console.log("Bienvenido ala api de nomina")
});

const puerto = 4001;

app.listen(puerto, () => {
    console.log(`http://localhost:${puerto}`)
})