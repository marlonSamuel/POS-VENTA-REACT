import { LoadingOutlined } from "@ant-design/icons";
import { notification } from "antd";
import { NotificationApi } from "antd/lib/notification";
import CurrencyFormat from "react-currency-format";

export const initialState = {
    current_page: 0,
    first_page_url: '',
    data: [] as any,
    from: 0,
    last_page: 0,
    last_page_url: '',
    next_page_url: '',
    path: '',
    per_page: 0,
    prev_page_url: '',
    to: 0,
    total: 0
}

export const notificationMessage = (type: string, message: string, err: string) => {
    if(type == 'success' || type == 'warning' || type== 'error' || type=='info')
        notification[type]({ message: message, description: err, duration: 5});
    return;
}

export const loadingIcon = () => {
    return (
        <>
            <LoadingOutlined style={{ fontSize: 40 }} spin />
        </>
    )
}

//obtener formato en quetzales para los montos
export const getCurrencyFormat = (value: number)=>{
    console.log(value)
    if(value){
       return <CurrencyFormat value={value} displayType={'text'} thousandSeparator={true} prefix={'Q'} />
    }else{
      return  <CurrencyFormat value={0.00} displayType={'text'} thousandSeparator={true} prefix={'Q'} />
    }
    
}