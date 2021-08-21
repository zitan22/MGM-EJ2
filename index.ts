import { TreeGrid, Toolbar, Edit, Sort, Filter, Selection, Page, Resize, Reorder, RowDD, CommandColumn, ContextMenu, ITreeData } from '@syncfusion/ej2-treegrid';
import { QueryCellInfoEventArgs, RowDataBoundEventArgs } from '@syncfusion/ej2-grids';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { Data } from './datasource.ts';


TreeGrid.Inject( Toolbar, Edit, Sort, Filter, Selection, Page, Resize, Reorder, RowDD, CommandColumn, ContextMenu );

let treeGridObj: TreeGrid = new TreeGrid({

  dataSource: Data,

  childMapping: 'subtasks',

  toolbar: ['Add', 'Delete', 'Update', 'Cancel'],

  editSettings: { allowAdding: true, allowEditing: true, allowDeleting: true, mode: 'Row', showDeleteConfirmDialog: 'true', newRowPosition: 'Above' },

  allowSorting: true,

  allowFiltering: true, filterSettings: { type: 'FilterBar', hierarchyMode: 'Parent', mode: 'Immediate' },

  selectionSettings: { type: 'Multiple', cellSelectionMode: 'Both' },

  allowPaging: true, pageSettings: { pageSize: 15 },

  allowResizing: true,

  allowReordering: true,

  allowRowDragAndDrop: true,

  contextMenuItems: [ 'AddRow', 'Edit', 'Delete', 'Copy', { text: 'Cut' } ],

  treeColumnIndex: 1,
  
  columns: [
    {
      field: 'taskID', headerText: 'Task ID', isPrimaryKey: true, textAlign: 'Right', validationRules: { required: true, number: true }, width: 90
    },
    {
      field: 'taskName', headerText: 'Task Name', editType: 'stringedit', width: 220, validationRules: { required: true }
    },
    {
      field: 'startDate', headerText: 'Start Date', textAlign: 'Right', width: 130, editType: 'datepickeredit', format: 'yMd', validationRules: { date: true }
    },
    {
     field: 'duration', headerText: 'Duration', width: 80, textAlign: 'Right'
    }
  ]
});

treeGridObj.appendTo('#TreeGrid');

let dropDownColumns: DropDownList = new DropDownList({
  dataSource: [
    { id: 'CellEditing', name: 'Cell Editing' },
    { id: 'RowEditing', name: 'Row Editing' }
  ],
  fields: { text: 'name', value: 'id' },
  value: 'CellEditing',
  width: 120,
  change: (e: ChangeEventArgs) => {
    if (e.value === 'CellEditing') {
      grid.editSettings.mode = 'Cell';
      grid.toolbar = ['Add', 'Delete', 'Update', 'Cancel'];
    } else {
      grid.editSettings.mode = 'Row';
      grid.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
    }
  }
});

dropDownColumns.appendTo('#editmodes');


function rowDataBound(args: RowDataBoundEventArgs) {
  if (!(args.data as ITreeData).hasChildRecords) {
    //responsible for the rows attributes
    (args.row as HTMLElement).style.backgroundColor = '#008cff';
    (args.row as HTMLElement).style.fontFamily = 'serif';
  }
}
function queryCellInfo(args: QueryCellInfoEventArgs) {
  if (!(args.data as ITreeData).hasChildRecords) {
    if ((args.cell as HTMLElement).classList.contains('e-unboundcell')) {
      ((args.cell as HTMLElement).querySelector(
        '.e-unboundcelldiv'
      ) as HTMLElement).style.display = 'none';
    }
  }
}


