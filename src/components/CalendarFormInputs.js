// import CalendarFormValidate from "./CalendarFormValidate";


function CalendarFormInputs(props) {
    const {firstName, lastName, email, date, time} = props;
    // const validation = new CalendarFormValidate();
    // const errors = {
        
    // }

    const inputs = [
        {type:"text", name:"firstName", value:firstName, placeholder:"First name", className:"input__field", id:"clicked"},
        {type:"text", name:"lastName", value:lastName, placeholder:"Last Name", className:"input__field", id:"clicked"},
        {type:"text", name:"email", value:email, placeholder:"Email", className:"input__field", id:"clicked"},
        {type:"date", name:"date", value:date, placeholder:"Date", className:"input__field", id:"clicked"},
        {type:"time", name:"time", value:time, placeholder:"Time", className:"input__field", id:"clicked"},
        {type:"submit", className:"input__field"},
    ]

    return (
        inputs.map(el => {
            if(el.type === 'text') {
                return (
                    <div className="input__container--text">
                        <input type={el.type} name={el.name} value={el.value} placeholder={el.placeholder} className={el.className} id={el.id}></input>
                    </div>
                )
            }
            else if(el.type==='date'){
                return (
                    <div className="input__container--date">
                        <input type={el.type} name={el.name} value={el.value} placeholder={el.placeholder} className={el.className} id={el.id}></input>
                    </div>
                )
            }
            else if(el.type === 'time'){
                return (
                    <div className="input__container--time">
                        <input type={el.type} name={el.name} value={el.value} placeholder={el.placeholder} className={el.className} id={el.id}></input>
                    </div>
                )
            }
            else{
                return <input type={el.type} className={el.className}></input>
            }
        })
    )
}

export default CalendarFormInputs;