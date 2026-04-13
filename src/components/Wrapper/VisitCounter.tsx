import React, { useState, useEffect } from "react";

const VisitCounter = () => {
  const [visitCount, setVisitCount] = useState(0);

  useEffect(() => {
    // Increment visit count with a POST request to the Next.js API route
    fetch("/api/visits", {
      method: "POST",
    })
      .then(() => {
        // Fetch updated visit count after the POST request
        fetch("/api/visits")
          .then((response) => response.json())
          .then((data) => setVisitCount(data.count))
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));
  }, []);

  return <div>Visit Count: {visitCount}</div>;
};

export default VisitCounter;
