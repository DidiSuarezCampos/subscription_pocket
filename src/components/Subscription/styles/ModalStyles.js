import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    modal: {
      marginTop: 400,
      marginLeft: '30%',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      borderRadius: 10,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      top: '50%',
      left: '50%',
      transform: 'traslate(-50%, -50%)'
    },
  
    icons:{
      cursor: 'pointer'
    },
  
    inputMaterial:{
      width: '100%'
    }
}));

export const stylesTable= makeStyles({
    tableMaterial:{
      minWidth:700
    }
});