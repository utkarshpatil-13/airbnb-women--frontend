import { Navigate, Link, useParams, useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import { useContext, useState} from "react";

export default function AccountPage(){  

    const {user, ready, setUser} = useContext(UserContext);

    const navigate = useNavigate();

    let {subpage} = useParams();
    if(subpage === undefined){
        subpage = 'profile'
    }

    async function logout(){
        const token = localStorage.getItem('token');
        await fetch('http://localhost:7000/api/user/logout', {
            method: "POST",
            headers: {
                'Content-Type':'application/json',
                'Authorization' : `Bearer ${token}`
            }
        }).then((res) => {
            alert(user.name+" logged out successfully!");
            console.log(user.name+" logged out successfully!");
            localStorage.removeItem('token');
            setUser(null); 
            navigate('/'); 
        }).catch((error) => {
            alert('Problem Occured while logout!');
            console.log('Logout Failed! ', error);
        })

    }

    if(ready && !user){
        return navigate('/login');
    }

    function linkClasses(type=null){
        let classes = 'py-2 px-6'
        if(type === subpage){
            classes += ' bg-primary text-white rounded-full';
        }
        return classes;
    }

    return (
        <div>
            <nav className="w-full flex justify-center mt-4 gap-2 mb-8">
                <Link className={linkClasses('profile')} to={'/account'}>My Profile</Link>
                <Link className={linkClasses('bookings')} to={'/account/bookings'}>My Bookings</Link>
                <Link className={linkClasses('places')} to={'/account/places'}>My Accomodations</Link>
            </nav>
            {
                subpage==='profile' && (
                    <div className="text-center max-w-lg mx-auto">
                        Logged in as {user?.name} ({user?.email})<br/>
                        <button className="primary max-w-sm mt-2" onClick={logout}>Logout</button>
                    </div>
                )
            }
        </div>
    )
}