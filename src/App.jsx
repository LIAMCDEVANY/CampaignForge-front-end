import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import CampaignListPage from "./pages/CampaignListPage";
import CampaignNewPage from "./pages/CampaignNewPage";
import CampaignDetailPage from "./pages/CampaignDetailPage";
import CampaignEditPage from "./pages/CampaignEditPage";

import NavBar from "./components/NavBar";

function App() {
  return (
    <BrowserRouter>
      <NavBar />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/campaigns" element={<CampaignListPage />} />
        <Route path="/campaigns/new" element={<CampaignNewPage />} />
        <Route path="/campaigns/:id" element={<CampaignDetailPage />} />
        <Route path="/campaigns/:id/edit" element={<CampaignEditPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;