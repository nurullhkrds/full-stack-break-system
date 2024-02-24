import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Table, Tag, Card, DatePicker,FloatButton  } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getLoginAndLogout, getUserById, startBreak } from "../../service";
import LoginAndLogout from "./LoginAndLogout";
import * as XLSX from 'xlsx';
import  '../../styles/UserDetails.css'
import handleDownloadExcel from "../../components/helpers/ToExcel";

const { RangePicker } = DatePicker;

const columns = [

  {
    title: "Mola Türü",
    dataIndex: "breakType",
    key: "breakType",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Tarih",
    dataIndex: "createdDate",
    key: "createdDate",
    render: (text) => new Date(text).toLocaleDateString(),
  },

  {
  title: "Mola Alış Saati",
  dataIndex: "startTime",
  key: "startTime",
  render: (text) => {
    if (text === null || !Array.isArray(text) || text.length !== 3) {
      return "";
    }

    const [hours, minutes, seconds] = text;

    // Saat, dakika ve saniye değerlerini kontrol et
    if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
      return ""; // Geçersiz veri, boş bir string döndür
    }

    const startTimeStamp = new Date(0, 0, 0, hours, minutes, seconds).getTime();
    return isNaN(startTimeStamp) ? "" : new Date(startTimeStamp).toLocaleTimeString();
  },
},

  {
    title: "Mola Bitiş Saati",
    dataIndex: "endTime",
    key: "endTime",
    render: (text) => {
      if (text === null) {
        return 'Mola Devam Ediyor';
      }
    
      if (!Array.isArray(text) || text.length !== 3) {
        return ""; // Geçersiz veri, boş bir string döndür
      }
    
      const [hours, minutes, seconds] = text;
    
      // Saat, dakika ve saniye değerlerini kontrol et
      if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
        return ""; // Geçersiz veri, boş bir string döndür
      }
    
      const endTimeStamp = new Date(0, 0, 0, hours, minutes, seconds).getTime();
      return isNaN(endTimeStamp) ? "" : new Date(endTimeStamp).toLocaleTimeString();
    },
  },
  
  {
    title: "Mola Süresi",
    key: "durationMinutes",
    dataIndex: "durationMinutes",
    render: (text) => (
      <>
        <Tag color={text > -1 && "geekblue"} key={text}>
          {text} dk
        </Tag>
      </>
    ),
  },
];

function UserDetail() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const userDetail = useSelector((state) => state.user.userDetail);
  const userDetailStatus = useSelector((state) => state.user.userDetailStatus);

  const [dateRange, setDateRange] = useState([]);

  useEffect(() => {
    
      getUser(userId);
    
  }, [userId, dispatch]);

  const getUser = async (userId) => {
    await dispatch(getUserById(userId));
  };


  //start getLastLoginandLogout

  const loginandlogout = useSelector((state) => state.user.userSessionLoginAndLogout);

  useEffect(() => {
    getLoginAndLogoutList(userId);

  }, [dispatch]);

  const getLoginAndLogoutList = async (userId) => {
    await dispatch(getLoginAndLogout(userId));
  };

  const lastItem = loginandlogout?.slice(-1)[0];
  const loginTime = lastItem ? new Date(lastItem.loginTime).toLocaleString() : null;
  const logoutTime = lastItem ? (lastItem.logoutTime ? new Date(lastItem.logoutTime).toLocaleString() : 'Henüz çıkış yapılmadı') : null;
  

  //finish getLastLoginandLogout


 

  const filteredData = useMemo(() => {
    if (!dateRange || !dateRange.length) {
      return userDetail?.breakList || [];
    }

    const startDate = dateRange[0]?.startOf("day").valueOf();
    const endDate = dateRange[1]?.endOf("day").valueOf();

    return (userDetail?.breakList || []).filter(
      (breakItem) =>
        startDate <= new Date(breakItem.createdDate).getTime() &&
        new Date(breakItem.createdDate).getTime() <= endDate 
    );
  }, [dateRange, userDetail]);

  const totalBreakDuration = useMemo(() => {
    return filteredData.reduce((total, breakItem) => total + breakItem.durationMinutes, 0);
  }, [filteredData]);


  const dataToExcelDownload=()=>{
    handleDownloadExcel(filteredData,userDetail)

  }

  return (
    <div>
      <section style={{display:"flex",justifyContent:"space-around",marginTop:"10px"}}>
      <Card style={{fontSize:15}} title={`${userDetail?.firstname} ${userDetail?.lastname}`} bordered={false}>
       
       Toplam Mola Süresi: {totalBreakDuration} dk

     </Card>
     <Card style={{fontSize:15}} bordered={false}>
      <Card style={{marginBottom:"10px"}}>
      <div>
    <p>
      <h3>Son Giriş:</h3>
      <span className="datetime">{loginTime}</span>
    </p>
    <p>
      <h3>Son Çıkış:</h3>
      <span className="datetime">{logoutTime}</span>
    </p>
  </div>
      </Card>
         <LoginAndLogout userId={userId}/>
         </Card>

      </section>
    

      <RangePicker onChange={(dates) => setDateRange(dates)} />

      <Table
        style={{ marginLeft: 50, marginRight: 50, marginTop: 50 }}
        columns={columns}
        dataSource={filteredData.slice().reverse()}
      />
      <FloatButton tooltip={<div>Excel'e Aktar</div>} onClick={dataToExcelDownload} />
      
    </div>
  );
}

export default UserDetail;
