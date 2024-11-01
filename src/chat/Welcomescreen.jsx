import React from "react";

function Welcomescreen({ currentuser }) {
  const date = new Date();
  const hour = date.getHours();

  // Determine the greeting based on the hour
  let greeting;
  if (hour >= 5 && hour < 11) {
    greeting = "Good Morning";
  } else if (hour >= 11 && hour < 16) {
    greeting = "Good Afternoon";
  } else if (hour >= 16 && hour < 20) {
    greeting = "Good Evening";
  } else {
    greeting = "Good Night";
  }
  return (
    <div className="chat-welcome">
      <div>
        <h3>{`${greeting}, ${currentuser.firstName} !`}</h3>
        <p>Select user to chat</p>
      </div>
    </div>
  );
}

export default Welcomescreen;
