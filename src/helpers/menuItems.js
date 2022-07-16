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

function setMenuItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

export const userMenuItems = [
    setMenuItem(<Link to="/">Home</Link>, '1', <PieChartOutlined />),
    setMenuItem(<Link to="/login">Login</Link>, '2', <AiOutlineUserSwitch />),
    setMenuItem(<Link to="/register">Register</Link>, '3', <AiOutlineUserAdd />),
    setMenuItem(<Link to="/rents">Rents</Link>, '4', <MdOutlinePayment />),
    setMenuItem(<Link to="/logout">Logout</Link>, '5', <DesktopOutlined />),
];

export const agencyMenuItems = [
    setMenuItem(<Link to="/">Home</Link>, '1', <PieChartOutlined />),
    setMenuItem(<Link to="/login">Login</Link>, '2', <AiOutlineUserSwitch />),
    setMenuItem(<Link to="/register">Register</Link>, '3', <AiOutlineUserAdd />),
    setMenuItem(<Link to="/agency-rents">Rents</Link>, '4', <MdOutlinePayment />),
    setMenuItem(<Link to="/agency-sales">Sales</Link>, '5', <MdOutlineSell />),
    setMenuItem(<Link to="/reports">Reports</Link>, '6', <HiOutlineDocumentReport />),
    setMenuItem(<Link to="/publish-estate">Publish Estate</Link>, '7', <MdCreate />),
    setMenuItem(<Link to="/logout">Logout</Link>, '8', <BiLogOut />),
];

