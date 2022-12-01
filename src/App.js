import "./App.css";
import Login from "./pages/Login";
import { BrowserRouter, Route} from "react-router-dom";
import Dashboard from "./pages/Dashboard"
import { AddTransaction } from "./pages/AddTransaction";
import { ContactUs } from "./pages/Email";

import { GlobalProvider } from './context/GlobalState';


function App() {
  return (
    <GlobalProvider>
    <div>
      <BrowserRouter>
        <Route exact path="/login" component={Login} />
		<Route exact path="/" component={Dashboard} />
    <Route exact path="/transactions" component={AddTransaction} />
    <Route exact path="/contact" component={ContactUs} />
      </BrowserRouter>
    </div>
    </GlobalProvider>
  );
}

export default App;
