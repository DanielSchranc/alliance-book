import { Route, Routes } from "react-router-dom";
import { Layout } from "src/components/Layout";
import { CharacterDetailsPage } from "src/pages/CharacterDetailsPage";

import { CharactersPage } from "../pages/CharactersPage";
import { NotFoundPage } from "../pages/NotFoundPage";

export const PATHS = {
  home: "/",
  character: "/character/:id",
};

export function Router() {
  return (
    <Routes>
      <Route path={PATHS.home} element={<Layout />}>
        <Route path={PATHS.home} element={<CharactersPage />} />
        <Route path={PATHS.character} element={<CharacterDetailsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
