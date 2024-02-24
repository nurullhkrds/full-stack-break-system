import React, { useEffect } from 'react'
import { Space, Table, Tag } from 'antd';
import { useSelector ,useDispatch} from 'react-redux';
import { getAllUsers } from '../../service';
import { Link } from 'react-router-dom';

const columns = [
    {
      title: 'Adı Soyadı',
      dataIndex: 'firstname',
      key: 'firstname',
      render: (text) => <a>{text}</a>,
    },

    {
      title: 'E mail ',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Mola Durumu',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'İşe Geliş Durumu',
      key: 'isWorkdayArrival',
      dataIndex: 'isWorkdayArrival',
      render: (isWorkdayArrival) => (
        <Tag color={isWorkdayArrival ? 'green' : 'volcano'}>
          {isWorkdayArrival ? 'Bugün İşe Geldi' : 'Bugün İşe Gelmedi'}
        </Tag>
      ),
    },
   ,
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/userdetails/${record.key}`}>
            Detay
          </Link>
        </Space>
      ),
    },
  ];
function Admin() {
    const dispatch = useDispatch()
    const userList=useSelector((state)=>state.user.userList)
    const userListStatus=useSelector((state)=>state.user.userListStatus)

    const isWorkdayArrival = (loginTime) => {
      const loginDate = new Date(loginTime);
      
      const startOfWorkday = new Date();
      startOfWorkday.setHours(8, 0, 0, 0); 
      
      const endOfWorkday = new Date();
      endOfWorkday.setHours(18, 0, 0, 0); 
      
      if (loginDate >= startOfWorkday && loginDate <= endOfWorkday) {
        return true;
      }
    
      
      return false;
    };



    useEffect(()=>{
        if (userListStatus==="idle") {
            getFuncUserList()
        }
    })
    const getFuncUserList=async()=>{
        await dispatch(getAllUsers())
    }
    const userListFilter= userList?.filter(user=>user.role==="USER")

    const mappedData = userListFilter?.map(user => ({
      key: user.id.toString(),
      firstname: `${user.firstname} ${user.lastname}`,
      address: user.email,
      tags: user.isBreak ? ['Molada'] : (isWorkdayArrival(user.loginTime) ? ['Çalışıyor'] : ['Çalışmıyor']),
      lastBreak: user.isBreak ? new Date(user.lastBreak).toLocaleTimeString() : '', 
      isWorkdayArrival: isWorkdayArrival(user.loginTime),
    }));

  return (
    <div>
        <Table columns={columns} dataSource={mappedData} />
    </div>
  )
}

export default Admin