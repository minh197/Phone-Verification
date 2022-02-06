import React, { useRef, useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { firebase, auth } from "../Firebase";

const Logn = () => {
  const [mynumber, setnumber] = useState("");
  const [otp, setotp] = useState("");
  const [show, setshow] = useState(false);
  const [final, setfinal] = useState("");
};

// Sent OTP
const signin = () => {
  if (mynumber === "" || mynumber.length < 10) return;

  let verify = new firebase.auth.RecaptchaVerifier("recaptcha-container");
  auth
    .signInWithPhoneNumber(mynumber, verify)
    .then((result) => {
      setfinal(result);
      alert("code sent");
      setshow(true);
    })
    .catch((err) => {
      alert(err);
      window.location.reload();
    });
};

const ValidateOtp = () => {
  if (otp === null || final === null) return;
  final
    .confirm(otp)
    .then((result) => {
      // success
    })
    .catch((err) => {
      alert("Wrong code");
    });
};

export default function Signup() {
  const phoneNumRef = useRef();
  const { login, currentUser } = useAuth();
  function handleSubmit(e) {
    e.preventDefault();
    login(phoneNumRef.current.value);
  }
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log-in</h2>

          {/* <Form onSubmit={handleSubmit}>
                <Form.Group id="phoneNumber">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type="phone number" ref={phoneNumRef} required></Form.Control>

                </Form.Group>
                <Button className="w-100" type="Submit">Log-in</Button>
            </Form> */}

          <div style={{ marginTop: "200px" }}>
            <center>
              <div style={{ display: !show ? "block" : "none" }}>
                <input
                  value={mynumber}
                  onChange={(e) => {
                    setnumber(e.target.value);
                  }}
                  placeholder="phone number"
                />
                <br />
                <br />
                <div id="recaptcha-container"></div>
                <button onClick={signin}>Send OTP</button>
              </div>
              <div style={{ display: show ? "block" : "none" }}>
                <input
                  type="text"
                  placeholder={"Enter your OTP"}
                  onChange={(e) => {
                    setotp(e.target.value);
                  }}
                ></input>
                <br />
                <br />
                <button onClick={ValidateOtp}>Verify</button>
              </div>
            </center>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}
