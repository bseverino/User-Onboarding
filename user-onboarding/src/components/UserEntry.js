import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';


const UserEntry = props => {
    return (
        <div className='user-list'>
            <Nav tabs>
            {props.userInfo.map(user => (
                <NavItem key={user.id} className='tab'>
                    <NavLink className={classnames({ active: props.activeTab === user.id })} onClick={() => { props.toggle(user.id); }}>
                        {user.name}
                    </NavLink>
                </NavItem>
            ))}
            </Nav>
            <TabContent activeTab={props.activeTab}>
            {props.userInfo.map(user => (                
                <TabPane key={user.id} tabId={user.id}>
                    <Row>
                        <Col sm="12">
                            <Card body>
                                <CardTitle>{user.name}</CardTitle>
                                <ul>
                                    <li>Email: {user.email}</li>
                                    <li>Role: {user.role}</li>
                                </ul>
                            </Card>
                        </Col>
                    </Row>
                </TabPane>        
            ))}
            </TabContent>
        </div>
    )
};

export default UserEntry;