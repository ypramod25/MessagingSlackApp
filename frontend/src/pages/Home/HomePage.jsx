import { UserButton } from "@/components/atoms/UserButton/UserButton";
import { useFetchWorkspace } from "@/hooks/apis/workspaces/useFetchWorkspace";
import { useCreateWorkspaceModal } from "@/hooks/context/useCreateWorkspaceModal";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
    const {isFetching, workspaces} = useFetchWorkspace();

    const navigate = useNavigate();
    const {setOpenCreateWorkspaceModal} = useCreateWorkspaceModal();

    useEffect(() => {
        if(isFetching) return;
        console.log('Workspaced downloaded is : ', workspaces); 
        if (!workspaces || workspaces.length === 0) {
            setOpenCreateWorkspaceModal(true);
        } else {
            navigate(`/workspaces/${workspaces[0]._id}`);
        }
    }, [isFetching, workspaces, navigate, setOpenCreateWorkspaceModal]);
    
    return (
        <>
            <h1>HOME</h1>
            <UserButton />
        </>
    );
};