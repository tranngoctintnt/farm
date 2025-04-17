import { Button } from "@mui/material";
import React, {useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import Loading from "../../Components/Loading";
import api from "../../api";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, setUser, loading: authLoading } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (!authLoading && user) {
      navigate('/dash-board', { replace: true }); 
    }
  }, [user, authLoading, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setError('');

    try {
      const response = await api.post(
        '/admin/login',
        { username, password },
        { withCredentials: true }
      );

      if (response.status === 200) {
        setUser(response.data.user);
        navigate('/dash-board', { state: { message: 'Login successful' } });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return <div><Loading/></div>; // Show loading while checking auth
  }
  return (
    <div className="flex w-full flex-col justify-center items-center py-10 px-5">
      <div className="mx-auto w-full max-w-md py-12 md:max-w-lg lg:max-w-xl 2xl:pb-8 2xl:pt-2">
        <div className="flex flex-col items-center">
          <a className="mb-7 inline-block max-w-[100px] lg:mb-9" href="/">
            <img
              alt="logo"
              loading="lazy"
              width="100"
              height="100"
              decoding="async"
              data-nimg="1"
              src="../../logo-stf.png"
              className="transparent"
            />
          </a>
          <h2 className="rizzui-title-h2 mb-7 text-center text-[28px] font-bold leading-snug md:text-3xl md:!leading-normal lg:mb-10 lg:text-4xl">
            Welcome Back! <br /> Sign in with your credentials.
          </h2>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="space-y-5 lg:space-y-6">
            <div className="rizzui-input-root flex flex-col [&amp;>label>span]:font-medium">
              <label className="block">
                <span className="rizzui-input-label block text-base mb-2 font-medium">
                  User name
                </span>
                <span
                  className="rizzui-input-container flex items-center peer w-full transition duration-200 [&amp;.is-focus]:ring-[0.8px] ring-[0.6px] [&amp;.is-hover]:border-primary [&amp;.is-focus]:border-primary [&amp;.is-focus]:ring-primary [&amp;_input::placeholder]:opacity-60 px-5 py-2.5 text-base h-14 rounded-md border border-muted ring-muted bg-transparent"
                  data-focus="false"
                  data-hover="false"
                >
                  <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    disabled={loading}
                    placeholder="Enter your username"
                    className="rizzui-input-field inherit w-full border-0 bg-transparent p-0 focus:outline-none focus:ring-0 [&amp;::-ms-clear]:hidden [&amp;::-ms-reveal]:hidden [&amp;::-webkit-search-cancel-button]:hidden [&amp;::-webkit-inner-spin-button]:m-0 [&amp;::-webkit-inner-spin-button]:appearance-none [&amp;::-webkit-outer-spin-button]:m-0 [&amp;::-webkit-outer-spin-button]:appearance-none"
                    type="text"
                    name="username"
                  />
                </span>
              </label>
            </div>
            <div className="rizzui-password-root flex flex-col [&amp;>label>span]:font-medium">
              <label className="block">
                <span className="rizzui-password-label block text-base mb-2 font-medium">
                  Password
                </span>
                <span
                  className="rizzui-password-container flex items-center peer w-full transition duration-200 [&amp;.is-focus]:ring-[0.8px] ring-[0.6px] [&amp;.is-hover]:border-primary [&amp;.is-focus]:border-primary [&amp;.is-focus]:ring-primary [&amp;_input::placeholder]:opacity-60 px-5 py-2.5 text-base h-14 rounded-md border border-muted ring-muted bg-transparent"
                  data-focus="false"
                  data-hover="false"
                >
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                    placeholder="Enter your password"
                    className="rizzui-password-field w-full border-0 bg-transparent p-0 focus:outline-none focus:ring-0 [&amp;::-ms-clear]:hidden [&amp;::-ms-reveal]:hidden [&amp;::-webkit-search-cancel-button]:hidden [&amp;::-webkit-inner-spin-button]:m-0 [&amp;::-webkit-inner-spin-button]:appearance-none [&amp;::-webkit-outer-spin-button]:m-0 [&amp;::-webkit-outer-spin-button]:appearance-none"
                    type="password"
                    name="password"
                  />
                  <span
                    role="button"
                    className="rizzui-password-toggle-icon whitespace-nowrap leading-normal"
                  ></span>
                </span>
              </label>
            </div>
            <div className="flex items-center justify-between pb-1">
              <div className="rizzui-checkbox-root flex flex-col [&amp;>label>span]:font-medium">
                <label className="rizzui-checkbox-container flex cursor-pointer flex-row items-center">
                  <span className="relative leading-none">
                    <input
                      className="rizzui-checkbox-input peer checked:bg-none focus:ring-offset-background transition duration-200 ease-in-out disabled:bg-muted/70 disabled:backdrop-blur disabled:border-muted h-6 w-6 rounded bg-transparent border border-muted ring-[0.6px] ring-muted focus:ring-muted checked:!bg-primary checked:!border-primary hover:enabled:border-primary"
                      type="checkbox"
                      name="rememberMe"
                    />
                  </span>
                  <span className="rizzui-checkbox-label text-sm font-medium ms-2 mb-0">
                    Remember Me
                  </span>
                </label>
              </div>
              {/* <a
                className="h-auto p-0 text-sm font-semibold text-gray-700 underline transition-colors hover:text-primary hover:no-underline"
                href="/auth/forgot-password"
              >
                Forgot Password?
              </a> */}
            </div>
            <Button
              className="rizzui-button !text-white !font-salute !inline-flex !font-medium !items-center !justify-center active:enabled:!translate-y-px focus:!outline-none focus-visible:!ring-[1.8px] focus-visible:ring-offset-2 !ring-offset-background !transition-colors !duration-200 !px-8 !py-2.5 !text-base h-14 !rounded-md !border !border-transparent dark:!backdrop-blur !bg-primary hover:!bg-primary-dark dark:hover:bg-primary/90 focus-visible:!ring-muted !text-primary-foreground !w-full"
              type="submit"
            >
              Sign In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
