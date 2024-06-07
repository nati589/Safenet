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

const utilities = {
  id: 'utilities',
  title: 'Services',
  type: 'group',
  children: [
    {
      id: 'util-typography',
      title: 'History',
      type: 'item',
      url: '/history',
      icon: icons.FontSizeOutlined
    },
    {
      id: 'util-color',
      title: 'Blacklist',
      type: 'item',
      url: '/blacklist',
      icon: icons.BgColorsOutlined
    },
    {
      id: 'util-shadow',
      title: 'Profile',
      type: 'item',
      url: '/profile',
      icon: icons.AntDesignOutlined
    }
    // {
    //   id: 'util-shadow',
    //   title: 'Shadow',
    //   type: 'item',
    //   url: '/shadow',
    //   icon: icons.BarcodeOutlined
    // }
  ]
};

export default utilities;
