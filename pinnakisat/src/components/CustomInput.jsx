/* eslint-disable react/prop-types */
const CustomInput = ({ ...props }) => {
    return (
    <>
    <div className="input_wrapp">
       {props.inputTitle} <input
            type={props.type}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
            name={props.name}
        />
    </div>
</>
    )
}

export default CustomInput