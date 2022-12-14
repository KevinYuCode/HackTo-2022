import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setEmail,
  setExpertise,
  setGender,
  setLanguage,
  setTagInput,
  setTags,
  setZoomLink,
} from "../redux/userSlice";
import Container from "./Container";
import FEMALE from "../assets/FEMALE.svg";

function TutorProfile() {
  const {
    age,
    tags,
    zoomLink,
    userType,
    gender,
    language,
    expertise,
    email,
    tagInput,
  } = useSelector(({ user }) => user);
  const { username } = useSelector(({ auth }) => auth);
  const dispatch = useDispatch();
  const handleAddTag = (e) => {
    e.preventDefault();
  };

  const updateSettings = (e) => {
    e.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Access-Control-Allow-Origin", "*");

    var urlencoded = new URLSearchParams();
    urlencoded.append("username", username);
    urlencoded.append("age", age ?? 0);
    urlencoded.append("zoomLink", zoomLink);
    urlencoded.append("userType", userType);
    urlencoded.append("tags", tags.toString());
    urlencoded.append("gender", gender);
    urlencoded.append("language", language);
    urlencoded.append("expertise", expertise);
    urlencoded.append("email", email);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch("http://127.0.0.1:5000/settings", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) console.log("WORKING");
        else console.log("FAILED");
      })
      .catch((error) => {
        alert(error);
        return;
      });
  };
  return (
    <div id="profile" className="tutor-profile-container">
      <Container classProp={"tutor"}>
        <div className="tutor-profile-content  col-c-fs">
          <div className="profile-img row-c-c">
            <img src={FEMALE} alt="" />
          </div>

          {/* NAME */}
          <h1 className="tutor-input text-6xl">{username}</h1>
          {/* ZOOM */}

          <input
            className="tutor-input "
            type="text"
            value={zoomLink}
            placeholder="Zoom Link"
            onChange={(e) => {
              dispatch(setZoomLink(e.target.value));
            }}
          />
          {/* TAGS */}

          <form className="tags" onSubmit={handleAddTag}>
            <input
              className="tutor-input "
              type="text"
              placeholder="tags"
              value={tagInput}
              onChange={(e) => {
                dispatch(setTagInput(e.target.value));
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  dispatch(setTags(e.target.value));
                }
              }}
            />
            <div className="tags-list row-se-c mt-5">
              {tags?.map((tag) => (
                <div className="tag  py-2 px-5 rounded">{tag}</div>
              ))}
            </div>
          </form>
          {/* EXPERTISE */}
          <input
            className="tutor-input "
            type="text"
            placeholder="Expertise"
            value={expertise}
            onChange={(e) => {
              dispatch(setExpertise(e.target.value));
            }}
          />
          {/* LANGUAGE */}
          <input
            className="tutor-input "
            type="text"
            placeholder="Language"
            value={language}
            onChange={(e) => {
              dispatch(setLanguage(e.target.value));
            }}
          />
          {/* GENDER */}
          <input
            className="tutor-input "
            type="text"
            placeholder="Gender"
            value={gender}
            onChange={(e) => {
              dispatch(setGender(e.target.value));
            }}
          />
          {/* EMAIL */}
          <input
            className="tutor-input "
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              dispatch(setEmail(e.target.value));
            }}
          />
        </div>
        <div className="tutor-profile-save">
          <button
            className="border-b bg-green-500 text-white mt-5"
            onClick={(e) => {
              updateSettings(e);
            }}
          >
            Save
          </button>
        </div>
      </Container>
    </div>
  );
}

export default TutorProfile;
