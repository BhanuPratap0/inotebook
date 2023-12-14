import React, { useState } from 'react'

const Form = () => {
    const [uimage,setImage]= useState();
    const [credential, setCredential] = useState({image:""})
    const onChange = (e) => {
        console.log(e.target.files[0]);
        setImage(e.target.files[0]);
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }
    const onSubmit=(e)=>{
        e.preventDefault();
    }

    return (
        <div>
            <form>
            <div class="mb-3" style={{marginTop:"140px"}} >
                <label for="formFile" class="form-label">Default file input example</label>
                <input class="form-control" type="file" name="image" id="formFile" onChange={onChange} />
                <button type='submit' onClick={onSubmit} >Submit</button>
            </div>
            </form>
        </div>
    )
}

export default Form
