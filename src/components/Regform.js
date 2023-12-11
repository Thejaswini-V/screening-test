import React,{useState,useEffect} from 'react'
import './Regstyle.css'
const Regform=()=>{

    const [postData,setdata]=useState([])
    const[mail,setmail]=useState('')
    const[name,setname]=useState('')
    const[password,setpassword]=useState('')
    const[dob,setdob]=useState('')
    const[desg,setdesg]=useState('')
    const[sal,setsal]=useState('')
    const[exp,setexp]=useState('')
    const[dept,setdept]=useState('')
    const[id,setid]=useState('')

    const ipchange=(event)=>{
        const{id,value}=event.target;
        if(id==="name"){
            setname(value);
        }
        if(id==="mail"){
            setmail(value);
        }
        if(id==="password"){
            setpassword(value);
        }
        if(id==="dob"){
            setdob(value);
        }
        if(id==="desg"){
            setdesg(value);
        }
        if(id==="sal"){
            setsal(value);
        }
        if(id==="dept"){
            setdept(value);
        }
        if(id==="id"){
            setid(value);
        }
        if(id==="exp"){
            setexp(value);
        }

    }
    const handleDobChange = (event) => {
        const newDob = event.target.value;
        setdob(newDob);
    
        if (newDob) {
          const birthDate = new Date(newDob);
          const currentDate = new Date();
          const userAge = Math.floor((currentDate - birthDate) / (365.25 * 24 * 60 * 60 * 1000));
          alert(`Your age is ${userAge} years! 🎉`);
        }
      };
    const fetchEmployeeList = async () => {
        try {
            const response = await fetch('http://localhost:3000/register');
            const newData = await response.json();

            if (newData !== null) {
                setdata((prevData) => [...prevData, ...newData]);
            }

        } catch (error) {
            console.error('Error fetching employee list:', error);
        }
    };
    const handleRegistration = async (event) => {
        event.preventDefault(); 

        try {
            
            const reqData = {
                name,
                mail,
                password,
                dob,
                desg,
                sal,
                exp,
                dept,
                id,
            };

            
            const response = await fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reqData),
            });

            const result = await response.json();

            if (response.ok) {
                console.log(result.message);
                alert('REGISTRATION COMPLETE');
                setdata((prevData) => [...prevData, reqData]);
                setname('');
                setmail('');
                setpassword('');
                setdob('');
                setdesg('');
                setsal('');
                setexp('');
                setdept('');
                setid('');
                setdata([]);
                fetchEmployeeList(); 

        
            } else {
                console.error(`Error: ${response.status} - ${response.statusText}`);
                const errorText = await response.text();
                console.error(`Response: ${errorText}`); 
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };
    useEffect(() => {
        fetchEmployeeList();
    }, []);
      
    return(
        <div className='container'>
            <form className='regform'>
                <div className='section'>
                    <label>Name</label>
                    <input type='text'id='name' value={name} onChange={ipchange}></input>
                </div>
                <div className='section'>
                    <label>E-Mail</label>
                    <input type='email' id='mail' value={mail} onChange={ipchange}></input>
                </div>
                <div className='section'>
                    <label>Password</label>
                    <input type='password' id='password' value={password} onChange={ipchange}></input>
                    
                </div>
                <div className='section'>
                    <label>D.O.B</label>
                    <input type='date' id='dob' value={dob} onChange={handleDobChange}></input>
                </div>
                <div className='section'>
                    <label>Employee id</label>
                    <input type='number' id='id' value={id} onChange={ipchange}></input>
                </div>
                <div className='section'>
                    <label>Salary</label>
                    <input type='number' id='sal' value={sal} onChange={ipchange}></input>
                </div>
                <div className='section'>
                    <label>Department</label>
                    <input type='text' id='dept' value={dept} onChange={ipchange} ></input>
                </div>
                <div className='section'>
                    <label>Designation</label>
                    <input type='text' id='desg' value={desg} onChange={ipchange}></input>
                </div>
                <div className='section'>
                    <label>Experience</label>
                    <input type='number' id='exp' value={exp} onChange={ipchange}></input>
                </div>
                <div className='section'>
                    <button onClick={handleRegistration}>Register</button>
                </div>
            </form>
            <h1>CURRENT EMPLOYEE DETAILS</h1>
            <div className='section'>
                
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>D.O.B</th>
                            <th>id</th>
                            <th>Salary</th>
                            <th>Department</th>
                            <th>Experience</th>
                            <th>Designation</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {postData.map((employee) => (
                            <tr key={employee.id}>
                                <td>{employee.name}</td>
                                <td>{employee.mail}</td>
                                <td>{employee.password}</td>
                                <td>{employee.dob}</td>
                                <td>{employee.id}</td>
                                <td>{employee.sal}</td>
                                <td>{employee.dept}</td>
                                <td>{employee.exp}</td>
                                <td>{employee.desg}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default Regform;
