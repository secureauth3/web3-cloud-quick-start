import  React from "react";
import { useNavigate } from "react-router-dom";

export default function LangingPage() {
  let navigate = useNavigate();

  return <div>
    <h3>My Dapps Landing Page</h3>
    <button
        onClick={() => {
          navigate("/auth");
        }}
      >
        Get Started
      </button>
  </div>
}