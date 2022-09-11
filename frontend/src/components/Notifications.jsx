import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMeetingActive } from "../redux/userSlice";

function Notifications() {
  const { available, zoomLink } = useSelector(({ user }) => user);
  const dispatch = useDispatch()

  return (
    <div id="notifications" className="notifications col-c-c">
      {available ? (
        <>
          <h1>Pending Students</h1>
          <a 
            className="bg-green-300 rounded px-4 py-2"
            href={zoomLink}
            target="noreferrer"
          >
            {zoomLink}
          </a>
        </>
      ) : (
        <h1 className="bg-red-500 px-4 text-white py-2 rounded">
          No students requesting help.
        </h1>
      )}
    </div>
  );
}

export default Notifications;
