import { useEffect, useState } from "react";
import "../styles.css"
import supabase from '../supabase';

export default function LoginPage({setCurrentPage, user, setUser}){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleLogin(e) {
        e.preventDefault();
        setLoading(true);

        const {data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

    if (error) {
      alert('Error logging in: ' + error.message);
      return;
    } else {
        setUser(data.user);
    }
    setLoading(false);
  }

  async function handleSignUp(e) {
    e.preventDefault();
    setLoading(true);

    const {data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert('Error signing up: ' + error.message);
    } else {
      alert('Check your email to confirm your account!');
    }
    setLoading(false);
  }

    return(
        <div>
            <h2>Login Page</h2>
            <p>{user ? 'Logged In!' : 'Please Login'}</p>
            <div class='login-form'>
                <form className="login-form" onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" disabled={loading} className="btn btn-large">
                        {loading ? 'Loading...' : 'Login'}
                    </button>
                    <button type="button" onClick={handleSignUp} disabled={loading} className="btn btn-large">
                        {loading ? 'Loading...' : 'Sign Up'}
                    </button>
                    <button type="button" onClick={() => setCurrentPage("FactSharePage")} className="btn">
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    )

}