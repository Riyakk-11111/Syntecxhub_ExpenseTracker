import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AddExpense from "./pages/AddExpense";
import Transaction from "./pages/Transaction";
import Settings from "./pages/Settings";
import ForgotPassword from "./pages/ForgotPassword";

function App() {

  return (


    <Routes>

      <Route path="/" element={<Login />} />

      <Route path="/signup" element={<Signup />} />

      <Route path="/dashboard" element={<Dashboard />} />
      <Route
    path="/forgotPassword"
    element={<ForgotPassword />}
/>
      <Route
    path="/settings"
    element={<Settings />}
/>
      <Route
    path="/transaction"
    element={<Transaction />}
/>

      <Route
    path="/addExpense"
    element={<AddExpense />}
/>

    </Routes>

  );

}

export default App;