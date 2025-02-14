import { Navbar } from "./components/navbar"
import { Sidebar } from "./components/sidebar";
import Dashboard from "./components/dashboard";

export default function Home() {
  return (
    <div>
    <Navbar/>
    <Dashboard />
    </div>
  );
}
