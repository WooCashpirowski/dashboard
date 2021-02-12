import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import DashboardView from "./views/DashboardView";
import EditUserView from "./views/EditUserView";
import NewUserView from "./views/NewUserView";

function App() {
  return (
    <Router>
      <main className="py-3">
        <Container>
          <Route path="/" component={DashboardView} exact />
          <Route path="/new-user" component={NewUserView} exact />
          <Route path="/user/:id" component={EditUserView} exact />
        </Container>
      </main>
    </Router>
  );
}

export default App;
