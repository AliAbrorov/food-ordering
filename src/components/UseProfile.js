// import React, { useEffect, useState } from "react";

// export default function useProfile() {
//   const [data, setData] = useState({});
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     setLoading(true);
//     fetch("/api/profile")
//       .then((res) => {
//         res.json();
//       })
//       .then((data) => {
//         setData(data);
//         setLoading(false);
//         console.log(data);
//       });
//   }, []);

//   return { loading, data };
// }

import { useEffect, useState } from "react";

export default function useProfile() {
  const [data, setData] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    fetch("/api/profile").then((response) => {
      response.json().then((data) => {
        setData(data);
        setLoading(false);
      });
    });
  }, []);

  return { loading, data };
}
