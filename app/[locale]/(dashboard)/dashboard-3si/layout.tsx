import React from "react";
import DashboardShell from "./dashboardShell";
interface props {
    children: React.ReactNode
}
export default function DashboardMain({children}:props){
    return (
        <DashboardShell>
            {children}
        </DashboardShell>
    )
}