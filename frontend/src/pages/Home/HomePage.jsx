import { UserButton } from "@/components/atoms/UserButton/UserButton";
import { useFetchWorkspace } from "@/hooks/apis/workspaces/useFetchWorkspace";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
    const {isFetching, workspaces} = useFetchWorkspace();

    const navigate = useNavigate();

    useEffect(() => {
        if(isFetching) return;
        console.log('Workspaced downloaded is : ', workspaces); 
        if( !workspaces) {
            console.log('No workspaces found, creating one');
        } else {
            navigate(`/workspaces/${workspaces[0]._id}`);
        }
    }, [isFetching, workspaces]);
    
    return (
        <>
            <h1>HOME</h1>
            <UserButton />
        </>
    );
};