import { Theme } from '@mui/material';
import { Components } from '@mui/material/styles/components';

const ListItemButton: Components<Omit<Theme, 'components'>>['MuiListItemButton'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      color: 'white',
      marginBottom: theme.spacing(1),
      padding: theme.spacing(0.875, 1.25),
      borderRadius: theme.shape.borderRadius * 1.25,
      '&:hover': { backgroundColor:'#d96f32', color:"#fff" },
    }),
  },
};

export default ListItemButton;