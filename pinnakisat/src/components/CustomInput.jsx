/* eslint-disable react/prop-types */
const CustomInput = ({ ...props }) => {

  // check if props.value exists before calling trim() on it
  // if props.value is undefined then isEmpty defaults to true
  const isEmpty = props.value ? props.value.trim() === '' : true;

  const styles = {
    invalid: {
      border: '1px solid red'
    },
    invalidTooltip: {
      color: 'red',
      fontSize: '12px',
    },
    label: {
      display: 'block', // Make the label a block-level element
    }
  };

  return (
    <>
      <div className="input_wrapp">
        <div style={styles.label}>
          <label>{props.inputTitle}</label>
        </div>
        <input
          type={props.type}
          placeholder={props.placeholder}
          value={isEmpty ? '' : props.value}
          onChange={props.onChange}
          name={props.name}
          style={isEmpty && props.isRequired ? styles.invalid : {}}
        />
        {isEmpty && props.isRequired && (
          <div style={styles.invalidTooltip}>Syötä {props.inputTitle.toLowerCase()}.</div>
        )}
      </div>
    </>
  )
}

export default CustomInput;