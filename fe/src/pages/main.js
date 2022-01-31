import React from 'react'
import { Row, Col, Button, Card, Avatar } from 'antd'

export default function main () {
    return (
        <div className="main">
            <Row gutter={10}>
                <Col span={12} className="left">
                    <h1>Not For TheRich</h1>
                    <div className="info">Enjoy NFT without thinking too much </div>
                    <div className="btns">
                        <Button
                            href='/assets'
                            type="primary" size='large' style={{
                                background: '#000000',
                            }} >
                            Transfer
                        </Button>
                        &nbsp; &nbsp;
                        &nbsp; &nbsp;
                        
                        <Button
                            href='/createitem'
                            size='large' style={{
                                borderColor: '#000000',
                                color: '#000000'
                            }}  >
                            Create
                        </Button>
                    </div>
                </Col>
                <Col span={12} className="right">
                    <Card
                        className="right-card"
                        hoverable
                        cover={<img width='550px' height="550px" alt="example" src="https://p7.itc.cn/q_70/images03/20210504/d1710d8ae40348308bef7cbca3630cc8.jpeg" />}
                    >

                        <Card.Meta
                            title="牡丹亭Rêve 之标目蝶恋花——信息科技穿透了“我”"
                            description="https://www.cguardian.com/"
                            avatar={<Avatar src="https://img-blog.csdnimg.cn/2021071710554115.jpg" />}
                        />
                    </Card>
                </Col>
            </Row>

        </div>
    )
}
