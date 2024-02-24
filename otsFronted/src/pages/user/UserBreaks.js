import React, { useEffect, useMemo, useState } from 'react'
import { Table, Tag, Card, DatePicker } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { getOneUserAsync } from '../../service';
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

function UserBreaks() {
  const dispatch = useDispatch()
  const authUser = useSelector((state) => state.user.authUser)
  const authUserStatus = useSelector((state) => state.user.authUserStatus)
  const [dateRange, setDateRange] = useState([]);

  useEffect(() => {

    getUser();

  }, [ dispatch]);

  const getUser = async () => {
    await dispatch(getOneUserAsync());
  };

  const filteredData = useMemo(() => {
    if (!dateRange || !dateRange.length) {
      return authUser?.breakList || [];
    }

    const startDate = dateRange[0]?.startOf("day").valueOf();
    const endDate = dateRange[1]?.endOf("day").valueOf();

    return (authUser?.breakList || []).filter(
      (breakItem) =>
        startDate <= new Date(breakItem.createdDate).getTime() &&
        new Date(breakItem.createdDate).getTime() <= endDate
    );
  }, [dateRange, authUser]);

  const totalBreakDuration = useMemo(() => {
    return filteredData.reduce((total, breakItem) => total + breakItem.durationMinutes, 0);
  }, [filteredData]);
  return (
    <div>
    <Card style={{fontSize:15}}
    >
      Toplam Mola Süresi: {totalBreakDuration} dk
    </Card>

    <RangePicker onChange={(dates) => setDateRange(dates)} />

    <Table
      style={{ marginLeft: 50, marginRight: 50, marginTop: 50 }}
      columns={columns}
      dataSource={filteredData}
    />
  </div>  
  )
}

export default UserBreaks