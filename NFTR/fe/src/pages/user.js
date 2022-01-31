import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Row, Avatar } from 'antd'
import { EditOutlined, LogoutOutlined } from '@ant-design/icons'
import { Link, useHistory } from 'react-router-dom';
import { base } from './../index'

export default function User () {
    const his = useHistory()
    const avatar = localStorage.getItem('avatar')
    const username = localStorage.getItem('username')
    const userid = localStorage.getItem('userid')


    const [user, setUser] = useState({
        products: [],
        buyproducts: [],
    })


    useEffect(() => {
        if (!userid) {
            his.push('/login')
        }
    }, [his, userid])

    useEffect(() => {
        const getData = () => {
            fetch(base + '/users/getUser?_id=' + userid)
                .then((params) => params.json())
                .then((params) => {
                    console.log('params -> :', params)
                    setUser(params.data)
                })
        }
        userid && getData()
    }, [userid])



    return (
        <div className="user">
            <div className="top">
                <p>
                    <EditOutlined onClick={() => {
                        his.push('/profile/' + userid)
                    }} />
                    &nbsp; &nbsp;
                    <LogoutOutlined onClick={() => {
                        localStorage.clear()
                        his.push('/login')
                    }} />
                </p>
            </div>
            <div className="user-info">
                <p>
                    {userid &&
                        <Avatar size={120} src={base + '\\' + avatar} />
                    }
                </p>
                <br />
                <h1>{username}</h1>
            </div>
            <br />
            <p>我发布的NFT</p>
            <div>
                <Row gutter={[16, 20]}>
                    {
                        user.products.map((it, index) => (
                            <Col span={6} key={index}>
                                <Card
                                    className="card"
                                    hoverable
                                    cover={<img width='323px' height="323px" alt="example" src={base + '\\' + it.url} />}
                                >
                                    <Card.Meta
                                        title={it.name}
                                        description={it.desc}
                                    />
                                </Card>
                            </Col>
                        ))
                    }

                </Row>
            </div>
            <br />
            <p>我购买的NFT</p>
            <div>
                <Row gutter={[16, 20]}>
                    {
                        user.buyproducts.map((it, index) => (
                            <Col span={6} key={index}>
                                <Card
                                    className="card"
                                    hoverable
                                    cover={<img width='323px' height="323px" alt="example" src={base + '\\' + it.url} />}
                                >
                                    <Card.Meta
                                        title={it.name}
                                        description={it.desc}
                                    />
                                </Card>
                            </Col>
                        ))
                    }

                </Row>
            </div>
            <br />
            <br />
            <br />
            <br />

        </div>
    )
}
