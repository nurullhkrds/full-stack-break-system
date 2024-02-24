import React, { useEffect } from "react";
import { useFormik } from "formik";
import { InputLabel } from "@mui/material";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Input, Space } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginAuth } from "../../service";

function Login() {
  const dispatch=useDispatch()
  const navigate=useNavigate();
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  


  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: async (values, bag) => {
      await dispatch(loginAuth({email:values.email,password:values.password}));
      navigate(0)

    
    },
  });

  return (
    <main style={{
     
      alignSelf:'center',
      marginTop:"50px",

      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"}}>
       <div
      style={{
        background:"white",
        width:"700px",
        height:"400px",
    
      }}
    >
      <section style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>

      <img src={process.env.PUBLIC_URL + '/ays.png'} alt="AYS" />
        <h3
          style={{ fontSize: "15px"}}
        >
          Devam etmek için lütfen giriş yapınız...
        </h3>
       
      </section>
     

      <section>

        <form
          style={{
            
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <InputLabel>
              <strong>Email</strong>
            </InputLabel>
            <Space
              style={{ width: "500px",  marginTop: "5px", marginBottom: "5px" }}
              direction="vertical"
            >
              <Input
                placeholder="Kullanıcı adı giriniz..."
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                style={{
                  borderColor:'#fb8500',
                  borderWidth:1.5,
                  borderRadius:10,
                }}
              />
                  {formik.errors.email && (
              <div
                style={{ color: "red", fontSize: "12px", textAlign: "center" }}
              >
                {formik.errors.email}
              </div>
            )}
            </Space>

            <InputLabel>
              <strong>Şifre</strong>
            </InputLabel>
            <Space
              style={{ width: "500px", marginTop: "5px", marginBottom: "5px" }}
              direction="vertical"
            >
              <Input.Password
                placeholder="Şifre giriniz..."
                name="password"
                
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone style={{
                    color:"#fb8500",
                  }}/> : <EyeInvisibleOutlined style={{
                    color:"#fb8500",
                    
                  }}/>
                }
                style={{
                  
                  borderColor: '#fb8500',
                  borderWidth:1.5,
                  borderRadius:10,
                }}
              />
                  {formik.errors.password && (
              <div
                style={{ color: "red", fontSize: "12px", textAlign: "center" }}
              >
                {formik.errors.password}
              </div>
            )}
            </Space>
          </div>
          <div style={{ marginTop: "25px", width: "500px" }}>
            <Button
              onClick={formik.handleSubmit}
              variant="contained"
              style={{
                color: "#fff",
                fontSize:15,
                fontWeight:'500',
                width:"100%",
                backgroundColor:'#fb8500',
                borderColor:'#fb8500',
                borderWidth:1,
                borderRadius:10,
              }}
            >
              Giriş Yap
            </Button>
          </div>
        </form>
      </section>
    </div>
    </main>
   
  );
}

export default Login;