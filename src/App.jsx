import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import EditarClientes from "./paginas/EditarClientes";

import NuevoCliente from "./paginas/NuevoCliente";
import Inicio from "./paginas/Inicio";
import VerCliente from "./paginas/VerCliente";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/clientes" element={<Layout />}>
          <Route index element={<Inicio />} />
          <Route path="nuevo" element={<NuevoCliente />} />
          <Route path="editar/:id" element={<EditarClientes />} />
          <Route path=":id" element={<VerCliente  />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
