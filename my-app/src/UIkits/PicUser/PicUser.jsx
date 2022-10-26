import "./PicUser.css";
import { useContext } from 'react';
import { userContext } from '../../Context/userContext';

export const PicUser = () => {
    const { infoUser } = useContext(userContext);

	let name = `${infoUser.Name} ${infoUser.Surname}`;	
    let imgSrc = "";

    const getInitials = () => {
        let initials;
        const nameSplit = name.split(" ");
        const nameLength = nameSplit.length;
        if (nameLength > 1) {
            initials =
                nameSplit[0].substring(0, 1) +
                nameSplit[nameLength - 1].substring(0, 1);
        } else if (nameLength === 1) {
            initials = nameSplit[0].substring(0, 1);
        } else return;
    
        return initials.toUpperCase();
    };

    const createImageFromInitials = (size, name, color) => {
        if (name == null) return;
        name=getInitials(name)
    
        const canvas=document.createElement('canvas')
        const context=canvas.getContext('2d')
        canvas.width=canvas.height=size
    
        context.fillStyle="white"
        context.fillRect(0,0,size,size)
    
        context.fillStyle=`${color}50`
        context.fillRect(0,0,size,size)
    
        context.fillStyle=color;
        context.textBaseline='middle'
        context.textAlign='center'
        context.font =`${size/2}px Roboto`
        context.fillText(name,(size/2),(size/2))
    
        return canvas.toDataURL()
    };

	return (
		<div className="div-picuser">
			<img
                className="pic-user"
				id='preview'
				src={
					imgSrc.length <= 0
						? createImageFromInitials(500, name, "#4BAB67")
						: imgSrc
				}
				alt='profile-pic'
			/>
		</div>
	);
}