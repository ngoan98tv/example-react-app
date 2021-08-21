import { useEffect, useState } from "react";

function useUserUpdate() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [result, setResult] = useState();

  const update = (id, newUser) => {
    setLoading(true);
    setSuccess(false);
    setError(false);
    fetch(`https://61176b1030022f0017a05df6.mockapi.io/api/v1/users/${id}`, {
      method: "put",
      body: JSON.stringify(newUser),
    })
      .then((res) => {
          if (res.ok) return res.json();
          throw new Error('request failed');
      })
      .then((json) => {
        setResult(json);
        setSuccess(true);
      })
      .catch((error) => setError(true))
      .finally(() => setLoading(false));
  };

  return [update, { result, loading, success, error }];
}

export default useUserUpdate;
