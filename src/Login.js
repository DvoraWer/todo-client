import React, { useState } from 'react';
import service from './service.js';

function Login({ onSuccess }) {
    const [isRegister, setIsRegister] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function submit(e) {
        e.preventDefault();
        setError("");
        try {
            if (isRegister) {
                await service.register(username, password);
            } else {
                await service.login(username, password);
            }
            onSuccess();
        } catch {
            setError(isRegister ? "Username already exists" : "Wrong username or password");
        }
    }

    return (
        <section className="todoapp">
            <header className="header">
                <h1>{isRegister ? "register" : "login"}</h1>
                <form onSubmit={submit}>
                    <input className="new-todo" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <input className="new-todo" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit" style={{ width: "100%", padding: "12px", fontSize: "18px", cursor: "pointer" }}>
                        {isRegister ? "Register" : "Login"}
                    </button>
                </form>
            </header>
            {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
            <p style={{ textAlign: "center", padding: "10px" }}>
                <a href="#" onClick={(e) => { e.preventDefault(); setIsRegister(!isRegister); setError(""); }}>
                    {isRegister ? "Already have an account? Login" : "New user? Register"}
                </a>
            </p>
        </section>
    );
}

export default Login;