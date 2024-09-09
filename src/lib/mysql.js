import { PUBLIC_HOST, PUBLIC_PORT, PUBLIC_USER, PUBLIC_PASSWORD, PUBLIC_DATABASE } from '$env/static/public';

import mysql from 'mysql2/promise';

export const mysql_connection = await mysql.createConnection({ 
    host: PUBLIC_HOST,
    port: PUBLIC_PORT,
    user: PUBLIC_USER,
    password: PUBLIC_PASSWORD,
    database: PUBLIC_DATABASE
});