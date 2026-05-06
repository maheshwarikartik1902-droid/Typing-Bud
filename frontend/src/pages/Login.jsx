import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
    const { login } = useAuth();
    const navigate  = useNavigate();

    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError]  = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(form.email, form.password);
            navigate('/practice');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-100">
            <div className="card bg-base-200 shadow-xl w-full max-w-md">
                <div className="card-body gap-6">

                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-primary font-mono">Typing Bud</h1>
                        <p className="text-base-content opacity-60 text-sm mt-1">Welcome back</p>
                    </div>

                    {error && (
                        <div className="alert alert-error text-sm py-2">
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <label className="form-control">
                            <div className="label">
                                <span className="label-text">Email</span>
                            </div>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                                className="input input-bordered w-full"
                                required
                            />
                        </label>

                        <label className="form-control">
                            <div className="label">
                                <span className="label-text">Password</span>
                            </div>
                            <input
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className="input input-bordered w-full"
                                required
                            />
                        </label>

                        <button
                            type="submit"
                            className="btn btn-primary w-full mt-2"
                            disabled={loading}
                        >
                            {loading ? <span className="loading loading-spinner loading-sm" /> : 'Login'}
                        </button>
                    </form>

                    <p className="text-center text-sm opacity-60">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-primary hover:underline">
                            Register
                        </Link>
                    </p>

                </div>
            </div>
        </div>
    );
}