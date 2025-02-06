import  Box  from '@mui/material/Box';
import { BoxProps } from "@mui/material";
import { Icon, IconProps } from '@iconify/react';

interface IconifyProps extends BoxProps {
  icon: IconProps['icon'];
}

const IconifyIcon = ({ icon, ...rest }: IconifyProps) => {
  return <Box  sx={{color:'primary.info'}} {...rest} >
    <Icon icon={icon} />
  </Box>;
};

export default IconifyIcon;
