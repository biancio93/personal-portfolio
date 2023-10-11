import { useState } from "react";
import axios from "axios";
import "./contact-form.css";
import { NavLink } from "react-router-dom";

export default () => {
  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    info: { error: false, msg: null },
  });
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    message: "",
    privacy: "",
  });
  const handleServerResponse = (ok, msg) => {
    if (ok) {
      setStatus({
        submitted: true,
        submitting: false,
        info: { error: false, msg: msg },
      });
      setInputs({
        name: "",
        email: "",
        message: "",
        privacy: "",
      });
    } else {
      setStatus({
        info: { error: true, msg: msg },
      });
    }
  };
  const handleOnChange = (e) => {
    e.persist();
    setInputs((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
    setStatus({
      submitted: false,
      submitting: false,
      info: { error: false, msg: null },
    });
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    setStatus((prevStatus) => ({ ...prevStatus, submitting: true }));
    axios({
      method: "POST",
      url: "https://formspree.io/f/mjvqyroz",
      data: inputs,
    })
      .then((response) => {
        handleServerResponse(
          true,
          "Ti ringrazio, il tuo messaggio è stato inviato!"
        );
      })
      .catch((error) => {
        handleServerResponse(false, error.response.data.error);
      });
  };
  return (
    <main>
      <form className="flex-form" onSubmit={handleOnSubmit}>
        <div className="form-col-6">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            onChange={handleOnChange}
            required
            value={inputs.name}
            className="input-field"
          />
        </div>
        <div className="form-col-6">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="_replyto"
            onChange={handleOnChange}
            required
            value={inputs.email}
            className="input-field"
          />
        </div>
        <div className="form-col-12">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            onChange={handleOnChange}
            required
            value={inputs.message}
          />
        </div>
        <div className="form-col-12 privacy-col">
          <input
            id="privacy"
            type="checkbox"
            onChange={handleOnChange}
            required
            value={inputs.privacy}
          />
          <span>Dichiaro di aver letto e compreso la <NavLink to="privacy-policy">privacy policy</NavLink> del sito</span>
        </div>
        <button
          className="input-button"
          type="submit"
          disabled={status.submitting}
        >
          {!status.submitting
            ? !status.submitted
              ? "Submit _"
              : "Submitted _"
            : "Submitting..."}
        </button>
      </form>
      {status.info.error && (
        <div className="error">Error: {status.info.msg}</div>
      )}
      {!status.info.error && status.info.msg && <p>{status.info.msg}</p>}
    </main>
  );
};
