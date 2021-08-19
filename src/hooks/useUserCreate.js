import { useEffect, useState } from "react";

function useUserCreate() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [result, setResult] = useState();

    const create = (newUser) => {
        setLoading(true);
        setSuccess(false);
        setError(false);
        fetch('https://61176b1030022f0017a05df6.mockapi.io/api/v1/users', {
            method: 'post',
            body: JSON.stringify(newUser),
        })
            .then(res => res.json())
            .then(json => {
                setResult(json);
                setSuccess(true);
            })
            .catch(error => setError(true))
            .finally(() => setLoading(false))
    };

    return [create, { result, loading, success, error }];
}

export default useUserCreate
