// assets
import {
  AppstoreAddOutlined,
  AntDesignOutlined,
  BarcodeOutlined,
  BgColorsOutlined,
  FontSizeOutlined,
  LoadingOutlined
} from '@ant-design/icons';

// icons
const icons = {
  FontSizeOutlined,
  BgColorsOutlined,
  BarcodeOutlined,
  AntDesignOutlined,
  LoadingOutlined,
  AppstoreAddOutlined
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const services = {
  id: 'services',
  title: 'Services',
  type: 'group',
  children: [
    {
      id: 'history',
      title: 'History',
      type: 'item',
      url: '/history',
      icon: icons.FontSizeOutlined
    },
    {
      id: 'blacklist',
      title: 'Blacklist',
      type: 'item',
      url: '/blacklist',
      icon: icons.BgColorsOutlined
    },
    {
      id: 'profile',
      title: 'Profile',
      type: 'item',
      url: '/profile',
      icon: icons.AntDesignOutlined
    }
  ]
};

export default services;
