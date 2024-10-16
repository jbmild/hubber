

import {useState} from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {Box, Button, Checkbox, Paper, Typography} from '@mui/material';


function not(a, b) {
  return a.filter((value) => !b.includes(value));
}

function intersection(a, b) {
  return a.filter((value) => b.includes(value));
}

export default function TransferListIntereses({general, usuario, height, funcion, titulo}){
    
    const izquierda =  not(general, usuario)
        
    const [checked, setChecked] = useState([]);
    const [left, setLeft] = useState(izquierda);
    const [right, setRight] = useState(usuario);

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
        newChecked.push(value);
        } else {
        newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const handleAllRight = () => {
        funcion(right.concat(left));
        setRight(right.concat(left));
        setLeft([]);
    };

    const handleCheckedRight = () => {
        funcion(right.concat(leftChecked));
        setRight(right.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
        funcion(not(right, rightChecked));
        setLeft(left.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
    };

    const handleAllLeft = () => {
        setLeft(left.concat(right));
        setRight([]);
        funcion([]);
    };

    const customList = (items) => (
        <Paper sx={{ width: {xs: '20vw', sm: '25vw', md: '30vw'}, 
        height: height, 
        overflow: 'auto',
        '&::-webkit-scrollbar': {
              width: '0.5em',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              borderRadius: '0.25em',
            },
            '&::-webkit-scrollbar-track': {
              background: 'rgba(0, 0, 0, 0.1)',
            } }}>
        <List dense disablePadding component="div" role="list">
            {items.map((value) => {
            const labelId = `transfer-list-item-${value}-label`;

            return (
                <ListItemButton dense={true} sx={{paddingY:"0em"}}
                key={value}
                role="listitem"
                onClick={handleToggle(value)}
                >
                <ListItemIcon>
                    <Checkbox
                    checked={checked.includes(value)}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{
                        'aria-labelledby': labelId,
                    }}
                    />
                </ListItemIcon>
                <ListItemText id={labelId} primary={value} />
                </ListItemButton>
            );
            })}
        </List>
        </Paper>
    );

    return (
        <Box padding={'0.5em'}>
            <Typography variant='subtitle1' align='center' color={'#161D6F'}>{titulo}</Typography>
            <Grid
            container
            spacing={2}
            sx={{ justifyContent: 'center', alignItems: 'center' }}
            >
            <Grid item>
                <Typography sx={{margin:"1em"}} variant={"caption"}>Opciones</Typography>
                {customList(left)}</Grid>
            <Grid item>
                <Grid container direction="column" sx={{ alignItems: 'center', marginTop:'1em' }}>
                <Button
                    sx={{ my: 0.3 }}
                    variant="outlined"
                    size="small"
                    onClick={handleAllRight}
                    disabled={left.length === 0}
                    aria-label="move all right"
                >
                    ≫
                </Button>
                <Button
                    sx={{ my: 0.3 }}
                    variant="outlined"
                    size="small"
                    onClick={handleCheckedRight}
                    disabled={leftChecked.length === 0}
                    aria-label="move selected right"
                >
                    &gt;
                </Button>
                <Button
                    sx={{ my: 0.3 }}
                    variant="outlined"
                    size="small"
                    onClick={handleCheckedLeft}
                    disabled={rightChecked.length === 0}
                    aria-label="move selected left"
                >
                    &lt;
                </Button>
                <Button
                    sx={{ my: 0.3 }}
                    variant="outlined"
                    size="small"
                    onClick={handleAllLeft}
                    disabled={right.length === 0}
                    aria-label="move all left"
                >
                    ≪
                </Button>
                </Grid>
            </Grid>
            <Grid item>
                <Typography sx={{margin:"1em"}} variant={"caption"}>Mi selección</Typography>
                {customList(right)}
            </Grid>
            </Grid>     
        </Box>
    );
}