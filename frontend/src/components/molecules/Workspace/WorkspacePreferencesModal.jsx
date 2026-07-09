import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useWorkspacePreferencesModal } from "@/hooks/context/useWorkspacePreferencesModal";
import { TrashIcon } from "lucide-react";

export const WorkspacePreferencesModal = () => {

    const {initialValue, openPreferences, setOpenPreferences} = useWorkspacePreferencesModal();

    return (
        <Dialog open={openPreferences} onOpenChange={setOpenPreferences}>
            <DialogContent className='p-0 bg-gray-50 overflow-hidden'>
                <DialogHeader className='p-4 border-b bg-white'>
                    <DialogTitle>
                        lavda
                    </DialogTitle> 
                    <DialogDescription >
                        Update your workspace preferences.
                    </DialogDescription>
                </DialogHeader>
                <div className="px-4 pb-4 flex flex-col gap-y-2">
                    <div className="px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50">
                        <div className="flex items-center justify-between">
                            <p className="font-semibold text-sm">
                                Workspace Name
                            </p>
                            <p className="text-sm font-semibold text-blue-500 hover:underline">
                                Edit
                            </p>
                        </div>
                        <p className="text-sm font-semibold text-gray-500 mt-1">
                            {initialValue}
                        </p>
                    </div>
                        <button className="flex items-center gap-x-2 px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50">
                            <TrashIcon className="size-5"/>
                            <p className="text-sm font-semibold text-red-500 hover:underline">
                                Delete Workspace
                            </p>
                        </button>
                </div>
            </DialogContent>
        </Dialog>
    )
}