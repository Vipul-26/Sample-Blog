import React from 'react';
import moment from 'moment';

const Notifications = (props) => {

    const { notifications } = props;

    return (
        <div className="section">
            <div className="card z-depth-0">
                <div className="card-content">
                    <span className="card-title">
                        Notifications
                    </span>
                    <ul className="online-users">
                        {notifications && notifications.map(item => {
                            return <li key={item.id}>
                                <span className="pink-text">
                                    {`${item.authorFirstName} ${item.authorLastName}  `}
                                </span>
                                <span>
                                    {item.notificationContent}
                                </span>
                                <div className="note-date grey-text">
                                    {moment(item.createdAt.toDate()).fromNow()}
                                </div>
                            </li>
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Notifications;