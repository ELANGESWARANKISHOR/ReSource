import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import ProviderDashboard from "./pages/ProviderDashboard";
import RecipientDashboard from "./pages/RecipientDashboard";
import CreateResource from "./pages/CreateResource";
import BrowseResources from "./pages/BrowseResources";
import ResourceDetails from "./pages/ResourceDetails";
import MyRequests from "./pages/MyRequests";
import ManageRequests from "./pages/ManageRequests";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />

                <Route
                    path="/provider"
                    element={<ProviderDashboard />}
                />
                <Route
                    path="/provider/create-resource"
                    element={<CreateResource />}
                />
                <Route
                    path="/recipient"
                    element={<RecipientDashboard />}
                />
                <Route
                    path="/resources"
                    element={<BrowseResources />}
                />     
                <Route
                    path="/resources/:id"
                    element={<ResourceDetails />}
                />  
                <Route
                    path="/recipient/requests"
                    element={<MyRequests />}
                />    
                <Route
                  path="/provider/requests"
                  element={<ManageRequests />}
                /> 
            </Routes>
        </BrowserRouter>
    );
}

export default App;