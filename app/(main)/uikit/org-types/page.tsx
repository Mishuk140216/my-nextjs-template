'use client';

import TableSkeleton from "@/app/(main)/utilities/skeleton/page";
import OrganizationTypeDA from "@/app/api/organizationTypesDA"; 
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';
import React, { useEffect, useRef, useState } from 'react';

interface OrganizationType {
    _id: string | null;
    label: string;
    createdBy: string;
    creatorId: string;
    isActive: boolean;
    isDeleted: boolean;
    createdAt: string | number | Date;
    updatedAt: string | number | Date;
    value: string;
    __v: number;
    
}

export default function OrgTypes() {
    let emptyOrganizationType: OrganizationType = {
        _id: null,
        label: '',
        createdBy: '',
        creatorId: '',
        isActive: false,
        isDeleted: false,
        createdAt: '',
        updatedAt: '',
        value: '',
        __v: 0,
    };

    const [loading, setLoading] = useState(false);
    const [organizationTypes, setOrganizationTypes] = useState<OrganizationType[]>([]);
    const [organizationTypeDialog, setOrganizationTypeDialog] = useState<boolean>(false);
    const [deleteOrganizationTypeDialog, setDeleteOrganizationTypeDialog] = useState<boolean>(false);
    const [deleteOrganizationTypesDialog, setDeleteOrganizationTypesDialog] = useState<boolean>(false);
    const [organizationType, setOrganizationType] = useState<OrganizationType>(emptyOrganizationType);
    const [selectedOrganizationTypes, setSelectedOrganizationTypes] = useState<OrganizationType[]>([]);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [globalFilter, setGlobalFilter] = useState<DataTableFilterMeta>({});
    const [globalFilterValue1, setGlobalFilterValue1] = useState('');
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<OrganizationType[]>>(null);

    useEffect(() => {
        setLoading(true);
        OrganizationTypeDA.get_all_organization_types()
			.then((response) => {
				console.log(response);
				const { success } = response;
				if (success) {
					setOrganizationTypes(response.organizationTypes);
				}
                setLoading(false);
			})
			.catch((err) => {
				console.log(err);
			});
    }, []);

    const openNew = () => {
        setOrganizationType(emptyOrganizationType);
        setSubmitted(false);
        setOrganizationTypeDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setOrganizationTypeDialog(false);
    };

    const hideDeleteOrganizationTypeDialog = () => {
        setDeleteOrganizationTypeDialog(false);
    };

    const hideDeleteOrganizationTypesDialog = () => {
        setDeleteOrganizationTypesDialog(false);
    };

    const dateBodyTemplate = (rowData: OrganizationType) => {
        return formatDate(new Date(rowData.createdAt));
    };

    const formatDate = (value: Date) => {
        return value.toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const saveOrganizationType = () => {
        setSubmitted(true);

        if (organizationType.label.trim()) {
            let _organizationTypes = [...organizationTypes];
            let _organizationType = { ...organizationType };

            if (organizationType._id) {
                const index = findIndexById(organizationType._id);

                _organizationTypes[index] = _organizationType;
                toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Organization Types Updated', life: 3000 });
            } else {
                _organizationType._id = createId();
                // _organizationType.image = 'organizationType-placeholder.svg';
                _organizationTypes.push(_organizationType);
                toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Organization Types Created', life: 3000 });
            }

            setOrganizationTypes(_organizationTypes);
            setOrganizationTypeDialog(false);
            setOrganizationType(emptyOrganizationType);
        }
    };

    const editOrganizationType = (organizationType: OrganizationType) => {
        setOrganizationType({ ...organizationType });
        setOrganizationTypeDialog(true);
    };

    const confirmDeleteOrganizationType = (organizationType: OrganizationType) => {
        setOrganizationType(organizationType);
        setDeleteOrganizationTypeDialog(true);
    };

    const deleteOrganizationType = () => {
        let _products = organizationTypes.filter((val) => val._id !== organizationType._id);

        setOrganizationTypes(_products);
        setDeleteOrganizationTypeDialog(false);
        setOrganizationType(emptyOrganizationType);
        toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Organization Types Deleted', life: 3000 });
    };

    const findIndexById = (id: string) => {
        let index = -1;

        for (let i = 0; i < organizationTypes.length; i++) {
            if (organizationTypes[i]._id === id) {
                index = i;
                break;
            }
        }

        return index;
    };

    const createId = (): string => {
        let id = '';
        let chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 24; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    };

    const confirmDeleteSelected = () => {
        setDeleteOrganizationTypesDialog(true);
    };

    const deleteSelectedOrganizationTypes = () => {
        let _organizationTypes = organizationTypes.filter((val) => !selectedOrganizationTypes.includes(val));

        setOrganizationTypes(_organizationTypes);
        setDeleteOrganizationTypesDialog(false);
        setSelectedOrganizationTypes([]);
        toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Organization Types Deleted', life: 3000 });
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
        const val = (e.target && e.target.value) || '';
        let _organizationType = { ...organizationType };

        // @ts-ignore
        _organizationType[name] = val;

        setOrganizationType(_organizationType);
    };

    const actionBodyTemplate = (rowData: OrganizationType) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editOrganizationType(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteOrganizationType(rowData)} />
            </React.Fragment>
        );
    };

    const onGlobalFilterChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const newFilter: DataTableFilterMeta = {
            global: {
                value: value,
                matchMode: 'contains' 
            }
        };
    
        setGlobalFilter(newFilter);
        setGlobalFilterValue1(value);
    };

    const renderHeader = () => {
        return (
            <div className="flex justify-content-between">
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText className="w-full md:w-18rem" value={globalFilterValue1} onChange={onGlobalFilterChange1} placeholder="Search Organization Typess" />
                </span>
                <div className="flex flex-wrap gap-2">
                <Button label="New" icon="pi pi-plus" severity="success" onClick={openNew} />
                <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedOrganizationTypes || !selectedOrganizationTypes.length} />
                </div>
                
            </div>
        );
    };

    const organizationTypeDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveOrganizationType} />
        </React.Fragment>
    );

    const deleteOrganizationTypeDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteOrganizationTypeDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteOrganizationType} />
        </React.Fragment>
    );

    const deleteOrganizationTypesDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteOrganizationTypesDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedOrganizationTypes} />
        </React.Fragment>
    );

    if (loading) return (
        <div>
            <div className="card pb-2">
                <h3>Organization Types </h3>
                <TableSkeleton/>
            </div>

        </div>
    );
	else
		return (

        <div>
            <Toast ref={toast} />
            <div className="card pb-2">
                <h3>Organization Types</h3>
                <DataTable ref={dt} value={organizationTypes} selection={selectedOrganizationTypes} loading={loading}
                        onSelectionChange={(e) => {
                            if (Array.isArray(e.value)) {
                                setSelectedOrganizationTypes(e.value);
                            }
                        }}
                        dataKey="_id"  paginator rows={7} rowsPerPageOptions={[5, 10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Organization Typess" filters={globalFilter} header={renderHeader}
                        selectionMode="multiple"
                >
                    <Column selectionMode="multiple" exportable={false} style={{ minWidth: '6rem' }}></Column>
                    <Column header="Serial" body={(rowData, row) => row.rowIndex+1} style={{ minWidth: '10rem', paddingLeft: '10px' }}  />
                    <Column field="label" header="Name" sortable style={{ minWidth: '25rem' }}></Column>
                    <Column header="Creation Date" field="date" sortable dataType="date" style={{ minWidth: '15rem' }} body={dateBodyTemplate} />
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                </DataTable>

            </div>

            <Dialog visible={organizationTypeDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Organization Types Details" modal className="p-fluid" footer={organizationTypeDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="name" className="font-bold">
                        Name
                    </label>
                    <InputText id="name" value={organizationType.label} onChange={(e) => onInputChange(e, 'label')} required autoFocus className={classNames({ 'p-invalid': submitted && !organizationType.label })} />
                    {submitted && !organizationType.label && <small className="p-error">Name is required.</small>}
                </div>
            </Dialog>

            <Dialog visible={deleteOrganizationTypeDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteOrganizationTypeDialogFooter} onHide={hideDeleteOrganizationTypeDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {organizationType && (
                        <span>
                            Are you sure you want to delete <b>{organizationType.label}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog visible={deleteOrganizationTypesDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteOrganizationTypesDialogFooter} onHide={hideDeleteOrganizationTypesDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {organizationType && <span>Are you sure you want to delete the selected Organization Typess?</span>}
                </div>
            </Dialog>
        </div>
    );
}
