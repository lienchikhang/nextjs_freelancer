// export interface DrawerConfirm {
//     isOpen: boolean,
//     isLoading?: boolean,
// }

export interface DrawerConfirmContextType {
    isOpen: boolean;
    toggleDrawer: (toggle: boolean) => void;
}