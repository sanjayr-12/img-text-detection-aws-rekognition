import axios from "axios";
import { useState } from "react";
import "./App.css"; 

function App() {
  const [img, setImg] = useState(null);
  const [pending, setPending] = useState(false);
  const [texts, setTexts] = useState([]);

  const handleImg = (e) => {
    setImg(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!img) return; 

    const formData = new FormData();
    formData.append("img", img);

    try {
      setPending(true);
      const response = await axios.post("http://localhost:3000/img", formData);
      setTexts(response.data);
    } catch (error) {
      console.log("Error uploading image:", error);
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="app-container">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <input type="file" name="img" accept="image/*" onChange={handleImg} />
          <br />
          <button type="submit" disabled={pending}>
            {pending ? "Uploading..." : "Upload Image"}
          </button>
        </form>
      </div>

      <div className="result-container">
        {pending && <h1>Loading...</h1>}
        {texts.length > 0 && (
          <ul>
            {texts.map((text, index) => (
              <li key={index}>{text}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
