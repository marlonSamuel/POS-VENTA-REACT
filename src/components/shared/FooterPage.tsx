import { Footer } from 'antd/lib/layout/layout'
import React, { useContext } from 'react'
import { AuthContext } from '../../context/auth/AuthContext';
import { UIContext } from '../../context/UIContext';

export const FooterPage = () => {
  const {logged} = useContext(AuthContext);
  return (
    <Footer hidden={!logged} style={{ textAlign: 'center'}}>GE ©2022</Footer>
  )
}
