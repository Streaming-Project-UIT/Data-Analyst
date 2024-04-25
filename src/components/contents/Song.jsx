import React, { useState, useEffect, useContext } from 'react';
import DataTable from '../controls/tables/DataTable';
import SearchBox from 'components/controls/inputs/SearchBox';
import ButtonAdd from 'components/controls/buttons/ButtonAdd';
import ButtonExport from 'components/controls/buttons/ButtonExport';
import { SongContext } from 'contexts/SongContext';
import { GlobalContext } from 'contexts/GlobalContext';
import ModalSong from 'components/controls/modals/ModalSong';
import ButtonDeleteList from 'components/controls/buttons/ButtonDeleteList';

const Song = () => {
    const { setContextType, selectedItems, setSelectedItems } = useContext(GlobalContext);
    const { isDataChange, setDataChange, handleSearchData, handleExportData } = useContext(SongContext);
    const [searchTerm, setSearchTerm] = useState('');

    const columns = ['Tên Video', 'Chủ sở hữu', 'Likes', 'Comments', 'Views'];
    const data = [
        { 'Tên Video': 'Từng Quen', 'Chủ sở hữu': 'Wren Evans', Likes: '125', Comments: '12', Views:'10' },
        { 'Tên Video': 'Thích Em Hơi Nhiều', 'Chủ sở hữu': 'Wren Evans', Likes: '125', Comments: '12', Views:'10' },
        { 'Tên Video': 'Yên', 'Chủ sở hữu': 'Hoàng Dũng', Likes: '125', Comments: '12', Views:'10' },
        { 'Tên Video': 'Từng Quen', 'Chủ sở hữu': 'Wren Evans', Likes: '125', Comments: '12', Views:'10' }
    ];

    useEffect(() => {
        setContextType('song');
        setSelectedItems([]);
    }, []);

    useEffect(() => {
        if (isDataChange) {
            // Load userContext.data here ...
            // After loading data, set DataChange back to false
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
                </div>
                <div className='flex flex-row gap-5'>
                    
                    <ButtonExport onClick={handleExportData} />
                </div>
            </div>
            <DataTable columns={columns} data={data} />
        </div>
    );
};

export default Song;
