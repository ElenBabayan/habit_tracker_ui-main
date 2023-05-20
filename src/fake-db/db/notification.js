import Mock from '../mock'
import shortId from 'shortid'
import {habits} from "../../app/components/mock/mock";

const NotificationDB = {
    list: [
        {
            id: shortId.generate(),
            heading: 'Message',
            status: 'WARNING',
            icon: {
                name: 'warning',
                color: 'warning',
            },
            timestamp: 1570702802573,
            title: 'New message from Devid',
            subtitle: 'Hello, Any progress...',
            path: 'chat',
        },
        {
            id: shortId.generate(),
            heading: 'Alert',
            status: 'LATE',
            icon: {
                name: 'notifications',
                color: 'error',
            },
            timestamp: 1570702702573,
            title: 'Server overloaded',
            subtitle: 'Traffice reached 2M',
            path: 'page-layouts/user-profile',
        },
        {
            id: shortId.generate(),
            heading: 'Message',
            status: 'SUCCESS',
            icon: {
                name: 'done',
                color: 'success',
            },
            timestamp: 1570502502573,
            title: 'New message from Goustove',
            subtitle: 'Hello, send me details',
            path: 'chat',
        },
    ],
}

Mock.onGet('/api/notification').reply((config) => {
    const response = NotificationDB.list
    return [200, response]
})

Mock.onPost('/api/notification/add').reply((config) => {
    const response = NotificationDB.list
    return [200, response]
})

Mock.onPost('/api/notification/delete').reply((config) => {
    let {id} = JSON.parse(config.data)
    console.log(config.data)

    const response = NotificationDB.list.filter(
        (notification) => notification.id !== id
    )
    NotificationDB.list = [...response]
    return [200, response]
})

Mock.onPost('/api/notification/delete-all').reply((config) => {
    NotificationDB.list = []
    const response = NotificationDB.list
    return [200, response]
})

const usersUri = "/progress";
const url = new RegExp(`${usersUri}/*`);
Mock.onPost(url).reply((config) => {
    const id = config.url.substring(config.url.lastIndexOf('/') + 1);
    const response = {
        "id": parseInt(id),
        "name": "qwe",
        "description": "qwe",
        "wikipediaLink": null,
        "progress": [{
            id: 1,
            user_id: 2,
            habit_id: 1,
            updateDate: Date.now(),
            done: 1
        }],
        "user": {
            "id": 2,
            "name": "gagik-1995@yandex.ru",
            "email": "gagik-1995@yandex.ru",
            "password": "$2a$10$7IE99nAO5lanGxNULBCveujV1DfR4sLPiJRCvfhBG/ewvLHVNABiW",
            "dateOfBirth": "2003-05-13T23:04:33.453615",
            "role": "USER",
            "followers": [],
            "followings": []
        }
    }

    return [200, response];
});

Mock.onPost('/report/week').reply(config => {
    const response = {
        this: Array.from({length: 7}, () => Math.floor(Math.random() * 25)),
        last: Array.from({length: 7}, () => Math.floor(Math.random() * 25))
    }

    return [200, response];
})

Mock.onGet('/habits/report').reply((config) => {
    const response = [
        {
            "name": "Play football",
            "description": "Some desc",
            "current": 2,
            "longest": 5
        },
        {
            "name": "Read Book",
            "description": "Some random description",
            "current": 5,
            "longest": 4
        },
        {
            "name": "Play Guitar",
            "description": "Some random description",
            "current": 3,
            "longest": 2
        },
        {
            "name": "Shopping",
            "description": "Some random description",
            "current": 9,
            "longest": 8
        },
        {
            "name": "Play a game",
            "description": "Some random description",
            "current": 3,
            "longest": 7
        },
        {
            "name": "Sophia",
            "description": "Some random description",
            "current": 8,
            "longest": 5
        },
        {
            "name": "David",
            "description": "Some random description",
            "current": 6,
            "longest": 2
        },
        {
            "name": "Daniel",
            "description": "Some random description",
            "current": 0,
            "longest": 2
        },
        {
            "name": "Olivia",
            "description": "Some random description",
            "current": 8,
            "longest": 7
        },
        {
            "name": "Emma",
            "description": "Some random description",
            "current": 8,
            "longest": 2
        },
        {
            "name": "Daniel",
            "description": "Some random description",
            "current": 6,
            "longest": 8
        }
    ];

    return [200, response];
})

Mock.onGet('/report/yearly').reply((config) => {
    const response = [
        ['Jan', 22, 120, 95],
        ['Feb', 80, 50, 150],
        ['Mar', 70, 130, 80],
        ['Apr', 150, 125, 95],
        ['May', 245, 45, 90],
        ['June', 170, 120, 150],
        ['Jul', 170, 250, 150],
        ['Aug', 51, 125, 20],
        ['Sep', 23, 120, 80],
        ['Nov', 11, 38, 99],
        ['Dec', 10, 100, 70],
    ]

    return [200, response];
})