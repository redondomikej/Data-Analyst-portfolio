import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-[#1B263B] text-white py-4 shadow-md">
      <ul className="flex justify-center space-x-6">
        <li><Link to="/" className="hover:text-cyan-400">Home</Link></li>
        <li><Link to="/skills" className="hover:text-cyan-400">Skills</Link></li>
        <li><Link to="/projects" className="hover:text-cyan-400">Projects</Link></li>
        <li><Link to="/experience" className="hover:text-cyan-400">Experience</Link></li>
        <li><Link to="/awards" className="hover:text-cyan-400">Awards</Link></li>
        <li><Link to="/contact" className="hover:text-cyan-400">Contact</Link></li>
      </ul>
    </nav>
  );
}
