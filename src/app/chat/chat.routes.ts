import { Routes } from "@angular/router";
import { ChatComponent } from "./chat.component";

export const routes: Routes = [
    {
        path: '',
        component: ChatComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'main',
            },
            {
                path: "main",
                loadComponent: () => import("./chat-main/chat-main.component").then((m) => m.ChatMainComponent)
            }
        ]
    }
];