import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import Loader from "./Loader";

export default function VerificationOtp() {
  const [code, setCode] = useState("");
  const [error,setError]=useState('')
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
   
  async function submitForm(e) {
    e.preventDefault();
    await axios
      .post(`${import.meta.env.VITE_SERVER_LINK}/verification-Otp`, {
        code
      })
      .then(() => {
          setCode('')
          setError('')
        setTimeout(() => {
            setIsLoading(true);
          }, 1000);
          setTimeout(() => {
            setIsLoading(false);
            navigate("/signIn")
          }, 5000);
      })
      .catch((error) => {
        setError(error.response.data.message)
      });
  }
  return (
    <>
    {isLoading && <Loader />}
    <form className="form_container" onSubmit={submitForm}>
      <div className="title_container">
        <p className="title-user">Verify Email</p>
        <span className="subtitle">
         Please the Email and also checked Spam folder for Email Verification Process.
        </span>
      </div>
      <br />
      <div className="input_container">
        <label className="input_label" htmlFor="otp_field">
          Otp
        </label>
        <svg
          id="Layer_1"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 93.22 122.88"
          className="icon"
          >
          <defs>
            <style>{".cls-1{fill-rule:evenodd;}"}</style>
          </defs>
          <title>{"otp"}</title>
          <path
            className="cls-1"
            d="M12.71,0h43A12.74,12.74,0,0,1,68.43,12.71V31.52H64.78V16H3.66v89.07H64.79V95.22l3.65-3v17.93a12.74,12.74,0,0,1-12.71,12.71h-43A12.74,12.74,0,0,1,0,110.17V12.71A12.74,12.74,0,0,1,12.71,0ZM36.4,52a1.85,1.85,0,0,1,3.69,0v2.38l2-1.32a1.83,1.83,0,1,1,2,3l-2.54,1.71,2.55,1.69a1.84,1.84,0,0,1-2,3.06l-2-1.32v2.39a1.85,1.85,0,0,1-3.69,0V61.27l-2,1.32a1.83,1.83,0,1,1-2-3.05l2.55-1.7-2.55-1.7a1.83,1.83,0,1,1,2-3.06l2,1.32V52Zm38.73,0a1.84,1.84,0,0,1,3.68,0v2.38l2-1.32a1.83,1.83,0,0,1,2,3l-2.55,1.71,2.55,1.69a1.84,1.84,0,1,1-2,3.06l-2-1.32v2.39a1.84,1.84,0,1,1-3.68,0V61.27l-2,1.32a1.84,1.84,0,1,1-2-3.05l2.55-1.7-2.55-1.7a1.84,1.84,0,1,1,2-3.06l2,1.32V52ZM55.77,52a1.84,1.84,0,0,1,3.68,0v2.38l2-1.32a1.84,1.84,0,0,1,2,3l-2.55,1.71,2.55,1.69a1.84,1.84,0,1,1-2,3.06l-2-1.32v2.39a1.84,1.84,0,0,1-3.68,0V61.27l-2,1.32a1.83,1.83,0,0,1-2-3.05l2.55-1.7-2.55-1.7a1.84,1.84,0,1,1,2-3.06l2,1.32V52ZM26.55,39.11H88.17a5.08,5.08,0,0,1,5,5.06V71.24a5.26,5.26,0,0,1-5,5.26H66.53C61,83.51,53.79,87.73,45.27,90a1.89,1.89,0,0,1-1.88-.56,1.86,1.86,0,0,1,.15-2.64,20.35,20.35,0,0,0,2.74-2.9,25.27,25.27,0,0,0,3.45-7.6H26.55a5.09,5.09,0,0,1-5.06-5.06V44.17a5.07,5.07,0,0,1,5.06-5.06ZM34.22,109A5.21,5.21,0,1,1,29,114.25,5.22,5.22,0,0,1,34.22,109Z"
            />
        </svg>
        <input
          placeholder="Enter the Otp"
          title="Otp"
          name="Otp"
          type="text"
          className="input_field"
          id="otp_field"
          onChange={(e) => setCode(e.target.value)}
          value={code}
          />
      </div>
      {error && <p className="error">{error}</p>}
      <button title="Sign In" type="submit" className="sign-in_btn">
        <span>Verify</span>
      </button>
    </form>
          </>
  );
}
