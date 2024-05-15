'use client';

import TableSkeleton from "@/app/(main)/utilities/skeleton/page";
import ImpactAreaDA from "@/app/api/impactAreasDA"; //" //../data_access/impactAreasDA";
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';
import React, { useEffect, useRef, useState } from 'react';


interface ImpactArea {
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

export default function ImpactAreas() {
    let emptyImpactArea: ImpactArea = {
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
    const [impactAreas, setImpactAreas] = useState<ImpactArea[]>([]);
    const [impactAreaDialog, setImpactAreaDialog] = useState<boolean>(false);
    const [deleteImpactAreaDialog, setDeleteImpactAreaDialog] = useState<boolean>(false);
    const [deleteImpactAreasDialog, setDeleteImpactAreasDialog] = useState<boolean>(false);
    const [impactArea, setImpactArea] = useState<ImpactArea>(emptyImpactArea);
    const [selectedImpactAreas, setSelectedImpactAreas] = useState<ImpactArea[]>([]);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [globalFilter, setGlobalFilter] = useState<DataTableFilterMeta>({});
    const [globalFilterValue1, setGlobalFilterValue1] = useState('');
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<ImpactArea[]>>(null);

    useEffect(() => {
        setLoading(true);
        ImpactAreaDA.get_all_impact_areas()
			.then((response) => {
				console.log(response);
				const { success } = response;
				if (success) {
					setImpactAreas(response.impactAreas);
				}
                setLoading(false);
			})
			.catch((err) => {
				console.log(err);
			});
    }, []);

    const openNew = () => {
        setImpactArea(emptyImpactArea);
        setSubmitted(false);
        setImpactAreaDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setImpactAreaDialog(false);
    };

    const hideDeleteImpactAreaDialog = () => {
        setDeleteImpactAreaDialog(false);
    };

    const hideDeleteImpactAreasDialog = () => {
        setDeleteImpactAreasDialog(false);
    };

    const dateBodyTemplate = (rowData: ImpactArea) => {
        return formatDate(new Date(rowData.createdAt));
    };

    const formatDate = (value: Date) => {
        return value.toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const saveImpactArea = () => {
        setSubmitted(true);

        if (impactArea.label.trim()) {
            let _impactAreas = [...impactAreas];
            let _impactArea = { ...impactArea };

            if (impactArea._id) {
                const index = findIndexById(impactArea._id);

                _impactAreas[index] = _impactArea;
                toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Impact Area Updated', life: 3000 });
            } else {
                _impactArea._id = createId();
                // _impactArea.image = 'impactArea-placeholder.svg';
                _impactAreas.push(_impactArea);
                toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Impact Area Created', life: 3000 });
            }

            setImpactAreas(_impactAreas);
            setImpactAreaDialog(false);
            setImpactArea(emptyImpactArea);
        }
    };

    const editImpactArea = (impactArea: ImpactArea) => {
        setImpactArea({ ...impactArea });
        setImpactAreaDialog(true);
    };

    const confirmDeleteImpactArea = (impactArea: ImpactArea) => {
        setImpactArea(impactArea);
        setDeleteImpactAreaDialog(true);
    };

    const deleteImpactArea = () => {
        let _products = impactAreas.filter((val) => val._id !== impactArea._id);

        setImpactAreas(_products);
        setDeleteImpactAreaDialog(false);
        setImpactArea(emptyImpactArea);
        toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Impact Area Deleted', life: 3000 });
    };

    const findIndexById = (id: string) => {
        let index = -1;

        for (let i = 0; i < impactAreas.length; i++) {
            if (impactAreas[i]._id === id) {
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
        setDeleteImpactAreasDialog(true);
    };

    const deleteSelectedImpactAreas = () => {
        let _impactAreas = impactAreas.filter((val) => !selectedImpactAreas.includes(val));

        setImpactAreas(_impactAreas);
        setDeleteImpactAreasDialog(false);
        setSelectedImpactAreas([]);
        toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Impact Area Deleted', life: 3000 });
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
        const val = (e.target && e.target.value) || '';
        let _impactArea = { ...impactArea };

        // @ts-ignore
        _impactArea[name] = val;

        setImpactArea(_impactArea);
    };

    const actionBodyTemplate = (rowData: ImpactArea) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editImpactArea(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteImpactArea(rowData)} />
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
                    <InputText className="w-full md:w-18rem" value={globalFilterValue1} onChange={onGlobalFilterChange1} placeholder="Search Impact Areas" />
                </span>
                <div className="flex flex-wrap gap-2">
                <Button label="New" icon="pi pi-plus" severity="success" onClick={openNew} />
                <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedImpactAreas || !selectedImpactAreas.length} />
                </div>
                
            </div>
        );
    };

    const impactAreaDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveImpactArea} />
        </React.Fragment>
    );

    const deleteImpactAreaDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteImpactAreaDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteImpactArea} />
        </React.Fragment>
    );

    const deleteImpactAreasDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteImpactAreasDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedImpactAreas} />
        </React.Fragment>
    );

    if (loading) return (
        <div>
            <div className="card pb-2">
                <h3>Impact Areas</h3>
                <TableSkeleton/>
            </div>

        </div>
    );
	else
		return (

        <div>
            <Toast ref={toast} />
            <div className="card pb-2">
                <h3>Impact Areas</h3>
                <DataTable ref={dt} value={impactAreas} selection={selectedImpactAreas} loading={loading}
                        onSelectionChange={(e) => {
                            if (Array.isArray(e.value)) {
                                setSelectedImpactAreas(e.value);
                            }
                        }}
                        dataKey="_id"  paginator rows={7} rowsPerPageOptions={[5, 10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Impact Areas" filters={globalFilter} header={renderHeader}
                        selectionMode="multiple"
                >
                    <Column selectionMode="multiple" exportable={false} style={{ minWidth: '6rem' }}></Column>
                    <Column header="Serial" body={(rowData, row) => row.rowIndex+1} style={{ minWidth: '10rem', paddingLeft: '10px' }}  />
                    <Column field="label" header="Name" sortable style={{ minWidth: '25rem' }}></Column>
                    <Column header="Creation Date" field="date" sortable dataType="date" style={{ minWidth: '15rem' }} body={dateBodyTemplate} />
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                </DataTable>

            </div>

            <Dialog visible={impactAreaDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Impact Area Details" modal className="p-fluid" footer={impactAreaDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="name" className="font-bold">
                        Name
                    </label>
                    <InputText id="name" value={impactArea.label} onChange={(e) => onInputChange(e, 'label')} required autoFocus className={classNames({ 'p-invalid': submitted && !impactArea.label })} />
                    {submitted && !impactArea.label && <small className="p-error">Name is required.</small>}
                </div>
                {/* <div className="field">
                    <label htmlFor="description" className="font-bold">
                        Description
                    </label>
                    <InputTextarea id="description" value={impactArea.description} onChange={(e:ChangeEvent<HTMLTextAreaElement>) => onInputTextAreaChange(e, 'description')} required rows={3} cols={20} />
                </div> */}

                {/* <div className="field">
                    <label className="mb-3 font-bold">Category</label>
                    <div className="formgrid grid">
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category1" name="category" value="Accessories" onChange={onCategoryChange} checked={product.category === 'Accessories'} />
                            <label htmlFor="category1">Accessories</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category2" name="category" value="Clothing" onChange={onCategoryChange} checked={product.category === 'Clothing'} />
                            <label htmlFor="category2">Clothing</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category3" name="category" value="Electronics" onChange={onCategoryChange} checked={product.category === 'Electronics'} />
                            <label htmlFor="category3">Electronics</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category4" name="category" value="Fitness" onChange={onCategoryChange} checked={product.category === 'Fitness'} />
                            <label htmlFor="category4">Fitness</label>
                        </div>
                    </div>
                </div> */}

                {/* <div className="formgrid grid">
                    <div className="field col">
                        <label htmlFor="price" className="font-bold">
                            Price
                        </label>
                        <InputNumber id="price" value={impactArea.price} onValueChange={(e) => onInputNumberChange(e, 'price')} mode="currency" currency="USD" locale="en-US" />
                    </div>
                    <div className="field col">
                        <label htmlFor="quantity" className="font-bold">
                            Quantity
                        </label>
                        <InputNumber id="quantity" value={product.quantity} onValueChange={(e) => onInputNumberChange(e, 'quantity')} />
                    </div>
                </div> */}
            </Dialog>

            <Dialog visible={deleteImpactAreaDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteImpactAreaDialogFooter} onHide={hideDeleteImpactAreaDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {impactArea && (
                        <span>
                            Are you sure you want to delete <b>{impactArea.label}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog visible={deleteImpactAreasDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteImpactAreasDialogFooter} onHide={hideDeleteImpactAreasDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {impactArea && <span>Are you sure you want to delete the selected Impact Areas?</span>}
                </div>
            </Dialog>
        </div>
    );
}
