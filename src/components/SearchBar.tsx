import { colors } from '@/constants';
import React, { useState, useCallback } from 'react';
import { Searchbar } from 'react-native-paper';

interface SearchBarProps {
    filterPersonList: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ filterPersonList }) => {
    const [searchQuery, setSearchQuery] = useState<string>('');

    const onChangeSearch = useCallback((query: string) => {
        setSearchQuery(query);
        filterPersonList(query); // Arama sorgusu değiştikçe, ana bileşende veriyi filtreleme işlemini tetikle
    }, [filterPersonList]);

    return (
        <Searchbar
            placeholder="Ara"
            onChangeText={onChangeSearch}
            value={searchQuery}
            style={{ backgroundColor: colors.primaryLight }}
            iconColor={colors.primary}
            theme={{ colors: { primary: colors.primary } }}
        />
    );
};

export default SearchBar;