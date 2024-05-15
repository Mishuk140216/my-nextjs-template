/* eslint-disable @next/next/no-img-element */

import * as RoutePaths from "@/constants/route-paths";
import { AppMenuItem } from '@/types';
import AppMenuitem from './AppMenuitem';
import { MenuProvider } from './context/menucontext';

const AppMenu = () => {

    const model: AppMenuItem[] = [
        // {
        //     label: 'Home',
        //     items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' }]
        // },
        {
            label: 'Admin Panel',
            items: [

                { label: 'Impact Areas', icon: 'pi pi-fw pi-table', to: RoutePaths.impact_areas_list },
                { label: 'Organization types', icon: 'pi pi-fw pi-sitemap', to: RoutePaths.organization_types_list },
                { label: 'Users', icon: 'pi pi-fw pi-user', to: RoutePaths.users_list },
                { label: 'Organizations', icon: 'pi pi-fw pi-th-large', to: RoutePaths.organizations_list },
            ]
        },
    ];

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {model.map((item, i) => {
                    return !item?.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
                })}
            </ul>
        </MenuProvider>
    );
};

export default AppMenu;
