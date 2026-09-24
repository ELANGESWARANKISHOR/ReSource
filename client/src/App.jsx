import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import ProviderDashboard from "./pages/ProviderDashboard";
import RecipientDashboard from "./pages/RecipientDashboard";
import CreateResource from "./pages/CreateResource";
import BrowseResources from "./pages/BrowseResources";
import ResourceDetails from "./pages/ResourceDetails";
import MyRequests from "./pages/MyRequests";
import ManageRequests from "./pages/ManageRequests";
import Register from "./pages/Register";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route
                    path="/"
                    element={<LandingPage />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/provider"
                    element={
                        <ProtectedRoute role="provider">
                            <ProviderDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/provider/create-resource"
                    element={
                        <ProtectedRoute role="provider">
                            <CreateResource />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/provider/requests"
                    element={
                        <ProtectedRoute role="provider">
                            <ManageRequests />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/recipient"
                    element={
                        <ProtectedRoute role="recipient">
                            <RecipientDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/recipient/requests"
                    element={
                        <ProtectedRoute role="recipient">
                            <MyRequests />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/resources"
                    element={
                        <ProtectedRoute>
                            <BrowseResources />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/resources/:id"
                    element={
                        <ProtectedRoute>
                            <ResourceDetails />
                        </ProtectedRoute>
                    }
                />

            </Routes>
        </BrowserRouter>
    );
}

export default App;