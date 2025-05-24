import Button from "./Button"
import Icon from '@mdi/react';
import { mdiMinusCircleOutline } from '@mdi/js';

export default function CustomSection({these_children, item_ref, removeSelf}) {
    return(
        <div className='customUnit'>
            {these_children}
            <Button
                children = {<Icon path={mdiMinusCircleOutline} size={1.25} />}
                onClick={() => removeSelf(item_ref)}
            />
        </div>
    )
}