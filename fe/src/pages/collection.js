import React, { createRef, useState, useEffect } from "react";
import {
  Button,
  Card,
  Col,
  Row,
  Modal,
  Form,
  Input,
  Upload,
  message,
} from "antd";
import {
  UploadOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useHistory } from "react-router-dom";

import { base } from "./../index";

export default function Collection() {
  const [loading, setloading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [imgUrl, setimgUrl] = useState("");
  const [dataList, setDataList] = useState([]);
  const [form] = Form.useForm();
  const his = useHistory();

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  function beforeUpload(file) {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  }
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setloading(true);
      return;
    }
    if (info.file.status === "done") {
      console.log("info.file -> :", info.file);
      setloading(false);
      setimgUrl(info.file.response);
    }
  };

  const userid = localStorage.getItem("userid");
/*
  const getUser = () => {
    fetch(base + "/users/getUser?_id=" + userid)
      .then((res) => res.json())
      .then((res) => {
        console.log("res -> :", res);
        setDataList(res.data.products);
      });
  };
*/

/*
  useEffect(() => {
    if (!userid) {
      his.push("/login");
    } else {
      getUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [his, userid]);
*/
  // useEffect(() => {
  //     if (visible && form) {

  //         form.setFieldsValue({
  //             avatar: [{
  //                 // eslint-disable-next-line no-useless-concat
  //                 url: 'public\\images\\imgs\\2021-06-23\\1624449493551.png'
  //             }]
  //         })
  //         // eslint-disable-next-line no-useless-concat
  //         setimgUrl('public\\images\\imgs\\2021-06-23\\1624449493551.png')
  //     }

  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [visible, form])

  return (
    <div className="collection">
      <h1>NFT??????</h1>
      <div>
        ??????????????????????????????NFT??????????????????????????????????????????????????????????????????????????????????????????????????????NFT??????
      </div>
      <div className="btns">
        <Button
          type="primary"
          size="large"
          style={{
            background: "#000000",
          }}
          onClick={() => {
            setVisible(true);
          }}
        >
          ??????NFT
        </Button>
        &nbsp; &nbsp;
        &nbsp; &nbsp;
      </div>
      <br />
      <div>
        <Row gutter={[16, 20]}>
          {dataList.map((it, index) => (
            <Col span={6} key={index}>
              <Card
                className="card"
                hoverable
                cover={
                  <img
                    width="323px"
                    height="323px"
                    alt="example"
                    src={it.url}
                  />
                }
              >
                <Card.Meta title={it.name} description={it.desc} />
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      <Modal
        visible={visible}
        destroyOnClose
        maskClosable={false}
        title="????????????NFT"
        className="w-modal"
        onCancel={() => {
          setVisible(false);
        }}
        footer={
          <>
            <Button
              type="primary"
              onClick={() => {
                form
                  .validateFields()
                  .then((values) => {
                    console.log("values -> :", values);
                    values.url = values.avatar[0].response;
                    var data = {
                      ...values,
                      userid,
                    };
                    delete data.avatar
                    fetch(base + "/product/create", {
                      method: "POST",
                      body: JSON.stringify(data),
                      headers: {
                        "Content-Type": "application/json; charset=utf-8",
                      },
                    })
                      .then((res) => res.json())
                      .then((res) => {
                        console.log("res -> :", res);
                        if (res.code == 200) {
                          alert(res.msg);
                          //getUser();
                          setVisible(false);
                        } else {
                          alert(res.msg);
                        }
                      });
                  })
                  .catch((errorInfo) => {
                    console.log("errorInfo -> :", errorInfo);
                  });
              }}
            >
              ??????
            </Button>

          </>
        }
      >
        <Form name="validate_other" layout="vertical" form={form}>
          <Form.Item
            name="avatar"
            label="??????"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            extra=""
            rules={[{ required: true, message: "??????????????????" }]}
          >
            <Upload
              maxCount={1}
              accept="image/*,.pdf"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action={base + "/product/file"}
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {imgUrl ? (
                <img
                  src={base + "\\" + imgUrl}
                  alt="avatar"
                  style={{ width: "100%" }}
                />
              ) : (
                uploadButton
              )}
            </Upload>
          </Form.Item>

          <Form.Item
            label="??????"
            name="name"
            rules={[{ required: true, message: "?????????????????????" }]}
          >
            <Input
              className="border-wrap"
              placeholder="??????DOT"
            />
          </Form.Item>

          <Form.Item label="??????" name="desc">
            <Input.TextArea
              className="border-wrap"
              rows={4}
              maxLength="1000"
              showCount
              placeholder="??????????????????NFT"
            />
          </Form.Item>
        </Form>
      </Modal>


    </div>



  );
}
