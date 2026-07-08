import "./profileUpdatePage.scss";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest.js";
import { useNavigate } from "react-router-dom";
import UploadWidget from "../../components/uploadWidget/uploadWidget.jsx";


function ProfileUpdatePage() {
  const [error, setError] = useState("");
  const {currentUser, updateUser} = useContext(AuthContext);
  const [avatar, setAvatar] = useState(currentUser.avatar);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const {username, email, password} = Object.fromEntries(formData);

    const body = {
      username,
      email,
      ...(password ? { password } : {}),
      ...(avatar ? { avatar } : {}),
    };

    try {
      const res = await apiRequest.put(`/users/${currentUser.id}`, body);
      updateUser(res.data);
      navigate('/profile');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to update user');
    }
  };

  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="username">Username</label>
            <input id="username" name="username" type="text" defaultValue={currentUser.username} />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" defaultValue={currentUser.email} />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" />
          </div>
          <button>Update</button>
          {error && <span>{error}</span>}
        </form>
      </div>
      <div className="sideContainer">
        <img src={avatar[0] || currentUser.avatar || "/noavatar.webp"} alt="" className="avatar" 
        />
        <UploadWidget uwConfig={{
          cloudName: "u1ckphcd",
          uploadPreset: "real-estate",
          multiple: false,
          maxImageFileSize: 2000000,
          folder: "avatar",
        }} 
        setState={setAvatar}
        />
      </div>
    </div>
  );
}

export default ProfileUpdatePage;
