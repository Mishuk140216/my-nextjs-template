'use client';
import OrganizationDA from "@/app/api/organizationsDA";
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Button } from 'primereact/button';
import { Column, ColumnFilterElementTemplateOptions } from 'primereact/column';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import React, { useEffect, useState } from 'react';
import TableSkeleton from "@/app/(main)/utilities/skeleton/page";

interface Country {
    name: string;
    code: string;
}
  
interface Organization {
    id: number;
    name: string;
    profilePicture : string;
    country: Country;
    email: string;
    dateOfBirth: string | Date;
    verified: boolean; // volunteerOpportunity 
    balance: number;
}

const Organizations = () => {

    const [loading, setLoading] = useState(false);
    const [organizations, setOrganizations] = useState<Organization[]>([]);
    const [selectedOrganizations, setSelectedOrganizations] = useState<Organization[]>([]);
    const [filters, setFilters] = useState<DataTableFilterMeta>({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'country.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        date: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
        balance: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        email: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] }
    });
    const [globalFilterValue, setGlobalFilterValue] = useState<string>('');

    
    useEffect(() => {
        setLoading(true);
        OrganizationDA.get_all_organizations()
            .then((response) => {
                console.log(response);
                const { success, users } = response;
                if (success) {
                    const simplifiedOrganizations = users
                        .filter((user: any) => user.userType === "organization")
                        .map((user: any) => simplifyOrganizationObject(user));
                    setOrganizations(simplifiedOrganizations);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
    
        // initFilters();
    }, []);

    function simplifyOrganizationObject(user: any) {
        const eachOrganization = {
            id: user?._id,
            name: user?.basicInfo?.name ?? '',
            profilePicture : user?.basicInfo?.profilePicture ?? '',
            country: {
                name: user?.basicInfo?.address?.country ?? '',
                code: user?.basicInfo?.address?.code ?? ''
            },
            email: user?.email ?? '',
            dateOfBirth: user?.basicInfo?.dateOfBirth,
            verified: user?.involvement?.volunteerOpportunity ?? false,
            balance: user?.walletCoin ?? 0
        };
        return eachOrganization
    }
    
    const organizationBody = (rowData: any) => {
        const organizationName = rowData?.name ;
        return (
            <React.Fragment>
                <img
                    alt={organizationName}
                    src={`${rowData?.profilePicture}`}
                    onError={(e) => ((e.target as HTMLImageElement).src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png')}
                    width={50}
                    style={{ verticalAlign: 'middle', borderRadius: '50%', objectFit: 'cover', overflow: 'hidden' }}
                />
                <span style={{ marginLeft: '.5em', verticalAlign: 'middle' }}>{organizationName}</span>
            </React.Fragment>
        );
    };
    
    const formatDate = (value: string | Date) => {
        return new Date(value).toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };
    
    const formatCurrency = (value: number) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };
    
    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        let _filters = { ...filters };
        (_filters['global'] as any).value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const renderHeader = () => {
        return (
            <div className="flex justify-content-between">
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                </span>
            </div>
        );
    };
    
    const countryBody = (rowData: any) => {
        return (
            <React.Fragment>
                <img alt="flag" src={`/demo/images/flag/flag_placeholder.png`} className={`flag flag-us`} width={30} />
                <span style={{ marginLeft: '.5em', verticalAlign: 'middle' }}>{rowData?.country?.name}</span>
            </React.Fragment>
        );
    };
    
    const dateOfBirthBody = (rowData: Organization) => {
        if (rowData?.dateOfBirth) {
            return formatDate(rowData?.dateOfBirth );
        }
    };

    // ToDo: Filter by date have to be implemented if nessesary  
    // const dateOfBirthFilter = (options: ColumnFilterElementTemplateOptions) => {
    //     debugger
    //     return <Calendar value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" mask="99/99/9999" />;
    // };

    const emailFilter = (options: ColumnFilterElementTemplateOptions) => {
        return (
            <InputText
                value={options.value}
                onChange={(e) => options.filterCallback(e.target.value, options.index)}
                placeholder="Search by Email"
            />
        );
    };
    
    const balanceBody = (rowData: Organization) => {
        return formatCurrency(rowData?.balance);
    };
    
    const balanceFilter = (options: ColumnFilterElementTemplateOptions) => {
        return <InputNumber value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} mode="currency" currency="USD" locale="en-US" />;
    };
        
    const actionBody = () => {
        return <Button type="button" icon="pi pi-ellipsis-v" rounded text aria-label="Filter"></Button>;
    };
    
    const header = renderHeader();
    
    if (loading) return (
        <div>
            <div className="card pb-2">
                <h3>Organizations</h3>
                <TableSkeleton/>
            </div>

        </div>
    );
	else
        return (
            <div className="card pb-2">
                <h3>Organizations</h3>
                <DataTable value={organizations} paginator header={header} rows={6}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        rowsPerPageOptions={[10, 25, 50]} dataKey="id" selectionMode="checkbox" selection={selectedOrganizations} 
                        onSelectionChange={(e) => {
                            const organizations = e.value as Organization[];
                            setSelectedOrganizations(organizations);
                        }}
                        filters={filters} filterDisplay="menu" globalFilterFields={['name', 'country.name', 'email', 'balance', 'date']}
                        emptyMessage="No organizations found." currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries">
                    <Column field="name" header="Name" sortable filter filterPlaceholder="Search by name" style={{ minWidth: '20rem' }} body={organizationBody} />
                    <Column field="country.name" header="Country" sortable filterField="country.name" style={{ minWidth: '14rem' }} body={countryBody} filter filterPlaceholder="Search by country" />
                    {/* <Column field="date" header="Date of Birth" sortable dataType="date" style={{ minWidth: '12rem' }} body={dateOfBirthBody} /> */}
                    {/* <Column field="date" header="Date of Birth" sortable filterField="date" dataType="date" style={{ minWidth: '12rem' }} body={dateOfBirthBody} filter filterElement={dateOfBirthFilter} /> */}
                    <Column field="email" header="Email" sortable filter filterElement={emailFilter} style={{ minWidth: '14rem' }} />
                    <Column field="balance" header="Wallet Coin" sortable dataType="numeric" style={{ minWidth: '10rem' }} body={balanceBody} filter filterElement={balanceFilter} />
                    <Column headerStyle={{ width: '5rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={actionBody} />
                </DataTable>
            </div>
        );            
}

export default Organizations;
