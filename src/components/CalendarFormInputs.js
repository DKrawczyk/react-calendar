// import CalendarFormValidate from "./CalendarFormValidate";


function CalendarFormInputs(props) {
    const {fields, errors, thisEvent} = props;
    console.log(thisEvent);
    return (
        fields.map(el => {
            return (
                <div className={`input__container--${el.type}`}>
                    <input type={el.type} name={el.name} value={el.value} placeholder={el.placeholder} className={el.className} id={el.id}></input>
                    <span>
                        {errors[el.name] && errors[el.name].length > 0 ? errors[el.name].map(i => <li>{i}</li>) : 'ok'}
                    </span>
                </div>

            )
        })
    )
}

export default CalendarFormInputs;