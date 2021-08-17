import { useEffect, useState } from "react";

function useUsers() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [data, setData] = useState();

    useEffect(() => {
        setLoading(true);
        setSuccess(false);
        setError(false);
        fetch('https://61176b1030022f0017a05df6.mockapi.io/api/v1/users')
            .then(res => res.json())
            .then(json => {
                setData(json);
                setSuccess(true);
            })
            .catch(error => setError(true))
            .finally(() => setLoading(false))
    }, [])

    return [data, loading, success, error];
}

export default useUsers
