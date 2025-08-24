import { createContext } from "react";

export type Rename = {
    isRenaming: boolean;
    setIsRenaming: (isRenaming: boolean) => void;
}

export const RenameContext = createContext<Rename | undefined>(undefined)