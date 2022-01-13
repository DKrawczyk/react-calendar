function CalendarInputs(props) {
    const {fields, errors, thisEvent} = props;
    return (
        fields.map(el => {
            return (
                <div key={el.name} className={`input__container input__container--${el.type}`}>
                    <input type={el.type} name={el.name} value={el.value} placeholder={el.placeholder} className={el.className} id={el.id}></input>
                    <div className={`error__container error__container--${el.type}`}>
                        <span className="errors__list">
                            {errors[el.name] && errors[el.name].length > 0 ? errors[el.name].map(i => <li>{i}</li>) : ''}
                        </span>
                    </div> 
                </div>
            )
        })
    )
}

export default CalendarInputs;