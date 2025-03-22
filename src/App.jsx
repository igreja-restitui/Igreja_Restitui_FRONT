import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Doacao from "./pages/Doacao";
import NotFound from "./pages/NotFound";
import About from "./pages/About";

import CadMembro from "./pages/admin/CadMembro";
import ListMembroPage from "./pages/admin/ListMembro.page";
import MembroDetail from "./pages/admin/MembroDetail";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/pix" element={<Doacao />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/membros/cadastrar" element={<CadMembro />} />
        <Route path="/admin/membros/listar" element={<ListMembroPage />} />
        <Route path="/admin/membros/:id" element={<MembroDetail />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
