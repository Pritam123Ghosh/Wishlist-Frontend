import { Route, Routes } from "react-router-dom";

import Header from "../layouts/Header";
import Home from "../pages/Home";
import Achive from "../pages/Achive";
import Footer from "../layouts/Footer";

const AppRoutes = () => {
  return (
    <>
      <Header />
      <Routes>
        {/* <Route path="/" element={<Landing />} />
      <Route path="/searchProperties" element={<Home />} />
      <Route
        path="/propertyDetails/:propertyID"
        element={<PropertyDetails />}
      />
      <Route path="/builderDetails/:builderID" element={<BuilderDetails />} /> */}

        <Route path="/" element={<Home />} />
        {/* <Route path="*" element={<NotFound />} /> */}
        <Route path="/achieved-wishes" element={<Achive />} />
      </Routes>
      <Footer />
    </>
  );
};

export default AppRoutes;
