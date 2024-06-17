import { Icon, useTheme } from '@ui-kitten/components'
import React from 'react'
import { styles } from '../../theme/styles';

//interface props icon
interface Props {
    name: string;
    color?: string;
    isWhite?: boolean;
}


//componente reutilizable para iconos
export const MyIcon = ({ name, color, isWhite }: Props) => {

    //hook tema: reconocer el tema tomado por el aplicativo
    const theme = useTheme();
    //console.log(theme['color-primary-400']);
    //Validación de color
    if (isWhite) {
        color = theme['color-info-100'];
    } else if (!color) { // no se asigna el color
        color = theme['text-basic-color'];
    } else {
        color = theme[color];
    }


    return (
        <Icon
            style={styles.icon}
            fill={color}
            name={name}
        />
    )
}
