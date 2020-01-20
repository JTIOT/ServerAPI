import React,{useState, useEffect} from 'react';
import axios from 'axios';
import ip from 'ip';
import classes from './resetPassword.module.scss';

const ResetPassword = ({match})=>{

    const {userId, token} = match.params;
    const [resetSuccess, setResetSuccess] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passErrorMsg, setPassErrorMsg] = useState('');
    const [serverErrorMsg, setServerErrorMsg] = useState('');

    useEffect(()=>{
        if(!newPassword && !confirmPassword){
            setPassErrorMsg('Please, enter your new password');
            return; 
        }
        
        if(newPassword !== confirmPassword ||
            !newPassword || !confirmPassword ){
            setPassErrorMsg('Password is not matched');
        }
        else{
            setPassErrorMsg('');
        }
    },
    [newPassword, confirmPassword]);

    const onFormSubmit = (e)=>{
        e.preventDefault();

        if(!passErrorMsg){
            
            axios.post(
            `http://${ip.address()}:3100/user/resetPassword`,
            {
                userId: userId,
                newPassword: newPassword,
                token: token
            })
            .then(res=>{
                if(res && res.data){
                    setResetSuccess(true);
                }
            })
            .catch(async err=>{
                console.log(err);
                if(err.response){
                    const resData = await err.response.data;
                    setServerErrorMsg(resData.message);
                }
            })
        }
    }

    return (
        <div className={classes.overlay}>
            <div className={classes.title}>
                Reset password
            </div>
            {
                serverErrorMsg?
                <div className={classes.errorMessage}>
                    {serverErrorMsg}
                </div>
                :
                null
            }
            {   
                passErrorMsg?
                <div className={classes.errorMessage}>
                    {passErrorMsg}
                </div>
                :
                null
            }
            {
                
                resetSuccess?
                <div className={classes.resetSuccess}>
                    Reset password success!!!
                </div>
                :
                <form className={classes.content} onSubmit={onFormSubmit}>
                    <div className={classes.inputGroup}>
                        <label>NewPassword</label>
                        <input className={classes.passwordField}
                            type='password'
                            onChange={(e)=>setNewPassword(e.target.value)}
                            required />
                    </div>
                    <div className={classes.inputGroup}>
                        <label>Confirm password</label>
                        <input className={classes.confirmPasswordField}
                            type='password' 
                            onChangeCapture={(e)=>setConfirmPassword(e.target.value)}
                            required />
                    </div>
                    {
                        passErrorMsg?
                        null
                        :
                        <div className={classes.submitBtn}>
                            <button type='submit'>Submit</button>
                        </div>
                    }
                </form>
            }
        </div>
    );
}

export default ResetPassword;