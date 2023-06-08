import { useNavigate } from "react-router-dom";
const Unauthorized = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  return (
    <div className="unauthorized">
      <h1 style={{ textAlign: "center" }}>Unauthorized</h1>
      <button onClick={goBack}> Go back </button>
    </div>
  );
};
export default Unauthorized;
