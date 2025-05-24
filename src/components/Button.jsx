import '../styles/Button.css'

export default function Button({onClick, button_id, children, type, button_class}) {
    return(
        <>
            <button onClick={onClick} id={button_id} className={button_class} type={type}>{children}</button>
        </>
        
    )
}