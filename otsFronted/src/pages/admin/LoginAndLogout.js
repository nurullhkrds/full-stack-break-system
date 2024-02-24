import React, { useEffect, useMemo, useState } from 'react';
import { Button, Modal, Table, DatePicker } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getLoginAndLogout } from '../../service';

const { RangePicker } = DatePicker;
const columns = [
    {
      title: 'Giriş',
      dataIndex: 'loginTime',
      key: 'login',
      render: (text) => {
        const loginDate = new Date(text);
        return loginDate.toLocaleTimeString();
      },
    },
    {
        title: 'Çıkış',
        dataIndex: 'logoutTime',
        key: 'logout',
        render: (text) => {
          if (text === null) {
            return 'Henüz çıkış yapılmadı';
          }
    
          const logoutDate = new Date(text);
          return logoutDate.toLocaleTimeString();
        },
      },
    {
      title: 'Tarih',
      dataIndex: 'createdDate',
      key: 'createdDate',
      render: (text) => new Date(text).toLocaleDateString(),
    },
  ];
  

function LoginAndLogout({ userId }) {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const dispatch = useDispatch();
  const [dateRange, setDateRange] = useState([]);

  const loginandlogout = useSelector((state) => state.user.userSessionLoginAndLogout);

  useEffect(() => {
    getLoginAndLogoutList(userId);
  }, [dispatch]);

  const getLoginAndLogoutList = async (userId) => {
    await dispatch(getLoginAndLogout(userId));
  };

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const filteredData = useMemo(() => {
    if (!dateRange || !dateRange.length) {
      return loginandlogout || [];
    }

    const startDate = dateRange[0]?.startOf('day').valueOf();
    const endDate = dateRange[1]?.endOf('day').valueOf();

    return (loginandlogout || []).filter(
      (breakItem) =>
        startDate <= new Date(breakItem.createdDate).getTime() &&
        new Date(breakItem.createdDate).getTime() <= endDate
    );
  }, [dateRange, loginandlogout]);

  const totalBreakDuration = useMemo(() => {
    return filteredData.reduce((total, breakItem) => total + breakItem.durationMinutes, 0);
  }, [filteredData]);

  return (
    <div>
      <>
        <Button type="primary" onClick={showModal}>
          Tümünü Görüntüle
        </Button>
        <Modal
          title="Giriş-Çıkış"
          visible={open}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
            <div style={{display:"flex", flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
            <RangePicker onChange={(dates) => setDateRange(dates)}  style={{marginBottom:"10px"}}/>
          
          <Table  columns={columns} dataSource={filteredData} pagination={{pageSize:5}} />

            </div>
        
        </Modal>
      </>
    </div>
  );
}

export default LoginAndLogout;
