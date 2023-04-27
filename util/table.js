import Table from 'tty-table';

export const commonOptions = {
    align: 'left',
    borderColor: 'gray',
    borderStyle: 'solid',
    color: 'white',
    compact: false,
    headerAlign: 'center',
    headerColor: 'cyan',
    truncate: ' ...',
    width: '100%'
}

const table = (rows, header, options = {}) => {
    return Table(header, rows, { ...commonOptions, ...options }).render();
};

export default table;