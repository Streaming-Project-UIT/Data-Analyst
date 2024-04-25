import React, { useState, useEffect, useContext } from 'react';
import DataTable from '../controls/tables/DataTable';
import SearchBox from 'components/controls/inputs/SearchBox';
import ButtonExport from 'components/controls/buttons/ButtonExport';
import { PendingApprovalContext } from 'contexts/PendingApprovalContext';
import { GlobalContext } from 'contexts/GlobalContext';
import Swal from 'sweetalert2';
import ButtonDeleteList from 'components/controls/buttons/ButtonDeleteList';
import ButtonApproveList from 'components/controls/buttons/ButtonApproveList';

const PendingApproval = () => {
    const { setContextType, selectedItems, setSelectedItems } = useContext(GlobalContext);
    const { isDataChange, setDataChange, handleSearchData, handleExportData } = useContext(PendingApprovalContext);
    const [searchTerm, setSearchTerm] = useState('');

    const columns = ['Tên tài khoản', 'Giới tính', 'Số lượng Video', 'Likes', 'Views'];
    const data = [
        { 'Tên tài khoản': 'Người dùng 1', 'Giới tính': 'Nam', 'Số lượng Video': '10', Likes: '125', Views: '2000' },
        { 'Tên tài khoản': 'Người dùng 2', 'Giới tính': 'Nam', 'Số lượng Video': '10', Likes: '125', Views: '1200' },
        { 'Tên tài khoản': 'Người dùng 3', 'Giới tính': 'Nam', 'Số lượng Video': '10', Likes: '125', Views: '12000' },
        { 'Tên tài khoản': 'Người dùng 4', 'Giới tính': 'Nam', 'Số lượng Video': '10', Likes: '125', Views: '120000' }
        // Thêm các đối tượng khác vào đây
    ];

    useEffect(() => {
        setContextType('pendingApproval');
        setSelectedItems([]);
    }, []);

    useEffect(() => {
        if (isDataChange) {
            setDataChange(false);
        }
    }, [isDataChange, setDataChange]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (searchTerm) {
                handleSearchData(searchTerm);
            }
        }, 500); // Delay in milliseconds 

        return () => clearTimeout(timeoutId);
    }, [searchTerm, handleSearchData]);

    return (
        <div className='flex flex-col'>
            <div className='flex items-center justify-between py-5'>
                <div className='flex items-center gap-3'>
                    <SearchBox onSearch={setSearchTerm} />
                    <span className='text-3xl font-extra-light text-gray-400'>|</span>
                    <ButtonDeleteList/>
                    <ButtonApproveList/>
                </div>
                <div className='flex flex-row gap-5'>
                    <ButtonExport onClick={handleExportData} />
                </div>
            </div>
            <DataTable columns={columns} data={data} />
        </div>
    );
};

export default PendingApproval;
