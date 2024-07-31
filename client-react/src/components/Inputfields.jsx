function Inputfields(props){
const name = props.name;
const type = props.name;
const label = props.label;
const value = props.value;
const onChange = props.onChange;

return (
    <div>
        <label>{label}</label>
        <input name={name} type={type} value= {value} onChange= {onChange}></input>
    </div>
);
}

export default Inputfields;