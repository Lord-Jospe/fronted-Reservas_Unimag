import { useAuth } from "../../auth/AuthProvider";
import Navbar from "../../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";


function UserProfile() {
  const {logout} = useAuth();
  const navigate = useNavigate();
  
    function handleLogout() {
    logout();
    navigate("/login");
    }
  return (
    <div>
      <Navbar />
      <h1>User Profile</h1>
      <p>This is the user profile page.</p>
      <button className="Button-Logout" onClick={handleLogout}>
        {" "}
        Cerrar Sesion
      </button>
    </div>
  );
}

export default UserProfile;
