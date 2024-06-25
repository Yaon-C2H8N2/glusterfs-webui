import { BrowserRouter } from "react-router-dom";
import Router from "@/components/Router/Router.tsx";
import EventListener from "@/components/EventListener/EventListener.tsx";

function App() {
    return (
        <EventListener>
            <BrowserRouter>
                <Router />
            </BrowserRouter>
        </EventListener>
    );
}

export default App;
