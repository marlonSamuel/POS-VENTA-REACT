import { createContext, useContext, useEffect, useReducer, useState } from "react";
import  api  from "../../api/axios";
import { IUser, IAuthData, ILoginData } from "../../interfaces/IAuth";
import { UIContext } from "../UIContext";
import { authReducer, IAuthState } from "./AuthReducer";

export interface AuthContextProps {
    errorMessage: string;
    user: IUser | null;
    logged: boolean;
    token: string | null;
    login: (loginData: ILoginData) => void;
    logout: () => void;
    refreshToken: () => void;
    removeError: () => void;
}

export const initialState: IAuthState = {
    logged: false,
    user: null,
    errorMessage: '',
    token: null
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
      const logged = localStorage.getItem('logged');
      if(logged){
          checkToken();
      }
      
    }, [])


    //verificar si existe token activo
    const checkToken = async() => {
        const token = await localStorage.getItem('token');

        //no token, no autenticadl
        if(!token) return;

        //hay token
        await api.get<IUser>('/auth/me').then(r=> {
            dispatch({
                type: 'login',
                payload: {
                    token: token,
                    user: r.data
                }
            });
        }).catch(e=>{
            dispatch({
                type: 'addError',
                payload: e.error
            })
        });

        
    }

    //refrescar token en caso de ser necesario
    const refreshToken = () => {
        dispatch({type: 'logout'});
        localStorage.removeItem('logged');
        return true;
    }
    

    //disparar estado login
    const login = async( {username, password} : ILoginData ) => {

        await api.post<IAuthData>('/auth/login',{username, password}).then(r=>{
            localStorage.setItem('logged','true');
            localStorage.setItem('token',r.data.access_token);
            localStorage.setItem('refresh_token', r.data.refresh_token);
            dispatch({
                type: 'login',
                payload: {
                    token: r.data.access_token,
                    user: r.data.user
                }
            });
        }).catch(e=> {
            dispatch({
                type: 'addError',
                payload: e.error
            })
        });
    }

    //disparar estado logout
    const logout = () => {
        dispatch({type: 'logout'});
        localStorage.removeItem('logged');
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
        return true;
    }

    const removeError = () => {
        dispatch({
            type: 'removeError'
        })
    }

    return (
        <AuthContext.Provider value={{
            ...state,
            login,
            logout,
            refreshToken,
            removeError
        }}>
            { children }
        </AuthContext.Provider>
    )
}
