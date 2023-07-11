const express = require("express");
const { jugadores } = require("./jugadores");
const { NotFoundError, ExistentResourceError } = require("./errors");

const app = express();
const PORT = 3500;

//MW
app.use(express.json());
app.use(express.urlencoded());

app.listen(PORT || 3000, () =>
  console.log("SERVIDOR CORRIENDO EN EL PUERTO " + PORT)
);

app.get("/jugadores", (req, res) => {
  return res.status(200).json({ total: jugadores.length, jugadores });
});

app.get("/jugadores/:id", (req, res) => {
  try {
    const { id } = req.params;
    const jugadorBuscado = jugadores.find((item) => item.id == id);

    if (!jugadorBuscado)
      throw new NotFoundError("El jugador buscado no existe");

    return res.status(200).json({ ok: true, data: jugadorBuscado });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      ok: false,
      message: error.message,
    });
  }
});

app.post("/jugadores", (req, res) => {
  try {
    if (jugadores.find((item) => item.id == req.body.id)) {
      throw new ExistentResourceError("Ya existe un jugador con este id");
    }

    if (jugadores.find((item) => item.nombre === req.body.nombre)) {
      throw new ExistentResourceError("Ya existe un jugador con este nombre");
    }

    jugadores.push(req.body);

    return res.status(201).json({
      success: true,
      message: "Jugador agregado con éxito",
      jugadores,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
});
