/* eslint-disable @next/next/no-img-element */
'use client';
import { authenticate } from "@/actions";
import AuthDA from "@/app/api/authDA";
import { sign_in_user } from "@/constants/default-values";
import * as RoutePaths from "@/constants/route-paths";
import { useRouter } from 'next/navigation';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { InputText } from 'primereact/inputtext';
import { Message } from "primereact/message";
import { Password } from 'primereact/password';
import { Skeleton } from "primereact/skeleton";
import { Toast } from "primereact/toast";
import { classNames } from 'primereact/utils';
import { FormEvent, useRef, useState } from 'react';

interface User {
  email: string;
  password: string;
}

const LoginPage = () => {
  const [user, setUser] = useState<User>(sign_in_user);
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isValid, setIsValid] = useState(true);
  const toast = useRef<Toast>(null);

  const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden', { 'p-input-filled': true });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateForm()) return; 
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');

    try {
      const response = await AuthDA.sign_in({ email, password });
      console.log(response);
      const { success } = response;
      setLoading(false);
      if (success) {
        authenticate(response);
        toast.current?.show({ 
            severity: 'success', 
            summary: 'Successful', 
            detail: "Signed In successfully!", 
            life: 2000 
        });
        setTimeout(() => {
          push(RoutePaths.impact_areas_list);
        }, 500);

      } else {
        toast.current?.show({ 
            severity: 'error', 
            summary: 'Error', 
            detail: 'Email or Password is not correct', 
            life: 6000
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleOnChange = (key: keyof User, value: string) => {
    setUser(prevUser => ({ ...prevUser, [key]: value }));
  };

  const validateForm = () => {
    let isValid = true;
    if (!user.email) {
      setEmailError('Email is required');
      isValid = false;
    } else {
      setEmailError('');
    }
    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } 
    if (!user.password) {
        setPasswordError('Password is required');
        isValid = false;
    }else {
      setPasswordError('Please provide correct credentials.');
    }
    setIsValid(isValid); 
    return isValid;
  };

  return (
    <div className={containerClassName}>
      <Toast ref={toast} />  
      <div className="flex flex-column align-items-center justify-content-center">
        <img src={`/layout/images/logo-white.svg`} alt="Tapestry logo" className="mb-5 w-6rem flex-shrink-0" />
        <div
          style={{
            borderRadius: '55px',
            padding: '0.2rem',
            background: 'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 50%)'
          }}
        >
          <div className="w-full surface-card py-8 px-5 sm:px-8" style={{ borderRadius: '53px' }}>
            <div className="text-center mb-5">
              <div className="text-900 text-3xl font-medium mb-3">Sign in to continue</div>
            </div>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email" className="block text-900 text-xl font-medium mb-2">
                    Email
                    </label>
                    <div>
                        <InputText 
                            id="email" type="email" name="email" placeholder="Email address" 
                            onChange={(e) => { handleOnChange("email", e.target.value) }} 
                            className={`w-full md:w-30rem ${!isValid && !user.email ? 'p-invalid mb-1' : 'mb-5'}`} 
                            style={{ padding: '1rem' }} 
                        />
                    </div>
                    <div>
                        {!isValid && !user.email && 
                            <Message severity="error" text={emailError} className="mb-5"/>
                        }
                    </div>

                    <label htmlFor="password" className="block text-900 font-medium text-xl mb-2">
                    Password
                    </label>
                    <div>
                        <Password 
                            inputId="password" name="password" value={password} placeholder="Password" 
                            onChange={(e) => {
                                handleOnChange("password", e.target.value);
                                setPassword(e.target.value);
                            }}
                            toggleMask inputClassName="w-full p-3 md:w-30rem" feedback={false}
                            className={`w-full ${!isValid && !password ? 'p-invalid mb-1' : 'mb-5'}`}
                        />
                    </div>
                    <div>
                        {!isValid && !password && 
                            <Message severity="error" text={passwordError} className="mb-5"/>
                        } 
                    </div>

                    <div className="flex align-items-center justify-content-between mb-5 gap-5">
                    <div className="flex align-items-center">
                        <Checkbox inputId="rememberme1" checked={checked} onChange={(e) => setChecked(e.checked ?? false)} className="mr-2"></Checkbox>
                        <label htmlFor="rememberme1">Remember me</label>
                    </div>
                    {/* <a className="font-medium no-underline ml-2 text-right cursor-pointer" style={{ color: 'var(--primary-color)' }}>
                        Forgot password?
                    </a> */}
                    </div>
                    <Button label="Sign In" className="w-full p-3 text-xl"></Button>
                    {loading && 
                        <div className="pt-2">
                            <Skeleton width="100%" height="1vw"></Skeleton>
                        </div>
                    }
                </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
