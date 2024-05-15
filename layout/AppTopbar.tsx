/* eslint-disable @next/next/no-img-element */
'use client'

import { authenticate } from '@/actions';
import AuthDA from "@/app/api/authDA";
import * as RoutePaths from "@/constants/route-paths";
import { AppTopbarRef } from '@/types';
import { useRouter } from 'next/navigation';
import { Menu } from 'primereact/menu';
import { Toast } from "primereact/toast";
import { classNames } from 'primereact/utils';
import { forwardRef, useContext, useImperativeHandle, useRef } from 'react';
import { LayoutContext } from './context/layoutcontext';


const AppTopbar = forwardRef<AppTopbarRef>((props, ref) => {
    const { layoutConfig, layoutState, onMenuToggle, showProfileSidebar } = useContext(LayoutContext);
    const menubuttonRef = useRef(null);
    const topbarmenuRef = useRef(null);
    const topbarmenubuttonRef = useRef(null);
    const menuProfile = useRef<Menu>(null);
    const router = useRouter()
    const toast = useRef<Toast>(null);

    useImperativeHandle(ref, () => ({
        menubutton: menubuttonRef.current,
        topbarmenu: topbarmenuRef.current,
        topbarmenubutton: topbarmenubuttonRef.current
    }));

    const handleSignOutClick = async () => {
        
        try {
            const response = await AuthDA.sign_out();
            console.log(response);
            const { success } = response;
            if (success) {
              authenticate(response);
              debugger
              toast.current?.show({ 
                  severity: 'success', 
                  summary: 'Successful', 
                  detail: "Sign Out successfully!", 
                  life: 2000 
              });
              setTimeout(() => {
                router.push(RoutePaths.home);
              }, 500);
            } else {
              toast.current?.show({ 
                  severity: 'error', 
                  summary: 'Error', 
                  detail: 'Can not Sign Out', 
                  life: 6000
              });
            }
          } catch (err) {
            console.log(err);
          }

      };
    
      const items = [
        {
          label: 'Change Password',
          icon: 'pi pi-lock',
          command: () => {
            toast.current?.show({ 
              severity: 'info', 
              summary: 'Not Available', 
              detail: 'This feature is not available right now', 
              life: 3000
            });
            // router.push('/change-password')
          }
        },
        {
          label: 'Sign Out',
          icon: 'pi pi-sign-out',
          command: handleSignOutClick
        }
      ];

    return (
        <div className="layout-topbar">
          <Toast ref={toast} />
            <div className="layout-topbar-logo">
                <img src={`/layout/images/logo-${layoutConfig.colorScheme !== 'light' ? 'white' : 'dark'}.svg`} width="60px" height={'35px'} alt="logo" />
                <span>IMPACT TAPESTRY</span>
            </div>

            <button ref={menubuttonRef} type="button" className="p-link layout-menu-button layout-topbar-button" onClick={onMenuToggle}>
                <i className="pi pi-bars" />
            </button>

            <button ref={topbarmenubuttonRef} type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={showProfileSidebar}>
                <i className="pi pi-ellipsis-v" />
            </button>

            <div ref={topbarmenuRef} className={classNames('layout-topbar-menu', { 'layout-topbar-menu-mobile-active': layoutState.profileSidebarVisible })}>
                <Menu model={items} popup ref={menuProfile} id="popup_menu_left" className='w-full md:w-15rem' />
                <div className="p-link layout-topbar-button" onClick={(event) => menuProfile.current?.toggle(event)}>
                    <button type="button" className="p-link layout-topbar-button">
                      <i className="pi pi-user"></i>
                    </button>
                    <i className="pi pi-angle-down"></i>
                </div>
            </div>
        </div>
    );
});

AppTopbar.displayName = 'AppTopbar';

export default AppTopbar;

