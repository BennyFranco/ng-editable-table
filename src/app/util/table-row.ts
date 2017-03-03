import { TableCell } from './table-cell';

export class TableRow {
    cells: TableCell[];

    constructor(cells: TableCell[]) {
        this.cells = cells;
    }
}
