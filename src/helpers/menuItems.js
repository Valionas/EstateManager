import { Route, Routes, BrowserRouter, Link } from 'react-router-dom';
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';

import { GrUserAdd, GrUserAdmin } from 'react-icons/gr';
import { AiOutlineUserAdd, AiOutlineUserSwitch } from 'react-icons/ai';
import { MdOutlinePayment, MdOutlineSell, MdCreate } from 'react-icons/md'
import { HiOutlineDocumentReport } from 'react-icons/hi';
import { BiLogOut } from 'react-icons/bi';
import { GiMoneyStack, GiModernCity } from 'react-icons/gi';

function setMenuItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

export const publicMenuItems = [
    setMenuItem(<Link to="/">Home</Link>, '1', <PieChartOutlined />),
    setMenuItem(<Link to="/login">Login</Link>, '2', <AiOutlineUserSwitch />),
    setMenuItem(<Link to="/register">Register</Link>, '3', <AiOutlineUserAdd />),
    setMenuItem(<Link to="/rents">Rents</Link>, '4', <MdOutlinePayment />),
    setMenuItem(<Link to="/estates">Estates for sale</Link>, '5', <GiModernCity />),

];

export const authenticatedMenuItems = [
    setMenuItem(<Link to="/">Home</Link>, '1', <PieChartOutlined />),
    setMenuItem(<Link to="/rents">Rents</Link>, '2', <MdOutlinePayment />),
    setMenuItem(<Link to="/rent-requests">Rent Requests</Link>, '3', <GiMoneyStack />),
    setMenuItem(<Link to="/estates">Estates for sale</Link>, '4', <GiModernCity />),
    setMenuItem(<Link to="/sales">Estate Sales</Link>, '5', <MdOutlineSell />),
    setMenuItem(<Link to="/reports">Reports</Link>, '6', <HiOutlineDocumentReport />),
    setMenuItem(<Link to="/logout">Logout</Link>, '7', <BiLogOut />),
];

