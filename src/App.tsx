import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/AdminProfile";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Candidates from "./pages/Candidates";
import Elections from "./pages/Elections";
import ElectionResults from "./pages/ElectionResults";
import Home from "./pages/Dashboard/Home";
import ElectionResultView from "./pages/ElectionResults/components/ElectionResultView";
import VotersPage from "./pages/Voters";
import ForgotPasswordForm from "./pages/AuthPages/ForgetPassword";

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route element={<AppLayout />}>
            <Route index path="/" element={<Home />} />
            <Route path="/profile" element={<UserProfiles />} />
            <Route path="/elections" element={<Elections />} />

            <Route path="/electionResults" element={<ElectionResults />} />
            <Route
              path="/electionResults/:id"
              element={<ElectionResultView />}
            />
            <Route path="/candidates" element={<Candidates />} />
            <Route path="/voters" element={<VotersPage />} />
          </Route>

          <Route path="/signin" element={<SignIn />} />
          <Route path="/forgot-password" element={<ForgotPasswordForm />} />
          <Route path="/signup" element={<SignUp />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
