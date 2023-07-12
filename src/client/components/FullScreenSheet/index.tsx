import React, { useState } from "react";
import "./style.scss";
import {ReactComponent as ChevronLeft} from '../../assets/chevron-left.svg';
import {ReactComponent as ChevronRight} from '../../assets/chevron-right.svg';
import {ReactComponent as ChevronsRight} from '../../assets/chevrons-right.svg';
import {ReactComponent as Save} from '../../assets/save.svg';
import {ReactComponent as Repeat} from '../../assets/repeat.svg';
import {ReactComponent as Share} from '../../assets/share-2.svg';
import {ReactComponent as Grid} from '../../assets/grid.svg';
import {ReactComponent as FilePlus} from '../../assets/file-plus.svg';

import { Drawer as MuiDrawer, List, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';


type Props = {
  next: any,
  previous: any,
  getPostSheet: any,
  savePostSheet: any,
  listSheet: Array<{ name: string, index: number }>,
  children: React.ReactNode;
};

const drawerWidth = 240;

const openedDrawer = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedDrawer = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    '& .MuiTypography-root': {
      color: '#ffffff'
    },
    ...(open && {
      ...openedDrawer(theme),
      '& .MuiDrawer-paper': openedDrawer(theme),
    }),
    ...(!open && {
      ...closedDrawer(theme),
      '& .MuiDrawer-paper': closedDrawer(theme),
    }),
  }),
);


export const Desktop = ({children, next, previous, getPostSheet, savePostSheet, listSheet}: Props) => {
  const [onEditorMode, setOnEditorMode] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="desktop">
      <Drawer
        variant="permanent"
        anchor="left"
        open={isOpen}
        onClose={toggleDrawer}
      >
        <div className="actions">
          <List>
            <ListItem button onClick={toggleDrawer}>
              <ListItemIcon>

                <ChevronsRight className="icon" width="28px" height="30px"/> 

              </ListItemIcon>
              <ListItemText primary="Cerrar" />
            </ListItem>
            { !isOpen && (
              <>
                <ListItem button>
                  <ListItemIcon>

                    <Share className="icon" width="24px"  height="24px"/>

                  </ListItemIcon>
                  <ListItemText primary="Compartir" />
                </ListItem>
                <ListItem button onClick={ () => { savePostSheet() } }>
                  <ListItemIcon>

                    <Save className="icon" width="24px" height="24px"/>

                  </ListItemIcon>
                  <ListItemText primary="Guardar" />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>

                    <Repeat className="icon" width="24px" height="24px"/>

                  </ListItemIcon>
                  <ListItemText primary="Dar la vuelta" />
                </ListItem>
              </>
            )}
            <ListItem button onClick={ () => { getPostSheet(); setOnEditorMode(true);} }>
              <ListItemIcon>

                <FilePlus className="icon" width="24px" height="24px"/>

              </ListItemIcon>
              <ListItemText primary="Crear nuevo" />
            </ListItem>
          </List>
        </div>
        { isOpen &&
          <div className="explorer">
            <List>
              {
                listSheet.map((value, index) => (
                  <ListItem key={index} button>
                    <ListItemText primary={value.name} />
                  </ListItem>
                ))
              }
            </List>
          </div>
        }
      </Drawer>
      <div className="left-wrapper">
        { !onEditorMode &&
        <div onClick={ previous }>
          <ChevronLeft className="vector"/>
        </div> }
      </div>

      <div className="center">
        {children}
      </div>
      
      <div className="right-wrapper">
        { !onEditorMode &&
        <div onClick={ next }>
          <ChevronRight className="vector"/>
        </div> }
      </div>
    </div>
  );
};

export default Desktop;
